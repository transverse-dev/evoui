import { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';
import { DefaultOverridesType, DefaultPropsType } from '../global.type';

export interface RootPropsType extends DefaultPropsType {
  isFocused: boolean;
  isError: boolean;
}
export type InputPropsType = DefaultPropsType;
export type IconPropsType = DefaultPropsType;
export interface PropsType {
  type?: 'text' | 'password';
  placeholder?: string;
  value: string;
  onChange: (() => void) | ((event: ChangeEvent<HTMLInputElement>) => void);
  onFocus?:
    | (() => void)
    | ((event: FocusEvent<HTMLInputElement, Element>) => void);
  onBlur?:
    | (() => void)
    | ((event: FocusEvent<HTMLInputElement, Element>) => void);
  onKeyDown?: (() => void) | ((event: KeyboardEvent<HTMLInputElement>) => void);
  isClearable?: boolean;
  isError?: boolean;
  overrides?: {
    Root?: DefaultOverridesType;
    Input?: DefaultOverridesType;
    Icon?: DefaultOverridesType;
  };
}
