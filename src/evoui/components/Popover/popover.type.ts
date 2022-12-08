import { ReactElement } from 'react';
import {
  DefaultOverridesType,
  DefaultPrimitiveType,
  DefaultPropsType,
} from '../global.type';

export namespace PopoverType {
  export interface RootProps extends DefaultPropsType {
    locationY: 'top' | 'bottom' | string;
  }
  export interface ButtonWrapperProps extends DefaultPropsType {}
  export interface DefaultButtonProps extends DefaultPropsType {
    isDisable: boolean;
  }
  export interface MenuWrapperProps extends DefaultPropsType {}
  export interface Menu extends DefaultPropsType {
    isExternal: boolean;
    isMenuVisible: boolean;
    animationKind?: AnimationKindType;
  }
  export interface MenuList extends DefaultPropsType {}
  export interface MenuItem extends DefaultPropsType {
    isSelected: boolean;
    isDisabled: boolean;
    isClickEventExist: boolean;
  }
  export interface DividerProps extends DefaultPropsType {}

  interface PopoverItemType {
    label: DefaultPrimitiveType;
    selected?: boolean;
    disabled?: boolean;
    onClick?: (event: any) => any;
  }

  type AnimationKindType = undefined | 'none' | 'fadeInScale' | 'fadeInHeight';

  export interface PopoverProps {
    Button?: React.ComponentType | React.ElementType;
    items?: Array<
      | PopoverItemType
      | 'divider'
      | React.ComponentType
      | React.ElementType
      | ReactElement
    >;
    benchmark?:
      | 'top-left'
      | 'top-center'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-center'
      | 'bottom-right';
    direction?:
      | 'top-left'
      | 'top-center'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-center'
      | 'bottom-right';
    position?: {
      x: number;
      y: number;
    };
    margin?: {
      right?: number;
      left?: number;
    };
    isExternal?: boolean;
    closeOutOfScreen?: boolean;
    scrollTarget?: any;
    canHoverToOpen?: boolean;
    animationKind?: AnimationKindType;
    onOpen?: () => any;
    onClose?: () => any;
    close?: boolean;
    disable?: boolean;
    overrides?: {
      Root?: DefaultOverridesType;
      ButtonWrapper?: DefaultOverridesType;
      DefaultButton?: DefaultOverridesType;
      MenuWrapper?: DefaultOverridesType;
      Menu?: DefaultOverridesType;
      MenuList?: DefaultOverridesType;
      Divider?: DefaultOverridesType;
      MenuItem?: DefaultOverridesType;
    };
  }
}
