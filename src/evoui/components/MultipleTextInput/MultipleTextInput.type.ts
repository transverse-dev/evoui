import { DefaultOverridesType, DefaultPropsType } from '../global.type';

export namespace MultipleTextInputType {
  export type ItemType = { value: string; state: string };

  export type RootProps = DefaultPropsType;
  export type ItemWrapperProps = DefaultPropsType;
  export interface ItemProps extends DefaultPropsType {
    bgColor: string;
  }
  export interface ItemTextProps extends DefaultPropsType {
    fgColor: string;
  }
  export interface ItemDeleteButtonProps extends DefaultPropsType {
    fgColor: string;
  }
  export type InputProps = DefaultPropsType;

  export interface MultipleTextInputProps {
    items: Array<ItemType>;
    placeholder?: string;
    onChange: (items: Array<ItemType>) => void;
    stateColors?: Array<{ state: string; fgColor: string; bgColor: string }>;
    setValueState?: (value: string) => string;
    overrides?: {
      Root?: DefaultOverridesType;
      InputWrapper?: DefaultOverridesType;
      Item?: DefaultOverridesType;
      ItemText?: DefaultOverridesType;
      ItemDeleteButton?: DefaultOverridesType;
      Input?: DefaultOverridesType;
    };
  }
}
