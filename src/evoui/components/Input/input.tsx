import { useState, useRef, ChangeEvent, FocusEvent, MouseEvent } from 'react';

import styled from 'styled-components';

import {
  PropsType,
  RootPropsType,
  InputPropsType,
  ClearButtonPropsType,
  ValueVisibleButtonPropsType,
} from './input.type';

const Root = styled.div<RootPropsType>`
  border: 2px solid
    ${(props) =>
      props.isFocused
        ? props.theme.evoui.colors.input.focusedBorderColor
        : props.isError
        ? props.theme.evoui.colors.input.errorBorderColor
        : props.theme.evoui.colors.input.borderColor};
  border-radius: 6px;
  padding: 10px 12px;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  column-gap: 12px;
  background-color: ${(props) =>
    props.isError
      ? props.theme.evoui.colors.input.errorBgColor
      : props.theme.evoui.colors.input.bgColor};
  opacity: ${(props) => (props.isDisabled ? '0.3' : '1')};
  transition: all ease-in-out 300ms;
  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'text')};

  ${(props) => props.cssStyle ?? ''};
`;
const Input = styled.input<InputPropsType>`
  border: none;
  all: unset;
  flex: 1;
  min-width: 0;
  font-size: 16px;

  &::placeholder {
    color: ${(props) => props.theme.evoui.colors.input.placeholderFgColor};
  }

  ${(props) =>
    props.isTypeNumber
      ? `
          /* Chrome, Safari, Edge, Opera */
          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          /* Firefox */
          & {
            -moz-appearance: textfield;
          }
        `
      : ''}

  ${(props) => props.cssStyle ?? ''};
`;

const Button = styled.button`
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  min-width: 16px;
  color: ${(props) => props.theme.evoui.colors.input.fgColor};
  background-color: transparent;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.evoui.colors.input.fgColor};
  }

  > svg {
    width: 100%;
    fill: ${(props) => props.theme.evoui.colors.input.iconFillColor};
    fill-rule: evenodd;
    clip-rule: evenodd;
  }

  @media screen and (max-width: 768px) {
    width: 14px;
    height: 14px;
    min-width: 14px;
  }
`;

const ClearButton = styled(Button)<ClearButtonPropsType>`
  ${(props) => props?.cssStyle ?? ''};
`;

const ValueVisibleButton = styled(Button)<ValueVisibleButtonPropsType>`
  ${(props) => props?.cssStyle ?? ''};
`;

const createNoBlurringOnClick = <
  elementType extends HTMLButtonElement | HTMLDivElement,
>(
  onClick: (() => void) | ((event: MouseEvent<elementType>) => void),
) => ({
  onMouseDown(event: MouseEvent<elementType>) {
    event.preventDefault();
  },
  onMouseUp(event: MouseEvent<elementType>) {
    event.preventDefault();
  },
  onClick,
});

const createNoPropagatingOnClick = <elementType extends HTMLInputElement>(
  onClick: (() => void) | ((event: MouseEvent<elementType>) => void),
) => ({
  onMouseDown(event: MouseEvent<elementType>) {
    event.stopPropagation();
  },
  onMouseUp(event: MouseEvent<elementType>) {
    event.stopPropagation();
  },
  onClick,
});

