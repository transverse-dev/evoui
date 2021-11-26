import { Loader } from '../loader/index';
import styled from 'styled-components';
import { wall } from './index.type';

const Root = styled.div<wall.RootPropsType>`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : 'rgba(255, 255, 255, 0.7)'};
  overflow: hidden;
  z-index: 100000;

  & > div {
    margin: auto;
  }

  ${(props) => props.cssStyle ?? ''};
`;

export function Wall({
  isOn,
  backgroundColor,
  loader,
  overrides,
}: wall.WallProps) {
  return isOn ? (
    <Root
      backgroundColor={backgroundColor}
      {...(typeof overrides?.Root?.css === 'string'
        ? {
            cssStyle: overrides.Root.css,
            ...(overrides.Root ?? {}),
          }
        : overrides?.Root == undefined
        ? {}
        : { style: overrides.Root.css, ...overrides.Root })}>
      <div>
        <Loader {...loader} />
      </div>
    </Root>
  ) : null;
}

Wall.defaultProps = {
  isOn: false,
};
