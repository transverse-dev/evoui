import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import {
  CloseButtonPropsType,
  ContentPropsType,
  HeaderPropsType,
  IconPropsType,
  IndependentToastPropsType,
  RootPropsType,
  TitlePropsType,
  ToastContentPropsType,
} from './toast.type';

type ToastsType = Array<{
  toast: IndependentToastPropsType;
  key: number;
}>;

const DEFAULT_TOAST_DURATION = 5000;
const DEFAULT_MAX_DISPLAY_SIZE = 0; // if zero, no limit for displaying size.

const Canvas = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 99999;
`;

const ToastWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 100vh;
  max-width: 100vw;
  overflow-y: auto;
  height: fit-content;
  transition-duration: 0.6s;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const Root = styled.div<RootPropsType>`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  overflow: hidden;
  transition-duration: 0.6s;

  ${(props) => props.cssStyle ?? ''};
`;

const ToastContent = styled.div<ToastContentPropsType>`
  width: fit-content;
  height: fit-content;
  border-radius: 8px;
  box-shadow: 1px 1px 4px
    ${(props) => props.theme.evoui.colors.toast.shadowColor};
  color: white;
  background-color: ${(props) =>
    props.type === 'success'
      ? '#38A169'
      : props.type === 'error'
      ? '#E53E3E'
      : props.type === 'info'
      ? '#226B99'
      : props.type == 'warning'
      ? '#C4A01C'
      : 'black'};
  animation-duration: 0.4s;
  animation-fill-mode: both;
  animation-name: ${(props) =>
    props.willRemoved ? 'fadeOutRight' : 'fadeInRight'};
  transition-duration: 0.4s;
  pointer-events: all;
  padding: 13px 15px;
  min-width: 240px;
  overflow: hidden;
  margin: 0 10px 10px 10px;

  @media screen and (max-width: 280px) {
    min-width: 0;
  }

  @keyframes fadeInRight {
    0% {
      opacity: 0;
      transform: translateX(20px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0.7);
    }
  }

  ${(props) => props.cssStyle ?? ''};
`;

const Header = styled.div<HeaderPropsType>`
  display: flex;
  flex-direction: row;
  margin-bottom: 4px;

  ${(props) => props.cssStyle ?? ''};
`;

const Icon = styled.div<IconPropsType>`
  margin: 3px 6px auto 0;
  line-height: 0;

  & > svg {
    fill: white;
  }

  ${(props) => props.cssStyle ?? ''};
`;

const Title = styled.div<TitlePropsType>`
  margin: auto auto auto 0;
  padding-bottom: 2px;
  line-height: 21px;
  font-weight: 500;
  font-size: 17px;

  ${(props) => props.cssStyle ?? ''};
`;

const CloseButton = styled.div<CloseButtonPropsType>`
  margin: -4px -6px auto 3px;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  cursor: pointer;
  line-height: 0;
  font-weight: 400;

  &:hover {
    background-color: #00000033;
  }

  & > svg {
    fill: #ffffff99;
    margin: 2px;
  }

  ${(props) => props.cssStyle ?? ''};
`;

const Content = styled.div<ContentPropsType>`
  line-height: 17px;
  font-size: 15px;
  padding-left: 25px;

  ${(props) => props.cssStyle ?? ''};
