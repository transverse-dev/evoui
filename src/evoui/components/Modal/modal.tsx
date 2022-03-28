import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ModalType } from './modal.type';

const RootWrapper = styled.div<ModalType.RootWrapperPropsType>`
  z-index: 10000;
  padding: ${(props) =>
    props.scrollType === 'fullScreenScroll' ? '' : '16px'};
  position: fixed;
  top: ${(props) => (props.isBackgroundOff ? '50%' : '0')};
  right: ${(props) => (props.isBackgroundOff ? '' : '0')};
  bottom: ${(props) => (props.isBackgroundOff ? '' : '0')};
  left: ${(props) => (props.isBackgroundOff ? '50%' : '0')};
  display: inline-flex;
  justify-content: center;
  width: ${(props) => (props.isBackgroundOff ? 'fit-content' : '')};
  height: ${(props) => (props.isBackgroundOff ? 'fit-content' : '')};
  max-width: 100%;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: ${(props) =>
    props.scrollType === 'rootWrapperScroll' ? 'auto' : 'hidden'};
  cursor: pointer;
  transform: ${(props) =>
    props.isBackgroundOff ? 'translate(-50%, -50%)' : ''};

  ${(props) => props?.cssStyle ?? ''};
`;

const RootBackground = styled.div`
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000080;
`;

const Root = styled.div<ModalType.RootPropsType>`
  margin: auto 0;
  border-radius: ${(props) =>
    props.scrollType === 'fullScreenScroll' ? '' : '16px'};
  padding: 32px 24px 12px 24px;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  width: ${(props) =>
    props.scrollType === 'fullScreenScroll' ? '100%' : 'fit-content'};
  height: ${(props) =>
    props.scrollType === 'fullScreenScroll' ? '100%' : 'fit-content'};
  max-width: 100%;
  max-height: ${(props) =>
    props.scrollType === 'rootWrapperScroll'
      ? ''
      : props.scrollType === 'fullScreenScroll'
      ? '100%'
      : 'calc(100% - 32px)'};
  background-color: ${(props) => props.theme.evoui.colors.modal.bgColor};
  overflow-x: hidden;
  overflow-y: ${(props) =>
    props.scrollType === 'rootWrapperScroll' ? 'hidden' : 'auto'};
  opacity: 0;
  cursor: default;
  animation: fadeInUp 0.6s;
  animation-fill-mode: both;

  ${(props) =>
    props.isScrollStyleOn
      ? `
        &::-webkit-scrollbar {
          position: absolute;
          top: 0;
          right: 0;
          width: calc(7px + 12px);
        }

        &::-webkit-scrollbar-thumb {
          background-clip: padding-box;
          border: 6px solid transparent;
          border-radius: 9999px;
          background-color: #8a8a8a;
        }
      `
      : ''}

  @media screen and (max-width: 768px) {
    padding: 24px 24px 12px 24px;

    ${(props) =>
      props.isScrollStyleOn
        ? `
          &::-webkit-scrollbar {
            width: calc(3px + 3px);
          }

          &::-webkit-scrollbar-thumb {
            border-top: 12px solid transparent;
            border-right: 3px solid transparent;
            border-bottom: 12px solid transparent;
            border-left: 0px;
            border-radius: 0;
            background-color: #00000045;
            cursor: pointer;
          }
        `
        : ''}
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${(props) => props?.cssStyle ?? ''};
`;

const CloseButton = styled.button<ModalType.CloseButtonPropsType>`
  border: 0;
  padding: 0;
  position: absolute;
  top: 12px;
  right: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: none;
  cursor: pointer;

  > svg {
    width: 10px;
    height: 10px;
    fill: ${(props) => props.theme.evoui.colors.modal.fgColor};
    transition: transform ease-in-out 200ms;
  }

  &:hover > svg {
    transform: scale(1.2);
  }

  ${(props) => props?.cssStyle ?? ''};
`;

export default function Modal({
  children,
  isOpen = false,
  onClose,
  scrollType = 'rootScroll',
  options,
  overrides,
}: ModalType.PropsType) {
  /*
   * children: 모달안에 들어갈 요소(내용)
   * isOpen: 모달이 켜진지에 대한 상태
   * onClose: 모달을 닫는 함수
   * options: 모달을 어디까지 사용할지 정하는 props로, 상위 요소가 꺼지면 하위요소도 사용 불가
   * overrides: 전체 기본 요소 커스텀
   */

  const [alreadyHidden, setAlreadyHidden] = useState<boolean>(false);

  useEffect(() => {
    if (window.document.body.style.overflow === 'hidden' && !alreadyHidden) {
      setAlreadyHidden(true);
    }

    if (isOpen) {
      window.document.body.style.overflow = 'hidden';
    } else if (!alreadyHidden) {
      window.document.body.style.overflow = '';
    } else {
      setAlreadyHidden(false);
    }

    return () => {
      setAlreadyHidden(false);
    };
  }, [isOpen]);

  return isOpen ? (
    <RootWrapper
      isBackgroundOff={!!options?.RootBackgroundOff}
      scrollType={scrollType}
      {...(typeof overrides?.RootWrapper?.css === 'string'
        ? {
            cssStyle: overrides.RootWrapper.css,
            ...(overrides.RootWrapper ?? {}),
          }
        : overrides?.RootWrapper == undefined
        ? {}
        : { style: overrides.RootWrapper.css, ...overrides.RootWrapper })}>
      {!!options?.RootBackgroundOff ? (
        <></>
      ) : (
        <RootBackground
          onClick={onClose}
          {...(typeof overrides?.RootBackground?.css === 'string'
            ? {
                cssStyle: overrides.RootBackground.css,
                ...(overrides.RootBackground ?? {}),
              }
            : overrides?.RootBackground == undefined
            ? {}
            : {
                style: overrides.RootBackground.css,
                ...overrides.RootBackground,
              })}
        />
      )}
      {!!options?.RootOff ? (
        children
      ) : (
        <Root
          scrollType={scrollType}
          isScrollStyleOn={!!options?.scrollStyleOn}
          // onClick={(e: React.MouseEvent<HTMLElement>) => {
          //   e.stopPropagation();
          //   e.preventDefault();
          //   e.nativeEvent.stopImmediatePropagation();
          // }}
          {...(typeof overrides?.Root?.css === 'string'
            ? {
                cssStyle: overrides.Root.css,
                ...(overrides.Root ?? {}),
              }
            : overrides?.Root == undefined
            ? {}
            : { style: overrides.Root.css, ...overrides.Root })}>
          {!!options?.CloseButtonOff ? (
            <></>
          ) : (
            <CloseButton
              onClick={onClose}
              {...(typeof overrides?.CloseButton?.css === 'string'
                ? {
                    cssStyle: overrides.CloseButton.css,
                    ...(overrides.CloseButton ?? {}),
                  }
                : overrides?.CloseButton == undefined
                ? {}
                : {
                    style: overrides.CloseButton.css,
                    ...overrides.CloseButton,
                  })}>
              <svg viewBox='0 0 34 34' xmlns='http://www.w3.org/2000/svg'>
                <path d='M34 3.42429L30.5757 0L17 13.5757L3.42429 0L0 3.42429L13.5757 17L0 30.5757L3.42429 34L17 20.4243L30.5757 34L34 30.5757L20.4243 17L34 3.42429Z' />
              </svg>
            </CloseButton>
          )}
          {children}
        </Root>
      )}
    </RootWrapper>
  ) : (
    <></>
  );
}
