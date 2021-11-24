import { ReactElement, useEffect, useRef, useState } from "react";

import { createPortal } from "react-dom";
import styled from "styled-components";
import { toast } from "./index.type";

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

const Root = styled.div<toast.RootPropsType>`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  overflow: hidden;
  transition-duration: 0.6s;

  ${(props) => props.cssStyle ?? ""};
`;

const ToastContent = styled.div<toast.ToastContentPropsType>`
  width: fit-content;
  height: fit-content;
  border-radius: 8px;
  box-shadow: 1px 1px 4px rgb(0 0 0 / 25%);
  color: white;
  background-color: ${(props) =>
    props.type === "success"
      ? "#38A169"
      : props.type === "error"
      ? "#E53E3E"
      : props.type === "info"
      ? "#226B99"
      : props.type == "warning"
      ? "#C4A01C"
      : "black"};
  animation-duration: 0.4s;
  animation-fill-mode: both;
  animation-name: ${(props) =>
    props.willRemoved ? "fadeOutRight" : "fadeInRight"};
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

  ${(props) => props.cssStyle ?? ""};
`;

const Header = styled.div<toast.HeaderPropsType>`
  display: flex;
  flex-direction: row;
  margin-bottom: 4px;

  ${(props) => props.cssStyle ?? ""};
`;

const Icon = styled.div<toast.IconPropsType>`
  margin: 3px 6px auto 0;
  line-height: 0;

  & > svg {
    fill: white;
  }

  ${(props) => props.cssStyle ?? ""};
`;

const Title = styled.div<toast.TitlePropsType>`
  margin: auto auto auto 0;
  padding-bottom: 2px;
  line-height: 21px;
  font-weight: 500;
  font-size: 17px;

  ${(props) => props.cssStyle ?? ""};
`;

const CloseButton = styled.div<toast.CloseButtonPropsType>`
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

  ${(props) => props.cssStyle ?? ""};
`;

const Content = styled.div<toast.ContentPropsType>`
  line-height: 17px;
  font-size: 15px;
  padding-left: 25px;

  ${(props) => props.cssStyle ?? ""};
`;

function IndependentToast({
  title,
  content,
  type = "info",
  duration = 5000,
  closable = true,
  icon,
  closeButton,
  overrides,
}: toast.IndependentToastPropsType) {
  useEffect(() => {
    setTimeout(() => {
      if (!!ref.current) {
        ref.current.style.animationName = "fadeOut";
      }
    }, duration - 500);
  }, []);

  const ref = useRef<any>(null);

  const doClose = () => {
    if (!!ref.current) {
      ref.current.style.animationName = "fadeOut";
      setTimeout(() => {
        if (!!ref.current) {
          ref.current.style.margin = "0";
          ref.current.style.padding = "0";
          ref.current.style.height = "0";
        }
      }, 400);
    }
  };

  return (
    <Root
      {...(typeof overrides?.Root?.css === "string"
        ? {
            cssStyle: overrides.Root.css,
            ...(overrides.Root ?? {}),
          }
        : overrides?.Root == undefined
        ? {}
        : { style: overrides.Root.css, ...overrides.Root })}
    >
      <ToastContent
        type={type}
        ref={ref}
        {...(typeof overrides?.ToastContent?.css === "string"
          ? {
              cssStyle: overrides.ToastContent.css,
              ...(overrides.ToastContent ?? {}),
            }
          : overrides?.ToastContent == undefined
          ? {}
          : { style: overrides.ToastContent.css, ...overrides.ToastContent })}
      >
        <Header
          {...(typeof overrides?.Header?.css === "string"
            ? {
                cssStyle: overrides.Header.css,
                ...(overrides.Header ?? {}),
              }
            : overrides?.Header == undefined
            ? {}
            : { style: overrides.Header.css, ...overrides.Header })}
        >
          <Icon
            {...(typeof overrides?.Icon?.css === "string"
              ? {
                  cssStyle: overrides.Icon.css,
                  ...(overrides.Icon ?? {}),
                }
              : overrides?.Icon == undefined
              ? {}
              : { style: overrides.Icon.css, ...overrides.Icon })}
          >
            {!!icon ? (
              icon
            ) : type === "error" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 0 24 24"
                width="18px"
              >
                <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
              </svg>
            ) : type === "success" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 0 24 24"
                width="18px"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" />
              </svg>
            ) : type === "info" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 0 24 24"
                width="18px"
              >
                <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
            ) : type === "warning" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 0 24 24"
                width="18px"
              >
                <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
              </svg>
            ) : (
              ""
            )}
          </Icon>
          <Title
            {...(typeof overrides?.Title?.css === "string"
              ? {
                  cssStyle: overrides.Title.css,
                  ...(overrides.Title ?? {}),
                }
              : overrides?.Title == undefined
              ? {}
              : { style: overrides.Title.css, ...overrides.Title })}
          >
            {title}
          </Title>
          {closable && (
            <CloseButton
              onClick={() => doClose()}
              {...(typeof overrides?.CloseButton?.css === "string"
                ? {
                    cssStyle: overrides.CloseButton.css,
                    ...(overrides.CloseButton ?? {}),
                  }
                : overrides?.CloseButton == undefined
                ? {}
                : {
                    style: overrides.CloseButton.css,
                    ...overrides.CloseButton,
                  })}
            >
              {!!closeButton ? (
                closeButton
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18px"
                  viewBox="0 0 24 24"
                  width="18px"
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                </svg>
              )}
            </CloseButton>
          )}
        </Header>
        {content && (
          <Content
            onClick={() => doClose()}
            {...(typeof overrides?.Content?.css === "string"
              ? {
                  cssStyle: overrides.Content.css,
                  ...(overrides.Content ?? {}),
                }
              : overrides?.Content == undefined
              ? {}
              : { style: overrides.Content.css, ...overrides.Content })}
          >
            {content}
          </Content>
        )}
      </ToastContent>
    </Root>
  );
}

