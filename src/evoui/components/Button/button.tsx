import styled from 'styled-components';
import { ButtonType } from './button.type';

const Root = styled.div<ButtonType.RootPropsType>`
  padding: 12px;
  border-radius: 6px;
  font-size: 1.1rem;
  text-align: center;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;

  ${(props) =>
    (props.kind === undefined || props.kind === 'primary') &&
    `
    background-color: ${props.theme.evoui.colors.button.primaryBgColor};
    box-shadow: ${props.theme.evoui.colors.button.primaryShadow};
    color: ${props.theme.evoui.colors.button.primaryFgColor};
    transition: 0.2s background-color;

    &:hover {
      background-color: ${props.theme.evoui.colors.button.primaryHoverBgColor};
    }
  `}

  ${(props) =>
    props.kind === 'secondary' &&
    `
    background-color: ${props.theme.evoui.colors.button.secondaryBgColor};
    box-shadow: ${props.theme.evoui.colors.button.secondaryShadow};
    text-decoration: underline;
    color: ${props.theme.evoui.colors.button.secondaryFgColor};
  `} 
  ${(props) =>
    props.kind === 'tertiary' &&
    `
    background-color: ${props.theme.evoui.colors.button.tertiaryBgColor};
    box-shadow: ${props.theme.evoui.colors.button.tertiaryShadow};
    color: ${props.theme.evoui.colors.button.tertiaryFgColor};
  `}

  ${(props) =>
    props.disabled &&
    `
    background-color: ${props.theme.evoui.colors.button.disabledBgColor};
    box-shadow: ${props.theme.evoui.colors.button.disabledShadow};
    color: ${props.theme.evoui.colors.button.disabledFgColor};
    text-decoration: initial;
    pointer-events: none;
    transition: initial;
  `}
`;

export default function Button({
  disabled,
  kind,
  onClick,
  style,
  children,
}: ButtonType.PropsType) {
  return (
    <Root
      disabled={disabled}
      kind={kind}
      onClick={disabled ? undefined : onClick}
      style={style}>
      {children}
    </Root>
  );
}