`;

function IndependentToast({
  title,
  content,
  type = 'info',
  duration = 5000,
  closable = true,
  icon,
  closeButton,
  overrides,
}: IndependentToastPropsType) {
  useEffect(() => {
    setTimeout(() => {
      if (!!ref.current) {
        ref.current.style.animationName = 'fadeOut';
      }
    }, duration - 500);
  }, []);

  const ref = useRef<any>(null);

  const doClose = () => {
    if (!!ref.current) {
      ref.current.style.animationName = 'fadeOut';
      setTimeout(() => {
        if (!!ref.current) {
          ref.current.style.margin = '0';
          ref.current.style.padding = '0';
          ref.current.style.height = '0';
        }
      }, 400);
    }
  };

  return (
    <Root
      {...(typeof overrides?.Root?.css === 'string'
        ? {
            cssStyle: overrides.Root.css,
            ...(overrides.Root ?? {}),
          }
        : overrides?.Root == undefined
        ? {}
        : { style: overrides.Root.css, ...overrides.Root })}>
      <ToastContent
        type={type}
        ref={ref}
        {...(typeof overrides?.ToastContent?.css === 'string'
          ? {
              cssStyle: overrides.ToastContent.css,
              ...(overrides.ToastContent ?? {}),
            }
          : overrides?.ToastContent == undefined
          ? {}
          : { style: overrides.ToastContent.css, ...overrides.ToastContent })}>
        <Header
          {...(typeof overrides?.Header?.css === 'string'
            ? {
                cssStyle: overrides.Header.css,
                ...(overrides.Header ?? {}),
              }
            : overrides?.Header == undefined
            ? {}
            : { style: overrides.Header.css, ...overrides.Header })}>
          <Icon
            {...(typeof overrides?.Icon?.css === 'string'
              ? {
                  cssStyle: overrides.Icon.css,
                  ...(overrides.Icon ?? {}),
                }
              : overrides?.Icon == undefined
              ? {}
              : { style: overrides.Icon.css, ...overrides.Icon })}>
            {!!icon ? (
              icon
            ) : type === 'error' ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='18px'
                viewBox='0 0 24 24'
                width='18px'>
                <path d='M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' />
              </svg>
            ) : type === 'success' ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='18px'
                viewBox='0 0 24 24'
                width='18px'>
                <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z' />
              </svg>
            ) : type === 'info' ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='18px'
                viewBox='0 0 24 24'
                width='18px'>
                <path d='M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' />
              </svg>
            ) : type === 'warning' ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='18px'
                viewBox='0 0 24 24'
                width='18px'>
                <path d='M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z' />
              </svg>
            ) : (
              ''
            )}
          </Icon>
          <Title
            {...(typeof overrides?.Title?.css === 'string'
              ? {
                  cssStyle: overrides.Title.css,
                  ...(overrides.Title ?? {}),
                }
              : overrides?.Title == undefined
              ? {}
              : { style: overrides.Title.css, ...overrides.Title })}>
            {title}
          </Title>
          {closable && (
            <CloseButton
              onClick={() => doClose()}
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
              {!!closeButton ? (
                closeButton
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='18px'
                  viewBox='0 0 24 24'
                  width='18px'>
                  <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' />
                </svg>
              )}
            </CloseButton>
          )}
        </Header>
        {content && (
          <Content
            onClick={() => doClose()}
            {...(typeof overrides?.Content?.css === 'string'
              ? {
                  cssStyle: overrides.Content.css,
                  ...(overrides.Content ?? {}),
                }
              : overrides?.Content == undefined
              ? {}
              : { style: overrides.Content.css, ...overrides.Content })}>
            {content}
          </Content>
        )}
      </ToastContent>
    </Root>
  );
}

/**
 * ToastCanvas displays actual toast components.
 */
function ToastCanvas() {
  const [displayedToasts, setDisplayedToasts] = useState<ToastsType>([]);

  useEffect(() => {
    ToastManager.setDisplayedToasts = setDisplayedToasts;
    if (ToastManager.getIsReady()) {
      ToastManager.flushToast();
    }
    return () => {
      ToastManager.reset();
    };
  }, []);

  useEffect(() => {
    if (toastWrapperRef.current !== null) {
      toastWrapperRef.current.scroll({
        top: toastWrapperRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [displayedToasts]);

  const toastWrapperRef = useRef<null | HTMLDivElement>(null);

  return (
    <Canvas>
      <ToastWrapper ref={toastWrapperRef}>
        {displayedToasts.map((displayedToast) => (
          <IndependentToast
            key={displayedToast.key}
            title={displayedToast.toast.title}
            content={displayedToast.toast.content}
            type={displayedToast.toast.type}
            duration={displayedToast.toast.duration}
            closable={displayedToast.toast.closable}
            icon={displayedToast.toast.icon}
            closeButton={displayedToast.toast.closeButton}
            overrides={displayedToast.toast.overrides}
          />
        ))}
      </ToastWrapper>
    </Canvas>
  );
}

/**
 * main toast component
 */
export function Toast() {
  return createPortal(<ToastCanvas />, document.body);
}

/**
 * ToastManager manages methods and values for the Toast features. (ex. enqueueToast)
 */
class ToastManager {
  /**
   * max number of toasts displayed.
   */
  private static maxDisplaySize: number = DEFAULT_MAX_DISPLAY_SIZE;

  /**
   * a key to indentify each individual toast.
   */
  private static toastKey: number = 0;

  /**
   * a ready queue which contains toasts in order.
   * dequeued toast will be displayed.
   */
  private static toastQueue: ToastsType = [];

  /**
   * add the toast to the toastQueue.
   */
  static enqueueToast(toastProps: IndependentToastPropsType) {
    // add the toast to the ready queue.
    this.toastQueue.push({ toast: toastProps, key: this.toastKey++ });
    // if the ToastCanvas is ready to render toast components, flush the ready queue!
    if (this.getIsReady()) {
      this.flushToast();
    }
  }

  /**
   * flush toast of maxDisplaySize in the ready queue.
   */
  static flushToast() {
    if (!this.getIsReady()) {
      console.error('Cannot call flushToast until the ToastManager is ready');
      return;
    }
    const toastsToDisplay =
      this.maxDisplaySize === 0
        ? [...this.toastQueue]
        : this.toastQueue.slice(0, this.maxDisplaySize);
    const toastsToRemain =
      this.maxDisplaySize === 0
        ? []
        : this.toastQueue.slice(this.maxDisplaySize);
    // setDisplayedToasts is not null because of the above statements.
    // beware calling setDisplayedToasts with new array!
    // if you just use the old one, useEffect won't detect the change.
    toastsToDisplay.forEach((toast) => {
      this.setDisplayedToasts?.((prev) => [...prev, toast]);
      setTimeout(() => {
        // not doing anything if this.setDisplayedToasts is null.
        this.setDisplayedToasts?.((prev) =>
          prev.filter((_toast) => _toast.key !== toast.key),
        );
      }, toast.toast.duration ?? DEFAULT_TOAST_DURATION);
    });
    this.toastQueue = toastsToRemain;
  }

  /**
   * setState function from ToastCanvas.
   */
  public static setDisplayedToasts: null | Dispatch<
    SetStateAction<ToastsType>
  > = null;

  /**
   * check if ToastCanvas is ready to render toast components.
   */
  public static getIsReady() {
    return this.setDisplayedToasts !== null;
  }

  /**
   * reset all private values to initial values.
   */
  public static reset() {
    this.setDisplayedToasts = null;
    this.toastKey = 0;
    this.toastQueue = [];
  }
}

/**
 * call enqueueToast with toast properties.
 */
export const sendToast = (props: IndependentToastPropsType) => {
  ToastManager.enqueueToast(props);
};
