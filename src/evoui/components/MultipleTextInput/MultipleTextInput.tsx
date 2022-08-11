import {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import { MultipleTextInputType } from './MultipleTextInput.type';

import styled from 'styled-components';

const DEFAULT_ITEM_BGCOLOR = '#e7d6fe';
const DEFAULT_ITEM_FGCOLOR = '#555555';

const Root = styled.div<MultipleTextInputType.RootProps>`
  border: 1px solid #a4a4a4;
  border-radius: 5px;
  position: relative;
  display: inline-flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;

  @media only screen and (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: inherit;
    justify-content: inherit;
  }

  ${(props) => props.cssStyle ?? ''};
`;

const InputWrapper = styled.div<MultipleTextInputType.ItemWrapperProps>`
  padding: 6px 5px;
  display: inline-flex;
  flex: 1 1 0;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
  width: 100%;
  height: fit-content;
  min-height: 42px;

  @media only screen and (max-width: 768px) {
    padding-top: 0;
    min-height: auto;
  }

  ${(props) => props.cssStyle ?? ''};
`;

const Item = styled.div<MultipleTextInputType.ItemProps>`
  border-radius: 5px;
  padding: 4px 8px;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  column-gap: 12px;
  background-color: ${(props) => props.bgColor};

  ${(props) => props.cssStyle ?? ''};
`;

const ItemText = styled.p<MultipleTextInputType.ItemTextProps>`
  margin: 0;
  max-width: 128px;
  color: ${(props) => props.fgColor};
  font-size: 0.875rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  ${(props) => props.cssStyle ?? ''};
`;

const ItemDeleteButton = styled.button<MultipleTextInputType.ItemDeleteButtonProps>`
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 10px;
  height: 10px;
  background-color: transparent;
  cursor: pointer;

  > svg {
    width: 100%;
    fill: ${(props) => props.fgColor};
  }

  ${(props) => props.cssStyle ?? ''};
`;

const Input = styled.input<MultipleTextInputType.InputProps>`
  border: none;
  flex-grow: 1;
  color: ${(props) => props.theme.evoui.colors.multipleTextInput.fgColor};
  font-size: 0.875rem;
  background-color: transparent;

  @media only screen and (max-width: 768px) {
    padding: 10px;
    width: 100%;
  }

  ${(props) => props.cssStyle ?? ''};
`;

export default function MultipleTextInput({
  items,
  placeholder,
  onChange,
  stateColors = [
    {
      state: 'default',
      fgColor: DEFAULT_ITEM_FGCOLOR,
      bgColor: DEFAULT_ITEM_BGCOLOR,
    },
  ],
  setItemState,
  options,
  overrides,
}: MultipleTextInputType.MultipleTextInputProps): JSX.Element {
  const [isMobileView, setIsMobileView] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState<string>('');

  const addItem = useCallback((): void => {
    const inputValueList = inputValue.split(/ +/g);

    if (inputValueList.length > 1) {
      onChange([
        ...items,
        ...inputValueList
          .filter(
            (pureInputValue, i) =>
              (inputValueList.indexOf(pureInputValue) === i &&
                !items.find((item) => item.value === pureInputValue)) ||
              !options?.includes('deduplication'),
            /*
             * inputValueList 내의 중복 값인지 검사 &&
             * option에 deduplication이 있다면 items 내의 중복 값인지 검사
             */
          )
          .map(
            (pureInputValue): MultipleTextInputType.ItemType => ({
              value: pureInputValue,
              state: setItemState ? setItemState(pureInputValue) : 'default',
            }),
          ),
      ]);
      setInputValue('');
    } else if (
      !items.find((item) => item.value === inputValue) ||
      !options?.includes('deduplication')
    ) {
      onChange([
        ...items,
        {
          value: inputValue,
          state: setItemState ? setItemState(inputValue) : 'default',
        },
      ]);
      setInputValue('');
    }
  }, [inputValue, onChange, items, setItemState]);

  const removeItem = (value: string): void => {
    onChange(items.filter((item) => item.value !== value));
  };

  const popItem = (): void => {
    onChange(items.splice(0, items.length - 1));
  };

  const onInputBlur = (): void => {
    if (inputValue !== '') {
      addItem();
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (typeof e.currentTarget.value === 'string') {
      setInputValue(e.currentTarget.value.trim());
    }
  };

  const onInputKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if ((e.code === 'Enter' || e.code === 'Space') && inputValue !== '') {
      addItem();
    }
  };

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'Backspace' && inputValue === '') {
      popItem();
    }
  };

  useEffect(() => {
    const checkIsMobileView = (): void => {
      if (window.innerWidth <= 768) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    };

    window.addEventListener('resize', checkIsMobileView);
    checkIsMobileView();

    return () => window.removeEventListener('resize', checkIsMobileView);
  }, []);

  useEffect(() => {
    if (inputValue.split(/ +/g).length > 1) {
      addItem();
    }
  }, [addItem, inputValue]);

  return (
    <Root
      {...(typeof overrides?.Root?.css === 'string'
        ? {
            cssStyle: overrides.Root.css,
            ...(overrides.Root ?? {}),
          }
        : overrides?.Root === undefined
        ? {}
        : { style: overrides.Root.css, ...overrides.Root })}>
      {!(isMobileView && items.length === 0) ? (
        <InputWrapper
          {...(typeof overrides?.InputWrapper?.css === 'string'
            ? {
                cssStyle: overrides.InputWrapper.css,
                ...(overrides.InputWrapper ?? {}),
              }
            : overrides?.InputWrapper === undefined
            ? {}
            : {
                style: overrides.InputWrapper.css,
                ...overrides.InputWrapper,
              })}>
          {items.map((item, i) => (
            <Item
              key={`${item.value}_${i}`}
              bgColor={
                stateColors?.find(
                  (stateColorItem) => stateColorItem.state === item.state,
                )?.bgColor ?? DEFAULT_ITEM_BGCOLOR
              }
              {...(typeof overrides?.Item?.css === 'string'
                ? {
                    cssStyle: overrides.Item.css,
                    ...(overrides.Item ?? {}),
                  }
                : overrides?.Item === undefined
                ? {}
                : { style: overrides.Item.css, ...overrides.Item })}>
              <ItemText
                fgColor={
                  stateColors?.find(
                    (stateColorItem) => stateColorItem.state === item.state,
                  )?.fgColor ?? DEFAULT_ITEM_FGCOLOR
                }
                {...(typeof overrides?.ItemText?.css === 'string'
                  ? {
                      cssStyle: overrides.ItemText.css,
                      ...(overrides.ItemText ?? {}),
                    }
                  : overrides?.ItemText === undefined
                  ? {}
                  : { style: overrides.ItemText.css, ...overrides.ItemText })}>
                {item.value}
              </ItemText>
              <ItemDeleteButton
                type='button'
                onClick={() => removeItem(item.value)}
                fgColor={
                  stateColors?.find(
                    (stateColorItem) => stateColorItem.state === item.state,
                  )?.fgColor ?? DEFAULT_ITEM_FGCOLOR
                }
                {...(typeof overrides?.ItemDeleteButton?.css === 'string'
                  ? {
                      cssStyle: overrides.ItemDeleteButton.css,
                      ...(overrides.ItemDeleteButton ?? {}),
                    }
                  : overrides?.ItemDeleteButton === undefined
                  ? {}
                  : {
                      style: overrides.ItemDeleteButton.css,
                      ...overrides.ItemDeleteButton,
                    })}>
                <svg viewBox='0 0 10 10'>
                  <path d='M10 1.00714L8.99286 0L5 3.99286L1.00714 0L0 1.00714L3.99286 5L0 8.99286L1.00714 10L5 6.00714L8.99286 10L10 8.99286L6.00714 5L10 1.00714Z' />
                </svg>
              </ItemDeleteButton>
            </Item>
          ))}
          {!isMobileView ? (
            <Input
              type='text'
              value={inputValue}
              placeholder={placeholder}
              onChange={onInputChange}
              onKeyPress={onInputKeyPress}
              onKeyDown={onInputKeyDown}
              onBlur={onInputBlur}
              {...(typeof overrides?.Input?.css === 'string'
                ? {
                    cssStyle: overrides.Input.css,
                    ...(overrides.Input ?? {}),
                  }
                : overrides?.Input === undefined
                ? {}
                : { style: overrides.Input.css, ...overrides.Input })}
            />
          ) : null}
        </InputWrapper>
      ) : null}
      {isMobileView ? (
        <Input
          type='text'
          value={inputValue}
          placeholder={placeholder}
          onChange={onInputChange}
          onKeyPress={onInputKeyPress}
          onBlur={onInputBlur}
          {...(typeof overrides?.Input?.css === 'string'
            ? {
                cssStyle: overrides.Input.css,
                ...(overrides.Input ?? {}),
              }
            : overrides?.Input === undefined
            ? {}
            : { style: overrides.Input.css, ...overrides.Input })}
        />
      ) : null}
    </Root>
  );
}
