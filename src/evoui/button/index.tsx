import { ButtonTypes } from './index.type';
import styled from 'styled-components';

export const KIND = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
};

const Box = styled.div<ButtonTypes.BoxPropsType>`
  padding: 12px;
  border-radius: 6px;
  font-size: 1.1rem;
  text-align: center;
  transition: 0.2s;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;

  ${(props) =>
    (props.kind === undefined || props.kind === 'primary') &&
    `
    background-color: #9f5cfa;
    box-shadow: 0 4px 18px 2px rgba(170,111,244,0.63);
    color: #ffffff;

    &:hover {
      background-color: #7e46c9;
    }
  `}

  ${(props) =>
    props.kind === 'secondary' &&
    `
    background-color: #ffffff;
    box-shadow: 0 0 0 1px #212121 inset;
    text-decoration: underline;
    color: #212121;
  `}

  ${(props) =>
    props.kind === 'tertiary' &&
    `
    background-color: #ffffff;
    box-shadow: 1px 1px 4px rgb(0 0 0 / 25%);
    color: #212121;
  `}

  ${(props) =>
    props.disabled &&
    `
    background-color: #efefef;
    box-shadow: initial;
    color: #c4c4c4;
    text-decoration: initial;
    pointer-events: none;
  `}

  ${(props) => props?.cssStyle ?? ''};
`;

export function Button({
  disabled,
  kind,
  onClick,
  style,
  children,
  overrides,
}: ButtonTypes.PropsType) {
  return (
    <Box
      disabled={disabled}
      kind={kind}
      onClick={disabled ? undefined : onClick}
      style={style}
      {...(typeof overrides?.Root?.css === 'string'
        ? { cssStyle: overrides.Root.css, ...(overrides.Root ?? {}) }
        : overrides?.Root == undefined
        ? {}
        : { style: overrides.Root.css, ...(overrides.Root ?? {}) })}>
      {children}
    </Box>
  );
}

Button.defaultProps = {
  disabled: false,
  kind: KIND.primary,
  onClick: undefined,
  style: undefined,
  children: 'Button',
};
