import '../globalstyle/animation.css';

import { Icon } from '../icon';
import { Loader } from '../loader';
import { feedback } from './index.type';
import styled from 'styled-components';

const Root = styled.div<feedback.RootPropsType>`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #f6f1ff;
  border-radius: 10px;
  color: #9f5cfa;
  font-weight: 600;
  ${(props) =>
    props.clickable
      ? `
    transition: 0.2s;
    cursor: pointer;

    &:hover {
      background-color: #efeaf7;
    }
  `
      : ''};

  ${(props) => props.cssStyle ?? ''};
`;

export function Feedback({
  children,
  effect,
  enhancer,
  overrides,
  onClick,
}: feedback.FeedbackProps) {
  return (
    <Root
      className={`evo-${effect}` || undefined}
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
