import { DefaultOverridesType, DefaultPropsType } from '../global.type';

export namespace SelectType {
  export interface RootPropsType extends DefaultPropsType {}
  export interface InputWrapperPropsType extends DefaultPropsType {
    isMenuVisible: boolean;
    disable: boolean;
    error: boolean;
  }
  export interface InputValueWrapperPropsType extends DefaultPropsType {}
  export interface InputValuePropsType extends DefaultPropsType {}
  export interface InputPropsType extends DefaultPropsType {
    isInputValueExist: boolean;
  }
  export interface InputIconWrapperPropsType extends DefaultPropsType {}
  export interface InputIconPropsType extends DefaultPropsType {
    disable: boolean;
  }
  export interface MenuWrapperPropsType extends DefaultPropsType {}
  export interface MenuPropsType extends DefaultPropsType {
    isMenuVisible: boolean;
  }
  export interface MenuListPropsType extends DefaultPropsType {}
  export interface MenuItemPropsType extends DefaultPropsType {
    isSelected: boolean;
    isFocused: boolean;
    isDisabled: boolean;
  }
  export interface NoResultWrapperPropsType extends DefaultPropsType {}
  export type onChangeType<
    itemType extends defaultItemType,
    valueShouldExistType extends boolean | undefined,
  > = (params: {
    type: 'remove' | 'select';
    selected: valueType<itemType, valueShouldExistType>;
  }) => void;
  type valueType<
    itemType extends defaultItemType,
    valueShouldExistType extends boolean | undefined,
  > = valueShouldExistType extends true
    ? Omit<itemType, 'disabled' | 'onClick'>
    : Omit<itemType, 'disabled' | 'onClick'> | undefined;
  export interface defaultItemType {
    label: string;
    id: string | number;
    disabled?: boolean;
    onClick?: (event: any) => any;
    payload?: any;
  }
  export interface SelectPropsType<
    itemType extends defaultItemType,
    valueShouldExistType extends boolean | undefined,
  > {
    value: valueType<itemType, valueShouldExistType>;
    valueShouldExist?: valueShouldExistType;
    onChange: onChangeType<itemType, valueShouldExistType>;
    placeholder?: string;
    items?: itemType[] extends never[] ? defaultItemType[] : itemType[];
    closeOutOfScreen?: boolean;
    scrollTarget?: any;
    onOpen?: () => any;
    onClose?: () => any;
    close?: boolean;
    disable?: boolean;
    error?: boolean;
    overrides?: {
      Root?: DefaultOverridesType;
      InputWrapper?: DefaultOverridesType;
      InputValueWrapper?: DefaultOverridesType;
      InputValue?: DefaultOverridesType;
      Input?: DefaultOverridesType;
      InputIconWrapper?: DefaultOverridesType;
      InputIcon?: DefaultOverridesType;
      MenuWrapper?: DefaultOverridesType;
      Menu?: DefaultOverridesType;
      MenuList?: DefaultOverridesType;
      Divider?: DefaultOverridesType;
      MenuItem?: DefaultOverridesType;
      NoResultWrapper?: DefaultOverridesType;
    };
  }
}
