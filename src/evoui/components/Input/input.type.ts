import { FocusEvent, KeyboardEvent } from 'react';
import { DefaultOverridesType, DefaultPropsType } from '../global.type';

export interface RootPropsType extends DefaultPropsType {
  isFocused: boolean;
  isError: boolean;
  isDisabled: boolean;
}
export interface InputPropsType extends DefaultPropsType {
  isTypeNumber: boolean;
}
export type ClearButtonPropsType = DefaultPropsType;
export type ValueVisibleButtonPropsType = DefaultPropsType;
export interface PropsType {
  tabIndex?: number;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel';
  value: string;
  placeholder?: string;
  maxLength?: number;
  onChange: (() => void) | ((value: string) => void);
  onKeyDown?: (() => void) | ((event: KeyboardEvent<HTMLInputElement>) => void);
  onFocus?:
    | (() => void)
    | ((event: FocusEvent<HTMLInputElement, Element>) => void);
  onBlur?:
    | (() => void)
    | ((event: FocusEvent<HTMLInputElement, Element>) => void);
  selectAll?: boolean;
  clearable?: boolean;
  readOnly?: boolean;
  isError?: boolean;
  isDisabled?: boolean;
  overrides?: {
    Root?: DefaultOverridesType;
    Input?: DefaultOverridesType;
    ClearButton?: DefaultOverridesType;
    ValueVisibleButton?: DefaultOverridesType;
  };
}
