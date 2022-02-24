import { Fragment, memo, useEffect, useRef, useState } from 'react';
import { createPortal, findDOMNode } from 'react-dom';

import { popoverMenu } from './index.type';
import styled from 'styled-components';

const Root = styled.div<popoverMenu.RootPropsType>`
  font-size: 14.4px;
  position: relative;
  width: fit-content;
  height: fit-content;

  ${(props) => props.cssStyle ?? ''};
`;

const MenuListBase = styled.div<popoverMenu.MenuListBasePropsType>`
  position: absolute;
  margin-top: 10px;
  left: 0;
  right: 0;

  ${(props) => props.cssStyle ?? ''};
`;

const MenuListWrapperWrapper = styled.div<popoverMenu.MenuListWrapperWrapperPropsType>`
  z-index: 1000;

  position: ${(props) => (props.isFixed ? 'fixed' : 'absolute')};
  display: ${(props) => (props.menuVisible ? 'flex' : 'none')};
  right: 0;
  top: 0;

  ${(props) => props.cssStyle ?? ''};
`;

const MenuListWrapper = styled.div<popoverMenu.MenuListWrapperPropsType>`
  overflow: hidden;
  border-radius: 6px;
  background-color: #ffffff;
  box-shadow: 1px 1px 4px rgb(0 0 0 / 25%);

  animation-name: fadeInScale;
  animation-duration: 0.3s;
  animation-fill-mode: both;

  @keyframes fadeInScale {
    0% {
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

const MenuList = styled.div<popoverMenu.MenuListPropsType>`
  flex-direction: column;
  min-width: 80px;
  padding: 4px 0;
  max-height: 90vh;
  max-width: 90vw;
  overflow: hidden auto;

  ${(props) => props.cssStyle ?? ''};
