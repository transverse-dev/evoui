import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { DropdownListType } from './dropdownlist.type';

const Root = styled.div<DropdownListType.RootPropsType>`
  width: 100px;
  height: 28px;
  border-radius: 6px;
  user-select: none;
  position: relative;

  ${(props) => props?.cssStyle ?? ''};
`;

const ListWrapper = styled.div<DropdownListType.ListWrapperPropsType>`
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: ${(props) =>
    props.listVisible
      ? `1px 1px 4px ${props.theme.evoui.colors.dropDownList.shadowColor}`
      : 'none'};
  height: ${(props) => (props.listVisible ? 'fit-content' : '28px')};
  background-color: ${(props) => props.theme.evoui.colors.dropDownList.bgColor};
  max-height: 90vh;
  z-index: ${(props) => (props.listVisible ? '9' : '0')};
  position: absolute;
  left: 0;
  right: 0;
  top: ${(props) => (props.listVisible ? `${-props.absolute}px` : '0')};
  transition-duration: 0.1s;

  &:hover {
    box-shadow: 1px 1px 4px
      ${(props) => props.theme.evoui.colors.dropDownList.shadowColor};
  }

  ${(props) => props?.cssStyle ?? ''};
`;

const List = styled.div<DropdownListType.ListPropsType>`
  width: 100%;
  overflow: ${(props) => (props.listVisible ? 'hidden auto' : 'hidden')};
  height: ${(props) => (props.listVisible ? 'fit-content' : '28px')};
  max-height: 90vh;
  background-color: ${(props) => props.theme.evoui.colors.dropDownList.bgColor};
  display: flex;
  flex-direction: column;

  ${(props) => props.cssStyle ?? ''};
`;

const ListItem = styled.div<DropdownListType.ListItemPropsType>`
  height: 28px;
  padding: 2px 8px;
  color: ${(props) =>
    !!props.selected && props.listVisible
      ? props.theme.evoui.colors.dropDownList.accentColor
      : props.theme.evoui.colors.dropDownList.fgColor};
  line-height: 24px;
  text-align: center;
  cursor: ${(props) => (!!props.disabled ? 'default' : 'pointer')};
  white-space: nowrap;
  margin: 0;
  opacity: ${(props) => (!!props.disabled ? '0.5' : '1')};
  font-size: 14.4px;

  &:hover {
    background-color: ${(props) =>
      props.listVisible && !props.disabled
        ? props.theme.evoui.colors.dropDownList.hoverBgColor
        : 'transparent'};
  }

  ${(props) => props?.cssStyle ?? ''};
`;

export default function DropdownList({
  options = [{ label: 'DropDownList', id: 0 }],
  placeholder = 'Select',
  value,
  onChange,
  overrides,
  closeOnChange = true,
}: DropdownListType.PropsType) {
  const [listVisible, setListVisible] = useState<boolean>(false);
  const [isListAbsolute, setIsListAbsolute] = useState<number>(0);

  const dropDownListRef = useRef<Array<any>>([]);

  const closeList = () => setListVisible(false);

  const handleClickOutside = (event: { target: any }) => {
    if (
      dropDownListRef.current[0] &&
      !dropDownListRef.current[0].contains(event.target)
    )
      closeList();
  };

  const scrollEvent = () => {
    if (listVisible) {
      if (!!dropDownListRef?.current[0] && !!dropDownListRef?.current[1]) {
        let offset =
          dropDownListRef.current[0].getBoundingClientRect().top +
          dropDownListRef.current[1].getBoundingClientRect().height -
          window.innerHeight;
        if (offset > 0) {
          setIsListAbsolute(offset);
        } else if (dropDownListRef.current[0].getBoundingClientRect().top < 0) {
          setIsListAbsolute(
            dropDownListRef.current[0].getBoundingClientRect().top,
          );
        } else {
          setIsListAbsolute(0);
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropDownListRef.current[0]]);

  useEffect(() => {
    if (listVisible) {
      window.addEventListener('scroll', scrollEvent);
    } else {
      window.removeEventListener('scroll', scrollEvent);
    }
    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, [listVisible]);

  useEffect(() => {
    scrollEvent();
  }, [listVisible, options, placeholder, value, overrides]);

  return (
    <Root
      ref={(el) => (dropDownListRef.current[0] = el)}
      {...(typeof overrides?.Root?.css === 'string'
        ? {
            cssStyle: overrides.Root.css,
            ...(overrides.Root ?? {}),
          }
        : overrides?.Root == undefined
        ? {}
        : { style: overrides.Root.css, ...overrides.Root })}>
      <ListWrapper
        listVisible={listVisible}
        absolute={isListAbsolute}
        {...(typeof overrides?.ListWrapper?.css === 'string'
          ? {
              cssStyle: overrides.ListWrapper.css,
              ...(overrides.ListWrapper ?? {}),
            }
          : overrides?.ListWrapper == undefined
          ? {}
          : { style: overrides.ListWrapper.css, ...overrides.ListWrapper })}>
        <List
          ref={(el) => (dropDownListRef.current[1] = el)}
          listVisible={listVisible}
          {...(typeof overrides?.List?.css === 'string'
            ? {
                cssStyle: overrides.List.css,
                ...(overrides.List ?? {}),
              }
            : overrides?.List == undefined
            ? {}
            : { style: overrides.List.css, ...overrides.List })}>
          <ListItem
            listVisible={listVisible}
            selected={true}
            onClick={() => setListVisible((listVisible) => !listVisible)}
            {...(typeof overrides?.ListItem?.css === 'string'
              ? {
                  cssStyle: overrides.ListItem.css,
                  ...(overrides.ListItem ?? {}),
                }
              : overrides?.ListItem == undefined
              ? {}
              : { style: overrides.ListItem.css, ...overrides.ListItem })}>
            {value ? value.label : placeholder}
          </ListItem>
          {options
            ?.filter((option) => (value ? value.id !== option.id : true))
            .map(
              (
                option, // value !== option 비교 불가
              ) => (
                <ListItem
                  listVisible={listVisible}
                  key={option.id}
                  onClick={() => {
                    if (!option.disabled) {
                      !!onChange && onChange(option);
                      !!closeOnChange && closeList();
                    }
                  }}
                  disabled={option.disabled}
                  {...(typeof overrides?.ListItem?.css === 'string'
                    ? {
                        cssStyle: overrides.ListItem.css,
                        ...(overrides.ListItem ?? {}),
                      }
                    : overrides?.ListItem == undefined
                    ? {}
                    : {
                        style: overrides.ListItem.css,
                        ...overrides.ListItem,
                      })}>
                  {option.label}
                </ListItem>
              ),
            ) ?? null}
        </List>
      </ListWrapper>
    </Root>
  );
}