export default function PureInput({
  tabIndex,
  type = 'text',
  value,
  placeholder,
  maxLength,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  selectAll = false,
  clearable = false,
  readOnly = false,
  isError = false,
  isDisabled = false,
  overrides,
}: PropsType): JSX.Element {
  // Root 클릭 시 input에 focus를 해야하기 때문에 사용
  const inputRef = useRef<HTMLInputElement | null>(null);

  // input의 실제 focus 여부를 나타내지 않을 수 있음. focus 시 Root에 border를 추가하는 용도의 state.
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const isInputFunctionsDisabled = readOnly || isDisabled;
  // type의 종류가 늘어날 수 있어 조건식을 직관적으로 작성했습니다.
  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;
  const isClearButtonTabIndexExist: boolean =
    typeof overrides?.ClearButton?.tabIndex === 'number';

  const onRootClick = (): void => {
    if (!!inputRef?.current) {
      if (!!selectAll) {
        inputRef.current.select();
      } else {
        inputRef.current.focus();
      }
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const isValueExist: boolean = typeof e?.currentTarget?.value === 'string';
    const isValueLowerThanMaxLength: boolean =
      typeof maxLength === 'number'
        ? e.currentTarget.value.length <= maxLength
        : true;

    if (
      !isInputFunctionsDisabled &&
      isValueExist &&
      isValueLowerThanMaxLength
    ) {
      onChange(e.currentTarget.value);
    }
  };

  const onInputFocus = (e: FocusEvent<HTMLInputElement>): void => {
    if (selectAll) {
      e.currentTarget.select();
    }
    if (onFocus && !isInputFunctionsDisabled) {
      onFocus(e);
    }
    if (!isInputFunctionsDisabled) {
      setIsFocused(true);
    }
  };

  const onInputBlur = (e: FocusEvent<HTMLInputElement>): void => {
    if (onBlur && !isInputFunctionsDisabled) {
      onBlur(e);
    }
    if (!isInputFunctionsDisabled) {
      setIsFocused(false);
    }
  };

  const doClearInput = (): void => {
    if (!isInputFunctionsDisabled) {
      onChange('');
    }
  };

  const toggleIsPasswordVisible = (): void => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <Root
      isFocused={isFocused}
      isError={!isFocused && isError}
      isDisabled={isDisabled}
      {...createNoBlurringOnClick(onRootClick)}
      {...(overrides?.Root === undefined
        ? {}
        : typeof overrides?.Root?.css === 'string'
        ? {
            cssStyle: overrides.Root.css,
            ...(overrides.Root ?? {}),
          }
        : {
            style: overrides.Root.css,
            ...overrides.Root,
          })}>
      <Input
        ref={inputRef}
        tabIndex={isInputFunctionsDisabled ? -1 : tabIndex}
        type={inputType}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        readOnly={isInputFunctionsDisabled}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        isTypeNumber={type === 'number'}
        {...createNoPropagatingOnClick((event) => event.stopPropagation())}
        {...(overrides?.Input === undefined
          ? {}
          : typeof overrides?.Input?.css === 'string'
          ? {
              cssStyle: overrides.Input.css,
              ...(overrides.Input ?? {}),
            }
          : {
              style: overrides.Input.css,
              ...overrides.Input,
            })}
      />
      {clearable &&
        !isInputFunctionsDisabled &&
        (isFocused || isClearButtonTabIndexExist) &&
        value.length > 0 && (
          <ClearButton
            tabIndex={-1}
            {...createNoBlurringOnClick(doClearInput)}
            {...(overrides?.ClearButton === undefined
              ? {}
              : typeof overrides?.ClearButton?.css === 'string'
              ? {
                  cssStyle: overrides.ClearButton.css,
                  ...(overrides.ClearButton ?? {}),
                }
              : {
                  style: overrides.ClearButton.css,
                  ...overrides.ClearButton,
                })}>
            <svg viewBox='0 0 24 24'>
              <path d='M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z' />
            </svg>
          </ClearButton>
        )}
      {type === 'password' && (
        <ValueVisibleButton
          tabIndex={-1}
          {...createNoBlurringOnClick(toggleIsPasswordVisible)}
          {...(overrides?.ValueVisibleButton === undefined
            ? {}
            : typeof overrides?.ValueVisibleButton?.css === 'string'
            ? {
                cssStyle: overrides.ValueVisibleButton.css,
                ...(overrides.ValueVisibleButton ?? {}),
              }
            : {
                style: overrides.ValueVisibleButton.css,
                ...overrides.ValueVisibleButton,
              })}>
          <svg viewBox='0 0 24 24'>
            {isPasswordVisible ? (
              <path d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z' />
            ) : (
              <path d='M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z' />
            )}
          </svg>
        </ValueVisibleButton>
      )}
    </Root>
  );
}