function ToastCanvas() {
  const [changed, setChanged] = useState(false);
  const [list, setList] = useState<
    Array<{ toast: toast.IndependentToastPropsType; key: number }>
  >([]);

  useEffect(() => {
    ToastManager.setList = (list: any) => setList(list);
    ToastManager.listChanged = () => setChanged((changed) => !changed);

    return () => {
      ToastManager.setList = null;
      ToastManager.listChanged = null;
    };
  }, []);

  useEffect(() => {
    if (!!ref.current) {
      ref.current.scroll({ top: ref.current.scrollHeight, behavior: "smooth" });
    }
  }, [changed]);

  const ref = useRef<any>(null);

  return (
    <Canvas>
      <ToastWrapper ref={ref}>
        {list &&
          list.map &&
          list.map((toast, i) => {
            return (
              <IndependentToast
                key={toast.key ?? i}
                title={toast.toast.title}
                content={toast.toast.content}
                type={toast.toast.type}
                duration={toast.toast.duration}
                closable={toast.toast.closable}
                icon={toast.toast.icon}
                closeButton={toast.toast.closeButton}
                overrides={toast.toast.overrides}
              />
            );
          })}
      </ToastWrapper>
    </Canvas>
  );
}

class ToastManager {
  public static canvas?: ReactElement = undefined;
  public static setList?: any = null;
  public static listChanged?: any = null;
  private static initialized: boolean = false;

  private static maxDisplaySize: number = 0;

  private static toastQueue: Array<{
    toast: toast.IndependentToastPropsType;
    key: number;
  }> = [];
  private static displayList: Array<{
    toast: toast.IndependentToastPropsType;
    key: number;
  }> = [];
  private static toastKey: number = 0;

  static init(canvas: any): void {
    if (!this.initialized) {
      this.canvas = canvas;
      this.initialized = true;
    }
  }

  static isInitialized(): boolean {
    return this.initialized;
  }

  static uninit(): void {
    this.canvas = undefined;
    this.initialized = false;
  }

  static enqueueToast(toastProps: toast.IndependentToastPropsType): void {
    if (!this.isInitialized()) {
      this.uninitializedError();
    }
    this.toastQueue.push({ toast: toastProps, key: this.toastKey++ });
    if (
      this.maxDisplaySize === 0 ||
      this.toastQueue.length < this.maxDisplaySize
    ) {
      this.dequeueToast();
    }
  }

  static dequeueToast(): void {
    let toast = this.toastQueue.shift();
    if (!toast || !this.setList) return;
    this.displayList.push(toast);
    this.setList(this.displayList);
    this.listChanged();
    setTimeout(() => {
      if (!this.isInitialized() || !this.setList) return;
      this.displayList = this.displayList.filter(
        (el) => (el?.key ?? -2) !== (toast?.key ?? -1)
      );
      this.setList(this.displayList);
      this.listChanged();
    }, toast.toast?.duration ?? 5000);
  }

  private static uninitializedError() {
    throw "Toast did not initialized. Toast component must be mounted somewhere in the React DOM tree.";
  }
}

export function Toast({}) {
  const [initialized, setInitialized] = useState(false);

  const toastCanvas = <ToastCanvas />;

  useEffect(() => {
    if (!ToastManager.isInitialized()) {
      ToastManager.init(toastCanvas);
      setInitialized(true);
    }

    return () => {
      ToastManager.uninit();
    };
  }, []);

  return initialized ? createPortal(toastCanvas, document.body) : null;
}

export function sendToast({
  title,
  content,
  type,
  duration,
  closable,
  icon,
  closeButton,
  overrides,
}: toast.IndependentToastPropsType) {
  ToastManager.enqueueToast({
    title,
    content,
    type,
    duration,
    closable,
    icon,
    closeButton,
    overrides,
  });
}
