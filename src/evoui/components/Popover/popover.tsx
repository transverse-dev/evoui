import React, { memo, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { PopoverType } from './popover.type';

const Root = styled.div<PopoverType.RootPropsType>`
  position: relative;
  display: inline-flex;
  flex-direction: ${(props) =>
    props?.locationY === 'top'
      ? 'column-reverse'
      : props?.locationY === 'bottom'
      ? 'column'
      : ''};
  width: fit-content;
  height: fit-content;

  ${(props) => props.cssStyle ?? ''};
`;

const ButtonWrapper = styled.div<PopoverType.ButtonWrapperPropsType>`
  display: inline-flex;
  width: fit-content;
  height: fit-content;
  cursor: pointer;

  ${(props) => props.cssStyle ?? ''};
`;

const DefaultButton = styled.button<PopoverType.DefaultButtonPropsType>`
  margin: 0;
  border: none;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: transparent;
  outline: none;
  cursor: ${(props) => (props.isDisable ? 'not-allowed' : 'pointer')};

  > svg {
    height: 100%;
    fill: ${(props) => props.theme.colors.universal.fgColor};
  }

  ${(props) => props.cssStyle ?? ''};
`;

const MenuWrapper = styled.div<PopoverType.MenuWrapperPropsType>`
  z-index: 1000;
  position: relative;
  width: 100%;

  ${(props) => props.cssStyle ?? ''};
`;

const Menu = styled.div<PopoverType.MenuPropsType>`
  z-index: 11111;
  border-radius: 6px;
  position: ${(props) => (props.isExternal ? 'fixed' : 'absolute')};
  display: inline-block;
  width: fit-content;
  height: fit-content;
  max-width: 90vh;
  max-height: 90vh;
  min-width: 80px;
  background-color: ${(props) => props.theme.colors.evoui.dropDownList.bgColor};
  box-shadow: 1px 1px 4px
    ${(props) => props.theme.colors.evoui.dropDownList.shadowColor};
  overflow-x: hidden;
  overflow-y: auto;
  animation-name: ${(props) => (props.isMenuVisible ? 'fadeInScale' : '')};
  animation-duration: 300ms;
  animation-fill-mode: both;

  @keyframes fadeInScale {
    0% {
      opacity: 0;
      transform: scale(
        1
      ); // 처음 위치를 계산할때 scale이 0.8이면 해당 사이즈로 계산해 오류 발생
    }
    1% {
      opacity: 0;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  ${(props) => props.cssStyle ?? ''};
`;

const MenuList = styled.div<PopoverType.MenuListPropsType>`
  padding: 4px 0;
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;

  ${(props) => props.cssStyle ?? ''};
`;

const MenuItem = styled.div<PopoverType.MenuItemPropsType>`
  padding: 8px 12px;
  color: ${(props) => props.theme.colors.evoui.dropDownList.fgColor};
  font-size: 0.9rem;
  font-weight: ${(props) => (props.isSelected ? '600' : '500')};
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: ${(props) =>
    props.isSelected
      ? props.theme.colors.evoui.dropDownList.hoverBgColor
      : 'transparent'};
  cursor: ${(props) =>
    !!props?.isDisabled
      ? 'not-allowed'
      : !!props?.isClickEventExist
      ? 'pointer'
      : 'default'};
  user-select: none;
  opacity: ${(props) => (!!props?.isDisabled ? '0.3' : '1')};
  overflow: hidden;
  transition: all ease-in-out 200ms;

  &:hover {
    background-color: ${(props) =>
      !!!props.isDisabled && !!props.isClickEventExist
        ? props.theme.colors.evoui.dropDownList.hoverBgColor
        : 'transparent'};
  }

  ${(props) => props.cssStyle ?? ''};
`;

const Divider = styled.div<PopoverType.DividerPropsType>`
  margin: 4px 0;
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.universal.dividerColor};

  ${(props) => props.cssStyle ?? ''};
`;

const Popover = memo(function Popover({
  Button,
  items,
  benchmark = 'bottom-right',
  direction = 'bottom-left',
  position = {
    x: 0,
    y: 0,
  },
  margin = {
    right: 0,
    left: 0,
  },
  isExternal = false,
  closeOutOfScreen,
  scrollTarget,
  onOpen,
  onClose,
  close = false,
  disable = false,
  overrides,
}: PopoverType.PropsType) {
  /*
   * Button: 메뉴를 킬 버튼을 커스텀 할 수 있다.
   * items: 메뉴 리스트를 커스텀 할 수 있다.
   *   이때 리스트가 Element일 수 있고
   *   Divider일 수 있고
   *   기본 형식인 Item일 수 있는데,
   *     item은 label과, 클릭시 이벤트, 비활성화 여부를 설정할 수 있다.
   * benchmark: 메뉴의 시작점을 설정할 수 있다.
   * direction: 메뉴의 방향을 설정할 수 있다.
   * position: 메뉴의 위치를 조정할 수 있다.
   * margin: 메뉴가 화면 끝에 위치했을 때의 margin을 설정할 수 있다.
   * isExternal: 메뉴가 외부에 종속될지 설정할 수 있다.
   * closeOutOfScreen: 버튼이 화면 밖으로 나갔을 시 메뉴 오픈 여부를 설정할 수 있다.
   * scrollTarget: 메뉴가 어떤 상위 요소에 반응할지 설정할 수 있다.
   * onOpen: 메뉴가 열리면서 실행될 함수를 설정할 수 있다.
   * onClose: 메뉴가 닫히면서 실행될 함수를 설정할 수 있다.
   * close: 메뉴를 수동으로 닫을때 사용한다.(true가 되면 닫는다. onClose로 state를 false로 바꾸어 다시 사용)
   * disable: 메뉴의 비활성화 여부를 설정할 수 있다.
   * overrides: 전체 기본 요소 커스텀
   */

  const popoverMenuRef = useRef<Array<any>>([]);
  /*
   * popoverMenuRef.current[0]: Root
   *   - isExternal가 true 일때 사용
   * popoverMenuRef.current[1]: MenuWrapper
   *   - isExternal가 false 일때 사용
   * popoverMenuRef.current[2]: Menu
   *   - Menu의 위치와 거리계산에 사용
   */

  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

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

  const handleClickOutside = (event: { target: any }) => {
    if (!popoverMenuRef.current[0] || !popoverMenuRef.current[2]) {
      closeMenu();
    } else if (
      !popoverMenuRef.current[0].contains(event.target) &&
      !popoverMenuRef.current[2].contains(event.target)
    )
      closeMenu();
  };

  const setMenuPosition = () => {
    if (
      isMenuVisible &&
      !!popoverMenuRef?.current[0] &&
      !!popoverMenuRef?.current[1] &&
      !!popoverMenuRef?.current[2]
    ) {
      if (
        scrollTarget?.current !== undefined &&
        !!closeOutOfScreen &&
        (popoverMenuRef.current[0].getBoundingClientRect().top <=
          scrollTarget.current?.getBoundingClientRect()?.top ||
          popoverMenuRef.current[0].getBoundingClientRect().bottom >=
            scrollTarget.current?.getBoundingClientRect()?.bottom)
      ) {
        closeMenu();
      } else if (
        !!closeOutOfScreen &&
        (popoverMenuRef.current[0].getBoundingClientRect().top <= 0 ||
          popoverMenuRef.current[0].getBoundingClientRect().bottom >=
            window.document.documentElement.clientHeight)
      ) {
        closeMenu();
      }
      var top: number | null = null;
      var right: number | null = null;
      var bottom: number | null = null;
      var left: number | null = null;
      const root = popoverMenuRef.current[0].getBoundingClientRect();
      const menuWrapper = popoverMenuRef.current[1].getBoundingClientRect();
      const menu = popoverMenuRef.current[2].getBoundingClientRect();
      if (isExternal) {
        if (direction?.split('-')[0] === 'top') {
          if (
            menuWrapper.top - menu.height - position.y > 0 ||
            root.bottom + menu.height - position.y >=
              window.document.documentElement.clientHeight
          ) {
            top = menuWrapper.top - menu.height - position.y;
          } else {
            top = root.bottom - position.y;
          }
        } else if (direction?.split('-')[0] === 'bottom') {
          if (
            menuWrapper.bottom + menu.height - position.y <
              window.document.documentElement.clientHeight ||
            root.top - menu.height - position.y <= 0
          ) {
            top = menuWrapper.bottom - position.y;
          } else {
            top = root.top - menu.height - position.y;
          }
        }
        if (direction?.split('-')[1] === 'left') {
          if (benchmark?.split('-')[1] === 'left') {
            left = menuWrapper.left - menu.width;
          } else if (benchmark?.split('-')[1] === 'center') {
            left = menuWrapper.left + menuWrapper.width / 2 - menu.width;
          } else if (benchmark?.split('-')[1] === 'right') {
            left = menuWrapper.right - menu.width;
          }
        } else if (direction?.split('-')[1] === 'center') {
          if (benchmark?.split('-')[1] === 'left') {
            left = menuWrapper.left - menu.width / 2;
          } else if (benchmark?.split('-')[1] === 'center') {
            left = menuWrapper.left + menuWrapper.width / 2 - menu.width / 2;
          } else if (benchmark?.split('-')[1] === 'right') {
            left = menuWrapper.right - menu.width / 2;
          }
        } else if (direction?.split('-')[1] === 'right') {
          if (benchmark?.split('-')[1] === 'left') {
            left = menuWrapper.left;
          } else if (benchmark?.split('-')[1] === 'center') {
            left = menuWrapper.left + menuWrapper.width / 2;
          } else if (benchmark?.split('-')[1] === 'right') {
            left = menuWrapper.right;
          }
        }
      } else {
        if (direction?.split('-')[0] === 'top') {
          if (
            menuWrapper.top - menu.height - position.y > 0 ||
            root.bottom + menu.height - position.y >=
              window.document.documentElement.clientHeight
          ) {
            bottom = 0 + position.y;
          } else {
            top = root.height - position.y;
          }
        } else if (direction?.split('-')[0] === 'bottom') {
          if (
            menuWrapper.bottom + menu.height - position.y <
              window.document.documentElement.clientHeight ||
            root.top - menu.height - position.y <= 0
          ) {
            top = 0 - position.y;
          } else {
            bottom = root.height + position.y;
          }
        }
        if (direction?.split('-')[1] === 'left') {
          if (benchmark?.split('-')[1] === 'left') {
            right = menuWrapper.width;
          } else if (benchmark?.split('-')[1] === 'center') {
            right = menuWrapper.width / 2;
          } else if (benchmark?.split('-')[1] === 'right') {
            right = 0;
          }
        } else if (direction?.split('-')[1] === 'center') {
          if (benchmark?.split('-')[1] === 'left') {
            left = -(menu.width / 2);
          } else if (benchmark?.split('-')[1] === 'center') {
            left = menuWrapper.width / 2 - menu.width / 2;
          } else if (benchmark?.split('-')[1] === 'right') {
            right = -(menu.width / 2);
          }
        } else if (direction?.split('-')[1] === 'right') {
          if (benchmark?.split('-')[1] === 'left') {
            left = 0;
          } else if (benchmark?.split('-')[1] === 'center') {
            left = menuWrapper.width / 2;
          } else if (benchmark?.split('-')[1] === 'right') {
            left = menuWrapper.width;
          }
        }
      }
      if (top !== null) {
        popoverMenuRef.current[2].style.top = `${top}px`;
      } else {
        popoverMenuRef.current[2].style.top = ``;
      }
      if (right !== null) {
        popoverMenuRef.current[2].style.right = `${right - position.x}px`;
      } else {
        popoverMenuRef.current[2].style.right = ``;
      }
      if (bottom !== null) {
        popoverMenuRef.current[2].style.bottom = `${bottom}px`;
      } else {
        popoverMenuRef.current[2].style.bottom = ``;
      }
      if (left !== null) {
        if (!!isExternal && left + position.x <= 0 + (margin?.left ?? 0)) {
          popoverMenuRef.current[2].style.left = `${0 + (margin?.left ?? 0)}px`;
        } else if (
          !!isExternal &&
          left + menu.width + position.x >=
            window.document.documentElement.clientWidth - (margin?.right ?? 0)
        ) {
          popoverMenuRef.current[2].style.left = `${
            window.document.documentElement.clientWidth -
            menu.width -
            (margin?.right ?? 0)
          }px`;
        } else if (
          !!!isExternal &&
          menuWrapper.left +
            menu.width +
            left +
            position.x +
            (margin?.right ?? 0) >=
            window.document.documentElement.clientWidth
        ) {
          popoverMenuRef.current[2].style.left = `${
            window.document.documentElement.clientWidth -
            menuWrapper.left -
            menu.width -
            position.x -
            (margin?.right ?? 0)
          }px`;
        } else {
          popoverMenuRef.current[2].style.left = `${left + position.x}px`;
        }
      } else {
        popoverMenuRef.current[2].style.left = ``;
      }
    }
  };
  /* 메뉴의 위치를 정해주는 함수
   * 처음에 메뉴가 열렸는지, 위치 계산에 필요한 ref들은 준비 되었는지 확인
   *
   * 만약 closeOutOfScreen가 true고, 버튼의 위치가 화면 위로 올라갔다면 menu 닫기
   * 또는 만약 closeOutOfScreen가 true고, 버튼의 위치가 화면 아래로 내려갔다면 menu 닫기
   *
   * 만약 isExternal가 true(메뉴가 외부에 종속)고
   *   만약 메뉴의 방향이 윗 방향으로 가야한다면 위로가게 실행
   *     이때 메뉴가 화면 상단에 잘린다면 메뉴의 방향을 아래로 가게 실행
   *   또는 만약 메뉴의 방향이 아랫 방향으로 가야한다면 아래로 가게 실행
   *     이때 메뉴가 화면 하단에 잘린다면 메뉴의 방향을 위로 가게 실행
   *   만약 메뉴의 방향이 왼쪽 방향으로 가야하는데,
   *     만약 시작 위치가 왼쪽 이라면 실행
   *     또는 만약 시작 위치가 가운데 이라면 실행
   *     또는 만약 시작 위치가 오른쪽 이라면 실행
   *   만약 메뉴의 방향이 가운데 방향으로 가야하는데,
   *     만약 시작 위치가 왼쪽 이라면 실행
   *     또는 만약 시작 위치가 가운데 이라면 실행
   *     또는 만약 시작 위치가 오른쪽 이라면 실행
   *   만약 메뉴의 방향이 가운데 방향으로 가야하는데,
   *     만약 시작 위치가 왼쪽 이라면 실행
   *     또는 만약 시작 위치가 중앙 이라면 실행
   *     또는 만약 시작 위치가 오른쪽 이라면 실행
   * 또는 isExternal가 false(메뉴가 MenuWrapper에 종속)고
   *   만약 메뉴의 방향이 윗 방향으로 가야한다면 위로가게 실행
   *     이때 메뉴가 화면 상단에 잘린다면 메뉴의 방향을 아래로 가게 실행
   *   또는 만약 메뉴의 방향이 아랫 방향으로 가야한다면 아래로 가게 실행
   *     이때 메뉴가 화면 하단에 잘린다면 메뉴의 방향을 위로 가게 실행
   *   만약 메뉴의 방향이 왼쪽 방향으로 가야하는데,
   *     만약 시작 위치가 왼쪽 이라면 실행
   *     또는 만약 시작 위치가 가운데 이라면 실행
   *     또는 만약 시작 위치가 오른쪽 이라면 실행
   *   만약 메뉴의 방향이 가운데 방향으로 가야하는데,
   *     만약 시작 위치가 왼쪽 이라면 실행
   *     또는 만약 시작 위치가 가운데 이라면 실행
   *     또는 만약 시작 위치가 오른쪽 이라면 실행
   *   만약 메뉴의 방향이 가운데 방향으로 가야하는데,
   *     만약 시작 위치가 왼쪽 이라면 실행
   *     또는 만약 시작 위치가 중앙 이라면 실행
   *     또는 만약 시작 위치가 오른쪽 이라면 실행
   *
   * 위에서 실행된 위치를 메뉴에 적용
   *   이때 isExternal가 true(메뉴가 외부에 종속)고 메뉴가 화면 좌측에 잘린다면
   *   메뉴를 화면 좌측에 고정
   *   이때 isExternal가 true(메뉴가 외부에 종속)고 메뉴가 화면 우측에 잘린다면
   *   메뉴를 화면 우측에 고정
   */

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
  }, [Button, items, overrides]);
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
  }, [popoverMenuRef.current[0]]);
  /*
   * 메뉴를 제외한 다른곳 클릭 시
   * 메뉴 닫기
   */

  useEffect(() => {
    if (isMenuVisible && close) {
      closeMenu();
    }
  }, [close]);

  return (
    <Root
      ref={(el) => (popoverMenuRef.current[0] = el)}
      locationY={benchmark?.split('-')[0]}
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
      <ButtonWrapper
        onClick={() => (!!disable ? undefined : toggleMenu())}
        {...(typeof overrides?.ButtonWrapper?.css === 'string'
          ? {
              cssStyle: overrides.ButtonWrapper.css,
              ...(overrides.ButtonWrapper ?? {}),
            }
          : overrides?.ButtonWrapper == undefined
          ? {}
          : {
              style: overrides.ButtonWrapper.css,
              ...overrides.ButtonWrapper,
            })}>
        {Button !== undefined ? (
          <Button menuVisible={isMenuVisible} />
        ) : (
          <DefaultButton
            isDisable={disable}
            {...(typeof overrides?.DefaultButton?.css === 'string'
              ? {
                  cssStyle: overrides.DefaultButton.css,
                  ...(overrides.DefaultButton ?? {}),
                }
              : overrides?.DefaultButton == undefined
              ? {}
              : {
                  style: overrides.DefaultButton.css,
                  ...overrides.DefaultButton,
                })}>
            <svg viewBox='0 0 24 24'>
              <path d='M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' />
            </svg>
          </DefaultButton>
        )}
      </ButtonWrapper>
      <MenuWrapper
        ref={(el) => (popoverMenuRef.current[1] = el)}
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
        {!isMenuVisible ? undefined : !!isExternal ? (
          ReactDOM.createPortal(
            <Menu
              ref={(el) => (popoverMenuRef.current[2] = el)}
              isExternal={!!isExternal}
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
                {items?.map((item: any, i) => (
                  <React.Fragment key={i}>
                    {item === 'divider' ? (
                      <Divider
                        {...(typeof overrides?.Divider?.css === 'string'
                          ? {
                              cssStyle: overrides.Divider.css,
                              ...(overrides.Divider ?? {}),
                            }
                          : overrides?.Divider == undefined
                          ? {}
                          : {
                              style: overrides.Divider.css,
                              ...overrides.Divider,
                            })}
                      />
                    ) : typeof item?.label === 'string' ? (
                      <MenuItem
                        isSelected={!!item?.selected}
                        isDisabled={!!item?.disabled}
                        isClickEventExist={!!item?.onClick}
                        onClick={(e: React.MouseEvent<HTMLElement>) => {
                          if (typeof item?.onClick === 'function') {
                            item.onClick(e);
                            closeMenu();
                          }
                        }}
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
                    ) : !!item ? (
                      item
                    ) : undefined}
                  </React.Fragment>
                ))}
              </MenuList>
            </Menu>,
            document.body,
          )
        ) : (
          <Menu
            ref={(el) => (popoverMenuRef.current[2] = el)}
            isExternal={!!isExternal}
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
              {items?.map((item: any, i) => (
                <React.Fragment key={i}>
                  {item === 'divider' ? (
                    <Divider
                      {...(typeof overrides?.Divider?.css === 'string'
                        ? {
                            cssStyle: overrides.Divider.css,
                            ...(overrides.Divider ?? {}),
                          }
                        : overrides?.Divider == undefined
                        ? {}
                        : {
                            style: overrides.Divider.css,
                            ...overrides.Divider,
                          })}
                    />
                  ) : typeof item?.label === 'string' ? (
                    <MenuItem
                      isSelected={!!item?.selected}
                      isDisabled={!!item?.disabled}
                      isClickEventExist={!!item?.onClick}
                      onClick={(e: React.MouseEvent<HTMLElement>) => {
                        if (typeof item?.onClick === 'function') {
                          item.onClick(e);
                          closeMenu();
                        }
                      }}
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
                  ) : !!item ? (
                    item
                  ) : undefined}
                </React.Fragment>
              ))}
            </MenuList>
          </Menu>
        )}
      </MenuWrapper>
    </Root>
  );
});

export default Popover;
