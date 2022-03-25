import styled from 'styled-components';
import { AnimationStyle } from '../z_GlobalStyle';
import { LoaderType } from './loader.type';

// Why Root's height is x + y?
// We added this separately because x is the height the element jumps from, and y is the size of the element itself.
const Root = styled.div<LoaderType.FleaLoaderType.RootPropsType>`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: ${(props) =>
    (props.scale ?? 1) * ((props.width ?? 0) + 38 + (props.margin ?? 0))}px;
  height: ${(props) => (props.scale ?? 1) * (10 + (props.height ?? 0))}px;

  & > div > div {
    width: ${(props) => (props.scale ?? 1) * (props.width ?? 9)}px;
    height: ${(props) => (props.scale ?? 1) * (props.height ?? 9)}px;
    background-color: ${(props) =>
      props.color ?? props.theme.evoui.colors.loader.bgColor};
    border-radius: ${(props) =>
      (props.scale ?? 1) * (3 + (props.radius ?? 0))}px;
  }

  & > div:nth-child(1) {
    animation-duration: ${(props) => 1 / (props.speed ?? 1)}s;
    animation-delay: -1s;
    margin-right: ${(props) => props.margin ?? 0}px;
  }
  & > div:nth-child(2) {
    animation-duration: ${(props) => 1 / (props.speed ?? 1)}s;
    animation-delay: ${(props) => 0.2 / (props.speed ?? 1) - 1}s;
    margin-right: ${(props) => props.margin ?? 0}px;
  }
  & > div:nth-child(3) {
    animation-duration: ${(props) => 1 / (props.speed ?? 1)}s;
    animation-delay: ${(props) => 0.4 / (props.speed ?? 1) - 1}s;
  }

  & > div:nth-child(1) > div {
    animation-duration: ${(props) => 1 / (props.speed ?? 1)}s;
    animation-delay: -1s;
  }
  & > div:nth-child(2) > div {
    animation-duration: ${(props) => 1 / (props.speed ?? 1)}s;
    animation-delay: ${(props) => 0.2 / (props.speed ?? 1) - 1}s;
  }
  & > div:nth-child(3) > div {
    animation-duration: ${(props) => 1 / (props.speed ?? 1)}s;
    animation-delay: ${(props) => 0.4 / (props.speed ?? 1) - 1}s;
  }
`;

export default function FleaLoader({
  scale,
  color,
  height,
  width,
  radius,
  speed,
  margin,
}: LoaderType.FleaLoaderType.PropsType) {
  return (
    <Root
      scale={scale}
      color={color}
      height={height}
      width={width}
      radius={radius}
      speed={speed}
      margin={margin}>
      <div className={AnimationStyle.jump}>
        <div className={AnimationStyle.rotate}></div>
      </div>
      <div className={AnimationStyle.jump}>
        <div className={AnimationStyle.rotate}></div>
      </div>
      <div className={AnimationStyle.jump}>
        <div className={AnimationStyle.rotate}></div>
      </div>
    </Root>
  );
}
