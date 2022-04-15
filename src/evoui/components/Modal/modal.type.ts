import { DefaultOverridesType, DefaultPropsType } from '../global.type';

export namespace ModalType {
  type scrollType = 'rootScroll' | 'rootWrapperScroll' | 'fullScreenScroll';

  export interface RootWrapperPropsType extends DefaultPropsType {
    isBackgroundOff: boolean;
  }
  export interface RootBackgroundPropsType extends DefaultPropsType {}
  export interface RootScrollWrapperPropsType extends DefaultPropsType {
    isBackgroundOff: boolean;
    scrollType?: scrollType;
  }
  export interface RootPropsType extends DefaultPropsType {
    scrollType?: scrollType;
    isScrollStyleOn?: boolean;
  }
  export interface CloseButtonPropsType extends DefaultPropsType {}
  export interface PropsType {
    children: any;
    isOpen: boolean;
    onClose: () => void;
    scrollType?: scrollType;
    options?: {
      RootOff?: boolean;
      RootBackgroundOff?: boolean;
      CloseButtonOff?: boolean;
      scrollStyleOn?: boolean;
    };
    overrides?: {
      RootWrapper?: DefaultOverridesType;
      RootBackground?: DefaultOverridesType;
      RootScrollWrapper?: DefaultOverridesType;
      Root?: DefaultOverridesType;
      CloseButton?: DefaultOverridesType;
    };
  }
}
