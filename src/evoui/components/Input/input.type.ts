import { ChangeEvent, FocusEvent } from 'react';
import { DefaultOverridesType, DefaultPropsType } from '../global.type';

export interface RootPropsType extends DefaultPropsType {
  isFocused: boolean;
  isError: boolean;
}
export type InputPropsType = DefaultPropsType;
export type IconPropsType = DefaultPropsType;
export interface PropsType {
  value: string;
  isClearable?: boolean;
  isError?: boolean;
  onFocus?:
    | (() => void)
    | ((event: FocusEvent<HTMLInputElement, Element>) => void);
  onBlur?:
    | (() => void)
    | ((event: FocusEvent<HTMLInputElement, Element>) => void);
  onChange: (() => void) | ((event: ChangeEvent<HTMLInputElement>) => void);
  type?: 'text' | 'password';
  overrides?: {
    Root?: DefaultOverridesType;
    Input?: DefaultOverridesType;
    Icon?: DefaultOverridesType;
  };
}
