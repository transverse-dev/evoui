import styled from 'styled-components';
import Loader from '../Loader';
import { WallType } from './wall.type';

const Root = styled.div<WallType.RootPropsType>`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${(props) =>
    props.backgroundColor
      ? props.backgroundColor
      : props.theme.colors.evoui.wall.bgColor};
  overflow: hidden;
  z-index: 100000;

  & > div {
    margin: auto;
  }

  ${(props) => props.cssStyle ?? ''};
`;

export default function Wall({
  isOn,
  backgroundColor,
  loader,
  overrides,
}: WallType.PropsType) {
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
