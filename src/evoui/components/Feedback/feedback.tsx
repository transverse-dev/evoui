import styled from 'styled-components';
import { AnimationStyle } from '../z_GlobalStyle';
import Icon from '../Icon';
import Loader from '../Loader';
import { FeedbackType } from './feedback.type';

const Root = styled.div<FeedbackType.RootPropsType>`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: ${(props) => props.theme.evoui.colors.feedback.bgColor};
  border-radius: 10px;
  color: ${(props) => props.theme.evoui.colors.feedback.fgColor};
  font-weight: 600;
  ${(props) =>
    props.clickable
      ? `
    transition: 0.2s;
    cursor: pointer;

    &:hover {
      background-color: ${props.theme.evoui.colors.feedback.hoverBgColor};
    }
  `
      : ''};

  ${(props) => props.cssStyle ?? ''};
`;

export default function Feedback({
  children,
  effect,
  enhancer,
  overrides,
  onClick,
}: FeedbackType.PropsType) {
  return (
    <Root
      className={(effect && AnimationStyle[effect]) || undefined}
      clickable={onClick !== undefined}
      onClick={onClick}
      {...(typeof overrides?.Root?.css === 'string'
        ? { cssStyle: overrides.Root.css, ...(overrides.Root ?? {}) }
        : overrides?.Root == undefined
        ? {}
        : { style: overrides.Root.css, ...(overrides.Root ?? {}) })}>
      {enhancer === undefined ? (
        children
      ) : (
        <>
          {'loaderType' in enhancer ? (
            <Loader type={enhancer.loaderType} />
          ) : (
            <Icon type={enhancer.iconType} />
          )}
          <div style={{ marginRight: '16px' }} />
          <div>{children}</div>
        </>
      )}
    </Root>
  );
}
