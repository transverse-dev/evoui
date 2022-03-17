import { ReactElement } from 'react';
import {
  DefaultOverridesType,
  DefaultPrimitiveType,
  DefaultPropsType,
} from '../global.type';

export namespace PopoverType {
  interface PopoverMenuItemType {
    label: DefaultPrimitiveType;
    selected?: boolean;
    disabled?: boolean;
    onClick?: (event: any) => any;
  }

  export interface RootPropsType extends DefaultPropsType {
    locationY: 'top' | 'bottom' | string;
  }
  export interface ButtonWrapperPropsType extends DefaultPropsType {}
  export interface DefaultButtonPropsType extends DefaultPropsType {
    isDisable: boolean;
  }
  export interface MenuWrapperPropsType extends DefaultPropsType {}
  export interface MenuPropsType extends DefaultPropsType {
    isExternal: boolean;
    isMenuVisible: boolean;
  }
  export interface MenuListPropsType extends DefaultPropsType {}
  export interface MenuItemPropsType extends DefaultPropsType {
    isSelected: boolean;
    isDisabled: boolean;
    isClickEventExist: boolean;
  }
  export interface DividerPropsType extends DefaultPropsType {}

  export interface PropsType {
    Button?: React.ComponentType | React.ElementType;
    items?: Array<
      | PopoverMenuItemType
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
