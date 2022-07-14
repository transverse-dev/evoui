import { MouseEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  IconPropsType,
  InputPropsType,
  PropsType,
  RootPropsType,
} from './input.type';

const Root = styled.div<RootPropsType>`
  display: flex;
  align-items: center;
  column-gap: 12px;
  padding: 10px 12px;
  background-color: ${(props) =>
    !props.isFocused && props.isError
      ? props.theme.evoui.colors.input.errorBgColor
      : props.theme.evoui.colors.input.bgColor};
  border: 2px solid
    ${(props) =>
      props.isFocused
        ? props.theme.evoui.colors.input.focusedBorderColor
        : props.isError
        ? props.theme.evoui.colors.input.errorBorderColor
        : props.theme.evoui.colors.input.borderColor};
  border-radius: 6px;
  transition: border 0.2s, background-color 0.2s;
  cursor: text;

  ${(props) => props.cssStyle ?? ''};
`;
const Input = styled.input<InputPropsType>`
  all: unset;
  flex-grow: 1;
  height: 20px;
  line-height: 20px;
  font-size: 16px;

  &::placeholder {
    color: ${(props) => props.theme.evoui.colors.input.placeholderFgColor};
  }

  ${(props) => props.cssStyle ?? ''};
`;
const Icon = styled.svg<IconPropsType>`
  width: 16px;
  height: 16px;
  fill: ${(props) => props.theme.evoui.colors.input.iconFillColor};
  cursor: pointer;

  ${(props) => props.cssStyle ?? ''};
`;

const createNoBlurringOnClick = <
  elementType extends SVGSVGElement | HTMLDivElement,
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
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  isClearable = false,
  isError = false,
  overrides,
}: PropsType) {
  // Root 클릭 시 input에 focus를 해야하기 때문에 사용
  const inputRef = useRef<HTMLInputElement | null>(null);

  // input의 실제 focus 여부를 나타내지 않을 수 있음. focus 시 Root에 border를 추가하는 용도의 state.
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const focus = () => {
    if (inputRef.current === null) {
      return;
    }
    inputRef.current.focus();
  };
  const clear = () => {
    const input = inputRef.current;
    if (input === null) {
      return;
    }
    // TODO: 사실 왜 동작하는지 모르는 코드
    const valueSetter = Object.getOwnPropertyDescriptor(input, 'value')?.set;
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(input),
      'value',
    )?.set;
    if (valueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter?.call(input, '');
    } else {
      valueSetter?.call(input, '');
    }
    input.dispatchEvent(new Event('input', { bubbles: true }));
  };

  return (
    <Root
      {...(typeof overrides?.Root?.css === 'string'
        ? {
            cssStyle: overrides.Root.css,
            ...(overrides.Root ?? {}),
          }
        : overrides?.Root == undefined
        ? {}
        : {
            style: overrides.Root.css,
            ...overrides.Root,
          })}
      isFocused={isFocused}
      isError={isError}
      {...createNoBlurringOnClick(focus)}>
      <Input
        {...(typeof overrides?.Input?.css === 'string'
          ? {
              cssStyle: overrides.Input.css,
              ...(overrides.Input ?? {}),
            }
          : overrides?.Input == undefined
          ? {}
          : {
              style: overrides.Input.css,
              ...overrides.Input,
            })}
        ref={inputRef}
        // type의 종류가 늘어날 수 있어 조건식을 직관적으로 작성했습니다.
        type={type === 'password' && isVisible ? 'text' : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={(event) => {
          onFocus?.(event);
          setIsFocused(true);
        }}
        onBlur={(event) => {
          onBlur?.(event);
          setIsFocused(false);
        }}
        onKeyDown={onKeyDown}
        {...createNoPropagatingOnClick((event) => event.stopPropagation())}
      />
      {isClearable && isFocused && value.length > 0 && (
        <Icon
          {...(typeof overrides?.Icon?.css === 'string'
            ? {
                cssStyle: overrides.Icon.css,
                ...(overrides.Icon ?? {}),
              }
            : overrides?.Icon == undefined
            ? {}
            : {
                style: overrides.Icon.css,
                ...overrides.Icon,
              })}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          {...createNoBlurringOnClick(clear)}>
          <path d='M0 0h24v24H0z' fill='none' />
          <path d='M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z' />
        </Icon>
      )}
      {type === 'password' && (
        <Icon
          {...(typeof overrides?.Icon?.css === 'string'
            ? {
                cssStyle: overrides.Icon.css,
                ...(overrides.Icon ?? {}),
              }
            : overrides?.Icon == undefined
            ? {}
            : {
                style: overrides.Icon.css,
                ...overrides.Icon,
              })}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          {...createNoBlurringOnClick(() => setIsVisible((prev) => !prev))}>
          {isVisible ? (
            <>
              <path d='M0 0h24v24H0z' fill='none' />
              <path d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z' />
            </>
          ) : (
            <>
              <path
                d='M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z'
                fill='none'
              />
              <path d='M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z' />
            </>
          )}
        </Icon>
      )}
    </Root>
  );
}
