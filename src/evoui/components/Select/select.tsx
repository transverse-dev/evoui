import { ChangeEvent, memo, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { SelectType } from './select.type';

const Root = styled.div<SelectType.RootPropsType>`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;

  ${(props) => props.cssStyle ?? ''};
`;
const InputWrapper = styled.div<SelectType.InputWrapperPropsType>`
  border: 2px solid
    ${(props) =>
      props.isMenuVisible
        ? props.theme.evoui.colors.select.focusBorderColor
        : props.error
        ? props.theme.evoui.colors.select.errorBorderColor
        : 'transparent'};
  padding: 10px;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  background-color: ${(props) =>
    props.isMenuVisible || !props.error
      ? props.theme.evoui.colors.select.bgColor
      : props.theme.evoui.colors.select.errorBgColor};
  cursor: ${(props) => (props.disable ? 'not-allowed' : 'text')};
  opacity: ${(props) => (props.disable ? '0.4' : '1')};
  transition: all ease-in-out 200ms;

  ${(props) => props.cssStyle ?? ''};
`;
const InputValueWrapper = styled.div<SelectType.InputValueWrapperPropsType>`
  display: inline-flex;
  flex-direction: row;
  column-gap: 2px;
  width: 100%;
  overflow: hidden;

  ${(props) => props.cssStyle ?? ''};
`;
const InputValue = styled.div<SelectType.InputValuePropsType>`
  max-width: 100%;
  font-size: 16px;
  line-height: initial;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  ${(props) => props.cssStyle ?? ''};
`;
const Input = styled.input<SelectType.InputPropsType>`
  margin: 0;
  width: ${(props) => (props.isInputValueExist ? '100%' : '2px')};
  max-width: 100%;
  color: ${(props) => props.theme.evoui.colors.select.fgColor};
  font-size: 16px;
  font-weight: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: initial;
  background: none;
  border: 0;
  padding: 0;
  overflow: hidden;

  ${(props) => props.cssStyle ?? ''};
`;
const InputIconWrapper = styled.div<SelectType.InputIconWrapperPropsType>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  min-width: 16px;

  ${(props) => props.cssStyle ?? ''};
`;
const InputIcon = styled.svg<SelectType.InputIconPropsType>`
  width: 16px;
  height: 16px;
  fill: #212121;
  cursor: ${(props) => (props.disable ? 'not-allowed' : 'pointer')};

  ${(props) => props.cssStyle ?? ''};
`;
const MenuWrapper = styled.div<SelectType.MenuWrapperPropsType>`
  z-index: 1000;
  position: relative;
  width: 100%;

  ${(props) => props.cssStyle ?? ''};
`;
const Menu = styled.div<SelectType.MenuPropsType>`
  z-index: 11111;
  position: fixed;
  display: inline-block;
  width: fit-content;
  height: fit-content;
  max-width: 90vh;
  max-height: 225px;
  min-width: 80px;
  background-color: ${(props) => props.theme.evoui.colors.select.menuBgColor};
  box-shadow: ${(props) => props.theme.evoui.colors.select.menuShadow};
  overflow-x: hidden;
  overflow-y: auto;
  animation-name: ${(props) => (props.isMenuVisible ? 'fadeIn' : '')};
  animation-duration: 300ms;
  animation-fill-mode: both;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  ${(props) => props.cssStyle ?? ''};
`;
const MenuList = styled.div<SelectType.MenuListPropsType>`
  padding: 8px 0;
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;

  ${(props) => props.cssStyle ?? ''};
`;
const MenuItem = styled.div<SelectType.MenuItemPropsType>`
  padding: 8px 16px;
  width: 100%;
  color: ${(props) =>
    props.isSelected || props.isFocused
      ? props.theme.evoui.colors.select.menuItemDeepFgColor
      : props.theme.evoui.colors.select.menuItemFgColor};
  font-size: 0.875rem;
  font-weight: ${(props) => (props.isSelected ? '600' : '500')};
  text-align: left;
  line-height: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: ${(props) =>
    !!!props.isDisabled && props.isFocused
      ? props.theme.evoui.colors.select.menuItemHoverBgColor
      : 'transparent'};
  cursor: ${(props) => (!!props?.isDisabled ? 'not-allowed' : 'pointer')};
  user-select: none;
  opacity: ${(props) => (!!props?.isDisabled ? '0.3' : '1')};
  overflow: hidden;
  transition: all ease-in-out 200ms;

  ${(props) => props.cssStyle ?? ''};
`;

const NoResultWrapper = styled.div<SelectType.NoResultWrapperPropsType>`
  padding: 8px 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #cbcbcb;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  white-space: pre-wrap;

  ${(props) => props.cssStyle ?? ''};
`;

function PureSelect<
  itemType extends SelectType.defaultItemType,
  valueShouldExistType extends boolean | undefined,
>({
  value,
  placeholder,
  items,
  onChange,
  valueShouldExist = false,
  closeOutOfScreen,
  scrollTarget,
  onOpen,
  onClose,
  close = false,
  disable = false,
  error = false,
  overrides,
}: SelectType.SelectPropsType<itemType, valueShouldExistType>): JSX.Element {
  const selectMenuRef = useRef<Array<any>>([]);
  /*
   * selectMenuRef.current[0]: Root
   *   - isExternal가 true 일때 사용
   * selectMenuRef.current[1]: MenuWrapper
   *   - isExternal가 false 일때 사용
   * selectMenuRef.current[2]: Menu
   *   - Menu의 위치와 거리계산에 사용
   */
  const inputRef = useRef<any>(null);
  const itemsRef = useRef<Array<any>>([]);

  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  const [searchedItems, setSearchedItems] = useState<
    SelectType.defaultItemType[]
  >([]);

  const [inputValue, setInputValue] = useState<string | undefined>(undefined);
  const [isInputFucus, setIsInputFocus] = useState<boolean>(false);
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(0);

  useEffect(() => {
    if (isMenuVisible && !!value) {
      searchedItems.some((item, i): boolean => {
        if (item.id === value.id) {
          setFocusedItemIndex(i);
          itemsRef.current[i].scrollIntoView({
            behavior: 'auto',
            block: 'center',
          });
          return true;
        }
        return false;
      });
    } else if (!isMenuVisible) {
      setFocusedItemIndex(0);
    }
  }, [isMenuVisible]);

  useEffect(() => {
    if (scrollTarget?.current !== undefined) {
      if (isMenuVisible) {
        setMenuPosition();
        scrollTarget?.current?.removeEventListener('scroll', setMenuPosition);
        scrollTarget.current.addEventListener('scroll', setMenuPosition);
      } else {
        scrollTarget.current.removeEventListener('scroll', setMenuPosition);
      }
    } else {
      if (isMenuVisible) {
        setMenuPosition();
        window?.removeEventListener('scroll', setMenuPosition);
        window.addEventListener('scroll', setMenuPosition);
      } else {
        window.removeEventListener('scroll', setMenuPosition);
      }
    }
    if (isMenuVisible) {
      window.onresize = setMenuPosition;
    } else {
      window.onresize = null;
    }

    return () => {
      if (scrollTarget?.current !== undefined) {
        scrollTarget?.current?.removeEventListener('scroll', setMenuPosition);
      } else {
        window?.removeEventListener('scroll', setMenuPosition);
      }
      window.onresize = null;
    };
  }, [isMenuVisible, scrollTarget]);
  /*
   * 메뉴가 켜진뒤 스크롤 이벤트 부여
   * 이때 만약 스크롤 타겟이 있다면
   * 해당 앨리먼트에 이벤트 부여
   * 없으면 window에 이벤트 부여
   */

  useEffect(() => {
    if (isMenuVisible) {
      setMenuPosition();
    }
  }, [items, overrides]);
  /*
   * Button: 메뉴가 켜진 중간에 버튼이 변경되거나
   * items: 메뉴가 켜진 중간에 아이템 리스트가 변경되거나
   * overrides: 메뉴가 켜진 중간에 overrides가 변경되었을때
   * 같이 변경된 크기에 맞게 위치 조정
   */

  useEffect(() => {
    window.removeEventListener('mousedown', handleClickOutside);
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectMenuRef.current[0]]);
  /*
   * 메뉴를 제외한 다른곳 클릭 시
   * 메뉴 닫기
   */

  useEffect(() => {
    if (isMenuVisible && close) {
      closeMenu();
    }
  }, [close]);

  useEffect(() => {
    if (!!items) {
      if (!!inputValue) {
        setSearchedItems(
          items?.filter((item) => item.label.includes(inputValue)),
        );
      } else {
        setSearchedItems(items);
      }
    } else {
      setSearchedItems([]);
    }
  }, [items, inputValue]);

  useEffect(() => {
    setFocusedItemIndex(0);
    if (!!inputValue && !isMenuVisible && !!!disable) {
      setIsMenuVisible(true);
    }
  }, [inputValue]);

  const openMenu = (): void => {
    onOpen && onOpen();
    setIsMenuVisible(true);
  };
  /*
   * 메뉴를 열고
   * 만약 메뉴 열기 이벤트가 있다면 실행
   */

  const closeMenu = (): void => {
    onClose && onClose();
    setIsMenuVisible(false);
  };
  /*
   * 메뉴를 닫고
   * 만약 메뉴 닫기 이벤트가 있다면 실행
   */

  const clearInput = (): void => {
    setInputValue(undefined);
    closeMenu();
  };

  const toggleMenu = (): void => {
    if (isMenuVisible) {
      closeMenu();
    } else {
      openMenu();
    }
  };
  /*
   * 메뉴가 열려있으면 닫고
   * 닫혀있으면 연다
   */

  const focusInput = (): void => {
    if (!!inputRef.current && !!!disable) {
      inputRef.current.focus();
      toggleMenu();
    }
  };

  const InputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'Backspace') {
      if (!!value && inputValue === undefined) {
        setInputValue(value.label);
      } else if (!valueShouldExist && inputValue === '' && !!onChange) {
        (
          onChange as SelectType.onChangeType<itemType, typeof valueShouldExist>
        )({
          type: 'remove',
          selected: undefined,
        });
      }
    } else if (e.code === 'Tab') {
      clearInput();
    } else if (
      !isMenuVisible &&
      (e.code === 'ArrowDown' || e.code === 'ArrowUp')
    ) {
      openMenu();
    } else if (e.code === 'Enter' && !!searchedItems[focusedItemIndex]) {
      if (typeof onChange === 'function') {
        onChange({
          type: 'select',
          // TODO: 누군가 해결해주세요..
          // @ts-ignore
          selected: {
            label: searchedItems[focusedItemIndex].label,
            id: searchedItems[focusedItemIndex].id,
            payload: searchedItems[focusedItemIndex].payload,
          },
        });
        clearInput();
      }
    } else if (
      e.code === 'ArrowDown' &&
      focusedItemIndex + 1 < searchedItems.length
    ) {
      if (!!searchedItems[focusedItemIndex + 1]?.disabled) {
        searchedItems.slice(focusedItemIndex + 2).some((item, i): boolean => {
          if (focusedItemIndex + 2 + i >= searchedItems.length) {
            return true;
          } else if (!!!item?.disabled) {
            setFocusedItemIndex(focusedItemIndex + i + 2);
            itemsRef.current[focusedItemIndex + i + 2].scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
            return true;
          }
          return false;
        });
      } else {
        setFocusedItemIndex(focusedItemIndex + 1);
        itemsRef.current[focusedItemIndex + 1].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    } else if (e.code === 'ArrowUp' && focusedItemIndex - 1 >= 0) {
      if (!!searchedItems[focusedItemIndex - 1]?.disabled) {
        if (focusedItemIndex - 2 >= 0) {
          searchedItems
            .slice(0, focusedItemIndex - 1)
            .reverse()
            .some((item, i): boolean => {
              if (focusedItemIndex - 2 - i < 0) {
                return true;
              } else if (!!!item?.disabled) {
                setFocusedItemIndex(focusedItemIndex - 2 - i);
                itemsRef.current[focusedItemIndex - 2 - i].scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                });
                return true;
              }
              return false;
            });
        }
      } else {
        setFocusedItemIndex(focusedItemIndex - 1);
        itemsRef.current[focusedItemIndex - 1].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  };

  const handleClickOutside = (event: { target: any }) => {
    if (!selectMenuRef.current[0] || !selectMenuRef.current[2]) {
      clearInput();
    } else if (
      !selectMenuRef.current[0].contains(event.target) &&
      !selectMenuRef.current[2].contains(event.target)
    ) {
      clearInput();
    }
  };

  const setMenuPosition = () => {
    if (
      isMenuVisible &&
      !!selectMenuRef?.current[0] &&
      !!selectMenuRef?.current[1] &&
      !!selectMenuRef?.current[2]
    ) {
      if (
        scrollTarget?.current !== undefined &&
        !!closeOutOfScreen &&
        (selectMenuRef.current[0].getBoundingClientRect().top <=
          scrollTarget.current?.getBoundingClientRect()?.top ||
          selectMenuRef.current[0].getBoundingClientRect().bottom >=
            scrollTarget.current?.getBoundingClientRect()?.bottom)
      ) {
        closeMenu();
      } else if (
        !!closeOutOfScreen &&
        (selectMenuRef.current[0].getBoundingClientRect().top <= 0 ||
          selectMenuRef.current[0].getBoundingClientRect().bottom >=
            window.document.documentElement.clientHeight)
      ) {
        closeMenu();
      }
      const root = selectMenuRef.current[0].getBoundingClientRect();
      const menuWrapper = selectMenuRef.current[1].getBoundingClientRect();
      const menu = selectMenuRef.current[2].getBoundingClientRect();
      selectMenuRef.current[2].style.minWidth = `${menuWrapper.width}px`;
      selectMenuRef.current[2].style.maxWidth = `${menuWrapper.width}px`;
      selectMenuRef.current[2].style.left = `${menuWrapper.left}px`;
      if (
        menuWrapper.bottom + menu.height >=
        window.document.documentElement.clientHeight
      ) {
        if (root.top - menu.height > 0) {
          selectMenuRef.current[2].style.top = `${root.top - menu.height}px`;
        } else if (
          window.document.documentElement.clientHeight - menu.height >
          0
        ) {
          selectMenuRef.current[2].style.top = `${
            window.document.documentElement.clientHeight - menu.height
          }px`;
        } else if (
          window.document.documentElement.clientHeight - menu.height <=
          0
        ) {
          selectMenuRef.current[2].style.top = `0px`;
        }
      } else {
        selectMenuRef.current[2].style.top = `${menuWrapper.bottom}px`;
      }
    }
  };

  return (
    <Root
      ref={(el) => (selectMenuRef.current[0] = el)}
      {...(typeof overrides?.Root?.css === 'string'
        ? {
            cssStyle: overrides.Root.css,
            ...(overrides.Root ?? {}),
          }
        : overrides?.Root == undefined
        ? {}
        : {
            style: overrides.Root.css,
            ...overrides.Root,
          })}>
      <InputWrapper
        onClick={focusInput}
        isMenuVisible={isMenuVisible || isInputFucus}
        disable={disable}
        error={error}
        {...(typeof overrides?.InputWrapper?.css === 'string'
          ? {
              cssStyle: overrides.InputWrapper.css,
              ...(overrides.InputWrapper ?? {}),
            }
          : overrides?.InputWrapper == undefined
          ? {}
          : {
              style: overrides.InputWrapper.css,
              ...overrides.InputWrapper,
            })}>
        <InputValueWrapper
          {...(typeof overrides?.InputValueWrapper?.css === 'string'
            ? {
                cssStyle: overrides.InputValueWrapper.css,
                ...(overrides.InputValueWrapper ?? {}),
              }
            : overrides?.InputValueWrapper == undefined
            ? {}
            : {
                style: overrides.InputValueWrapper.css,
                ...overrides.InputValueWrapper,
              })}>
          {!!value && inputValue === undefined ? (
            <InputValue
              {...(typeof overrides?.InputValue?.css === 'string'
                ? {
                    cssStyle: overrides.InputValue.css,
                    ...(overrides.InputValue ?? {}),
                  }
                : overrides?.InputValue == undefined
                ? {}
                : {
                    style: overrides.InputValue.css,
                    ...overrides.InputValue,
                  })}>
              {value.label}
            </InputValue>
          ) : (
            <></>
          )}
          <Input
            ref={inputRef}
            value={inputValue ?? ''}
            placeholder={!!value ? '' : placeholder}
            size={1}
            disabled={!!disable}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              typeof e.currentTarget.value === 'string' && !!!disable
                ? setInputValue(e.currentTarget.value)
                : undefined
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              !!!disable ? InputOnKeyDown(e) : undefined
            }
            onFocus={() => setIsInputFocus(true)}
            onBlur={() => setIsInputFocus(false)}
            isInputValueExist={!!inputValue || !!!value}
            {...(typeof overrides?.Input?.css === 'string'
              ? {
                  cssStyle: overrides.Input.css,
                  ...(overrides.Input ?? {}),
                }
              : overrides?.Input == undefined
              ? {}
              : {
                  style: overrides.Input.css,
                  ...overrides.Input,
                })}
          />
        </InputValueWrapper>
        <InputIconWrapper
          {...(typeof overrides?.InputIconWrapper?.css === 'string'
            ? {
                cssStyle: overrides.InputIconWrapper.css,
                ...(overrides.InputIconWrapper ?? {}),
              }
            : overrides?.InputIconWrapper == undefined
            ? {}
            : {
                style: overrides.InputIconWrapper.css,
                ...overrides.InputIconWrapper,
              })}>
          <InputIcon
            viewBox='0 0 24 24'
            disable={disable}
            {...(typeof overrides?.InputIcon?.css === 'string'
              ? {
                  cssStyle: overrides.InputIcon.css,
                  ...(overrides.InputIcon ?? {}),
                }
              : overrides?.InputIcon == undefined
              ? {}
              : {
                  style: overrides.InputIcon.css,
                  ...overrides.InputIcon,
                })}>
            <path d='M12.7071 15.2929L17.1464 10.8536C17.4614 10.5386 17.2383 10 16.7929 10L7.20711 10C6.76165 10 6.53857 10.5386 6.85355 10.8536L11.2929 15.2929C11.6834 15.6834 12.3166 15.6834 12.7071 15.2929Z'></path>
          </InputIcon>
        </InputIconWrapper>
      </InputWrapper>
      <MenuWrapper
        ref={(el) => (selectMenuRef.current[1] = el)}
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
          e.preventDefault();
          e.nativeEvent.stopImmediatePropagation();
        }}
        {...(typeof overrides?.MenuWrapper?.css === 'string'
          ? {
              cssStyle: overrides.MenuWrapper.css,
              ...(overrides.MenuWrapper ?? {}),
            }
          : overrides?.MenuWrapper == undefined
          ? {}
          : {
              style: overrides.MenuWrapper.css,
              ...overrides.MenuWrapper,
            })}>
        {!isMenuVisible
          ? undefined
          : ReactDOM.createPortal(
              <Menu
                ref={(el) => (selectMenuRef.current[2] = el)}
                isMenuVisible={isMenuVisible}
                {...(typeof overrides?.Menu?.css === 'string'
                  ? {
                      cssStyle: overrides.Menu.css,
                      ...(overrides.Menu ?? {}),
                    }
                  : overrides?.Menu == undefined
                  ? {}
                  : {
                      style: overrides.Menu.css,
                      ...overrides.Menu,
                    })}>
                <MenuList
                  {...(typeof overrides?.MenuList?.css === 'string'
                    ? {
                        cssStyle: overrides.MenuList.css,
                        ...(overrides.MenuList ?? {}),
                      }
                    : overrides?.MenuList == undefined
                    ? {}
                    : {
                        style: overrides.MenuList.css,
                        ...overrides.MenuList,
                      })}>
                  {searchedItems.length > 0 ? (
                    searchedItems.map((item, i) => (
                      <MenuItem
                        key={i}
                        ref={(el) => (itemsRef.current[i] = el)}
                        isSelected={item.id === value?.id}
                        isFocused={i === focusedItemIndex}
                        isDisabled={!!item?.disabled}
                        onClick={(e: React.MouseEvent<HTMLElement>) => {
                          if (
                            !!!item?.disabled &&
                            (typeof item?.onClick === 'function' ||
                              typeof onChange === 'function')
                          ) {
                            if (typeof item?.onClick === 'function') {
                              item.onClick(e);
                            }
                            if (typeof onChange === 'function') {
                              onChange({
                                type: 'select',
                                // TODO: 누군가 해결해주세요..
                                // @ts-ignore
                                selected: {
                                  label: item.label,
                                  id: item.id,
                                  payload: item.payload,
                                },
                              });
                            }
                            clearInput();
                          }
                        }}
                        onMouseEnter={() =>
                          !!item?.disabled ? undefined : setFocusedItemIndex(i)
                        }
                        {...(typeof overrides?.MenuItem?.css === 'string'
                          ? {
                              cssStyle: overrides.MenuItem.css,
                              ...(overrides.MenuItem ?? {}),
                            }
                          : overrides?.MenuItem == undefined
                          ? {}
                          : {
                              style: overrides.MenuItem.css,
                              ...overrides.MenuItem,
                            })}>
                        {item.label}
                      </MenuItem>
                    ))
                  ) : (
                    <NoResultWrapper
                      {...(typeof overrides?.NoResultWrapper?.css === 'string'
                        ? {
                            cssStyle: overrides.NoResultWrapper.css,
                            ...(overrides.NoResultWrapper ?? {}),
                          }
                        : overrides?.NoResultWrapper == undefined
                        ? {}
                        : {
                            style: overrides.NoResultWrapper.css,
                            ...overrides.NoResultWrapper,
                          })}>
                      No results
                    </NoResultWrapper>
                  )}
                </MenuList>
              </Menu>,
              document.body,
            )}
      </MenuWrapper>
    </Root>
  );
}
export default memo(PureSelect) as typeof PureSelect;
