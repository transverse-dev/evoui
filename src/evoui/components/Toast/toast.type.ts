import { DefaultOverridesType, DefaultPropsType } from '../global.type';

// internal types: 패키지 외부에서 사용 불가
export namespace ToastType {
  export interface IndependentToastPropsType {
    /** Title of the toast. It must be a string.*/
    title: string;
    /** Content of the toast.*/
    content?: string | React.ReactInstance | React.ReactElement;
    /** Type of the toast. It must be one of 'success', 'error', 'info', 'warning'. Default value is 'info'. */
    type?: ToastType;
    /** The duration how long the toast will be displayed. */
    duration?: number;
    /** Is the toast could be closed. */
    closable?: boolean;
    /** If set, the default icon will be replaced. */
    icon?: string | React.ReactInstance | React.ReactElement;
    /** If set, the default close button icon be replaced. */
    closeButton?: string | React.ReactInstance | React.ReactElement;
    /** UI elements props will be overridden. Only css value is available on current version. */
    overrides?: {
      Root?: DefaultOverridesType;
      ToastContent?: DefaultOverridesType;
      Header?: DefaultOverridesType;
      Icon?: DefaultOverridesType;
      Title?: DefaultOverridesType;
      CloseButton?: DefaultOverridesType;
      Content?: DefaultOverridesType;
    };
  }

  export interface RootPropsType extends DefaultPropsType {}

  export interface ToastContentPropsType extends DefaultPropsType {
    type: ToastType;
    willRemoved?: boolean;
  }

  export interface HeaderPropsType extends DefaultPropsType {}

  export interface IconPropsType extends DefaultPropsType {}

  export interface TitlePropsType extends DefaultPropsType {}

  export interface CloseButtonPropsType extends DefaultPropsType {}

  export interface ContentPropsType extends DefaultPropsType {}

  export interface PropsType {
    /** UI elements props will be overridden. Only css value is available on current version. */
    overrides?: {
      Root?: DefaultOverridesType;
    };
    onOpen?: () => any;
    onClose?: () => any;
  }
}

// external types: 패키지 외부에서 사용 가능
export type ToastType = 'success' | 'error' | 'info' | 'warning';