`;

const MenuItem = styled.div<popoverMenu.MenuItemPropsType>`
  padding: 4px 12px;
  color: #555555;
  line-height: 24px;
  text-align: center;
  cursor: ${(props) =>
    !!props.disabled || !!props.noClick ? 'default' : 'pointer'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  opacity: ${(props) => (!!props.disabled ? '0.5' : '1')};
  font-size: 14.4px;
  transition-duration: 0.1s;

  &:hover {
    background-color: ${(props) =>
      !props.disabled && !props.noClick
        ? 'rgba(233,233,233,0.72)'
        : 'transparent'};
  }

  ${(props) => props.cssStyle ?? ''};
`;

const Divider = styled.div<popoverMenu.DividerPropsType>`
  height: 1px;
  margin: 4px 0;
  background-color: #e5e5e5;

  ${(props) => props.cssStyle ?? ''};
`;

const Circle = styled.div`
  height: 24px;
  width: 24px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & path {
    fill: #212121;
  }
`;

const DefaultButton = function DefaultButton() {
  return (
    <Circle>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        height='24'
        viewBox='0 0 24 24'
        width='24'>
        <path d='M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' />
      </svg>
    </Circle>
  );
};

export const PopoverMenu = memo(function PopoverMenu({
  Button,
  items,
  overrides,
  isFixed = false,
  fixedParent,
  onOpen,
  onClose,
  location,
  snap = 'sticky',
  closeOnOut = false,
  scrollTarget = window,
}: popoverMenu.PopoverMenuProps) {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const popoverMenuRef = useRef<Array<any>>([]);

  const toggleMenu = () => {
    if (menuVisible) closeMenu();
    else openMenu();
  };

  const openMenu = () => {
    onOpen && onOpen();
    setMenuVisible(true);
  };

  const closeMenu = () => {
    onClose && onClose();
    setMenuVisible(false);
  };

  const handleClickOutside = (event: { target: any }) => {
    if (!popoverMenuRef.current[0] || !popoverMenuRef.current[1]) closeMenu();
    else if (
      !popoverMenuRef.current[0].contains(event.target) &&
      !popoverMenuRef.current[1].contains(event.target)
    )
      closeMenu();
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popoverMenuRef.current[0]]);

  const scrollEvent = () => {
    if (menuVisible) {
      if (!!popoverMenuRef?.current[2] && !!popoverMenuRef?.current[1]) {
        if (isFixed) {
          if (!!popoverMenuRef.current[1]) {
            let offsetX;
            let offsetY;
            if (snap === 'sticky') {
              offsetX = -Math.min(
                Math.max(
                  window.document.documentElement.clientWidth -
                    popoverMenuRef.current[2].getBoundingClientRect().right,
                  0,
                ),
                window.document.documentElement.clientWidth -
                  popoverMenuRef.current[1].getBoundingClientRect().width,
              );
              offsetY = -Math.max(
                Math.min(
                  -popoverMenuRef.current[2].getBoundingClientRect().bottom,
                  0,
                ),
                popoverMenuRef.current[1].getBoundingClientRect().height -
                  window.document.documentElement.clientHeight,
              );
            } else if (snap === 'pop') {
              offsetX = -(
                window.document.documentElement.clientWidth -
                popoverMenuRef.current[2].getBoundingClientRect().right
              );
              if (
                (popoverMenuRef.current[2].style.bottom === '100%'
                  ? -(
                      popoverMenuRef.current[2].getBoundingClientRect().bottom +
                      (popoverMenuRef.current[3]?.getBoundingClientRect()
                        .height ?? 0) +
                      20
                    )
                  : -popoverMenuRef.current[2].getBoundingClientRect().bottom) <
                popoverMenuRef.current[1].getBoundingClientRect().height -
                  window.document.documentElement.clientHeight
              ) {
                popoverMenuRef.current[2].style.bottom = '100%';
                popoverMenuRef.current[2].style.marginBottom = '10px';
                offsetY =
                  popoverMenuRef.current[2].getBoundingClientRect().top -
                  popoverMenuRef.current[1].getBoundingClientRect().height;
              } else {
                popoverMenuRef.current[2].style.bottom = '';
                popoverMenuRef.current[2].style.marginBottom = '0';
                offsetY =
                  popoverMenuRef.current[2].getBoundingClientRect().bottom;
              }
            } else {
              offsetX = -(
                window.document.documentElement.clientWidth -
                popoverMenuRef.current[2].getBoundingClientRect().right
              );
              offsetY =
                popoverMenuRef.current[2].getBoundingClientRect().bottom;
            }
            if (
              closeOnOut &&
              (-offsetX < 0 ||
                -offsetX >
                  window.document.documentElement.clientWidth -
                    popoverMenuRef.current[1].getBoundingClientRect().width ||
                -offsetY > 0 ||
                -offsetY <
                  popoverMenuRef.current[1].getBoundingClientRect().height -
                    window.document.documentElement.clientHeight)
            ) {
              closeMenu();
            }
            popoverMenuRef.current[1].style.transform = `translate(${Math.floor(
              offsetX,
            )}px, ${Math.floor(offsetY)}px)`;
          }
        } else {
          if (!!popoverMenuRef.current[1]) {
            let offsetY = 0;
            switch (location?.split('-')[0]) {
              case 'top': {
                popoverMenuRef.current[2].style.bottom = '100%';
                popoverMenuRef.current[2].style.marginBottom = '10px';
                if (
                  popoverMenuRef.current[2].getBoundingClientRect().top -
                    popoverMenuRef.current[1].getBoundingClientRect().height <
                  0
                ) {
                  offsetY =
                    popoverMenuRef.current[2].getBoundingClientRect().top;
                } else if (
                  popoverMenuRef.current[2].getBoundingClientRect().top >
                  window.document.documentElement.clientHeight
                ) {
                  offsetY =
                    popoverMenuRef.current[2].getBoundingClientRect().top +
                    popoverMenuRef.current[1].getBoundingClientRect().height -
                    window.document.documentElement.clientHeight;
                } else {
                  offsetY =
                    popoverMenuRef.current[1].getBoundingClientRect().height;
                }
                break;
              }
              case 'bottom': {
                offsetY =
                  popoverMenuRef.current[2].getBoundingClientRect().top +
                  popoverMenuRef.current[1].getBoundingClientRect().height -
                  window.document.documentElement.clientHeight;
                if (offsetY > 0) {
                } else if (
                  popoverMenuRef.current[2].getBoundingClientRect().top < 0
                ) {
                  offsetY =
                    popoverMenuRef.current[2].getBoundingClientRect().top;
                } else {
                  offsetY = 0;
                }
                break;
              }
            }
            let offsetX = 0;
            switch (location?.split('-')[1]) {
              case 'start': {
                offsetX =
                  popoverMenuRef.current[2].getBoundingClientRect().width -
                  popoverMenuRef.current[1].getBoundingClientRect().width;
                if (
                  popoverMenuRef.current[2].getBoundingClientRect().left < 0
                ) {
                  offsetX =
                    -popoverMenuRef.current[2].getBoundingClientRect().left;
                } else if (
                  popoverMenuRef.current[2].getBoundingClientRect().left +
                    popoverMenuRef.current[1].getBoundingClientRect().width >
                  window.document.documentElement.clientWidth
                ) {
                  offsetX =
                    popoverMenuRef.current[2].getBoundingClientRect().right -
                    window.document.documentElement.clientWidth;
                }
                break;
              }
              case 'center': {
                offsetX =
                  (popoverMenuRef.current[2].getBoundingClientRect().width -
                    popoverMenuRef.current[1].getBoundingClientRect().width) /
                  2;
                if (
                  popoverMenuRef.current[2].getBoundingClientRect().right -
                    popoverMenuRef.current[2].getBoundingClientRect().width /
                      2 -
                    popoverMenuRef.current[1].getBoundingClientRect().width /
                      2 <
                  0
                ) {
                  offsetX =
                    -popoverMenuRef.current[2].getBoundingClientRect().left;
                } else if (
                  popoverMenuRef.current[2].getBoundingClientRect().right -
                    offsetX >
                  window.document.documentElement.clientWidth
                ) {
                  offsetX =
                    popoverMenuRef.current[2].getBoundingClientRect().right -
                    window.document.documentElement.clientWidth;
                }
                break;
              }
              case 'end':
              default: {
                offsetX =
                  popoverMenuRef.current[2].getBoundingClientRect().right -
                  popoverMenuRef.current[1].getBoundingClientRect().width;
                if (offsetX < 0) {
                } else if (
                  popoverMenuRef.current[2].getBoundingClientRect().right >
                  window.document.documentElement.clientWidth
                ) {
                  offsetX =
                    popoverMenuRef.current[2].getBoundingClientRect().right -
                    window.document.documentElement.clientWidth;
                } else {
                  offsetX = 0;
                }
              }
            }
            popoverMenuRef.current[1].style.transform = `translate(${Math.floor(
              -offsetX,
            )}px, ${Math.floor(-offsetY)}px)`;
          }
        }
      }
    }
  };

  useEffect(() => {
    if (menuVisible) {
      scrollEvent();
      scrollTarget.addEventListener('scroll', scrollEvent);
    } else {
      scrollTarget.removeEventListener('scroll', scrollEvent);
    }

    return () => {
      scrollTarget.removeEventListener('scroll', scrollEvent);
    };
  }, [menuVisible]);

  useEffect(() => {
    scrollEvent();
  }, [menuVisible, Button, items, overrides]);

  const MenuListComponent = () => {
    return (
      <MenuListWrapperWrapper
        ref={(el) => (popoverMenuRef.current[1] = el)}
        menuVisible={menuVisible}
        isFixed={isFixed}
        {...(typeof overrides?.MenuListWrapper?.css === 'string'
          ? {
              cssStyle: overrides.MenuListWrapper.css,
              ...(overrides.MenuListWrapper ?? {}),
            }
          : overrides?.MenuListWrapper == undefined
          ? {}
          : {
              style: overrides.MenuListWrapper.css,
              ...overrides.MenuListWrapper,
            })}>
        <MenuListWrapper
          {...(typeof overrides?.MenuListWrapper?.css === 'string'
            ? {
                cssStyle: overrides.MenuListWrapper.css,
                ...(overrides.MenuListWrapper ?? {}),
              }
            : overrides?.MenuListWrapper == undefined
            ? {}
            : {
                style: overrides.MenuListWrapper.css,
                ...overrides.MenuListWrapper,
              })}>
          <MenuList
            {...(typeof overrides?.MenuList?.css === 'string'
              ? {
                  cssStyle: overrides.MenuList.css,
                  ...(overrides.MenuList ?? {}),
                }
              : overrides?.MenuList == undefined
              ? {}
              : { style: overrides.MenuList.css, ...overrides.MenuList })}>
            {items?.map((item, i) => (
              <Fragment key={i}>
                {item === 'divider' ? (
                  <Divider
                    {...(typeof overrides?.Divider?.css === 'string'
                      ? {
                          cssStyle: overrides.Divider.css,
                          ...(overrides.Divider ?? {}),
                        }
                      : overrides?.Divider == undefined
                      ? {}
                      : { style: overrides.Divider.css, ...overrides.Divider })}
                  />
                ) : (
                  <MenuItem
                    disabled={item.disabled}
                    noClick={!item.onClick}
                    onClick={(event) => {
                      if (!!item.onClick && !item.disabled) {
                        item.onClick(event);
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
                )}
              </Fragment>
            )) ?? null}
          </MenuList>
        </MenuListWrapper>
      </MenuListWrapperWrapper>
    );
  };

  return (
    <Root
      ref={(el) => (popoverMenuRef.current[0] = el)}
      {...(typeof overrides?.Root?.css === 'string'
        ? {
            cssStyle: overrides.Root.css,
            ...(overrides.Root ?? {}),
          }
        : overrides?.Root == undefined
        ? {}
        : { style: overrides.Root.css, ...overrides.Root })}>
      <div onClick={toggleMenu} ref={(el) => (popoverMenuRef.current[3] = el)}>
        {!!Button ? <Button menuVisible={menuVisible} /> : <DefaultButton />}
      </div>
      <MenuListBase
        ref={(el) => (popoverMenuRef.current[2] = el)}
        {...(typeof overrides?.MenuListBase?.css === 'string'
          ? {
              cssStyle: overrides.MenuListBase.css,
              ...(overrides.MenuListBase ?? {}),
            }
          : overrides?.MenuListBase == undefined
          ? {}
          : { style: overrides.MenuListBase.css, ...overrides.MenuListBase })}>
        {isFixed ? (
          createPortal(
            <MenuListComponent />,
            fixedParent
              ? (findDOMNode(fixedParent) as Element) ?? document.body
              : document.body,
          )
        ) : (
          <MenuListComponent />
        )}
      </MenuListBase>
    </Root>
  );
});
