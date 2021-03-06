import styled from 'styled-components';
import { LoaderType } from './loader.type';

const Root = styled.div<LoaderType.DailyLoaderType.RootPropsType>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${(props) =>
    (props.scale ?? 1) * ((props.width ?? 0) + 38 + (props.margin ?? 0))}px;
  height: ${(props) => (props.scale ?? 1) * ((props.height ?? 0) + 10)}px;

  & > div {
    width: ${(props) => (props.scale ?? 1) * (props.width ?? 9)}px;
    height: ${(props) => (props.scale ?? 1) * (props.height ?? 9)}px;
    background-color: ${(props) =>
      props.color ?? props.theme.evoui.colors.loader.bgColor};
    border-radius: ${(props) => (props.scale ?? 1) * (props.radius ?? 4.5)}px;
  }

  & > div:nth-child(1) {
    animation: daily ${(props) => 1 / (props.speed ?? 1)}s infinite;
    margin-right: ${(props) => props.margin ?? 0}px;
  }
  & > div:nth-child(2) {
    animation: daily ${(props) => 1 / (props.speed ?? 1)}s infinite 0.2s;
    margin-right: ${(props) => props.margin ?? 0}px;
  }
  & > div:nth-child(3) {
    animation: daily ${(props) => 1 / (props.speed ?? 1)}s infinite 0.4s;
  }

  @keyframes daily {
    from {
      transform: scale(1);
    }
    33% {
      transform: scale(0);
    }
    66% {
      transform: scale(1);
    }
    to {
      transform: scale(1);
    }
  }
`;

export default function DailyLoader({
  scale,
  color,
  height,
  width,
  radius,
  speed,
  margin,
}: LoaderType.DailyLoaderType.PropsType) {
  return (
    <Root
      scale={scale}
      color={color}
      height={height}
      width={width}
      radius={radius}
      speed={speed}
      margin={margin}>
      <div></div>
      <div></div>
      <div></div>
    </Root>
  );
}
