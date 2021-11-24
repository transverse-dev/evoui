import '../globalstyle/animation.css';

import { loader } from './index.type';
import styled from 'styled-components';

const Root = styled.div<loader.imsiloader.RootPropsType>`
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
      props.color ?? '#9f5cfa'};
    border-radius: ${(props) => (props.scale ?? 1) * (props.radius ?? 4.5)}px;
  }

  & > div:nth-child(1) {
    animation-duration: ${(props) => 1 / (props.speed ?? 1)}s;
    margin-right: ${(props) => props.margin ?? 0}px;
  }
  & > div:nth-child(2) {
    animation-duration: ${(props) => 1 / (props.speed ?? 1)}s;
    animation-delay: 0.2s;
    margin-right: ${(props) => props.margin ?? 0}px;
  }
  & > div:nth-child(3) {
    animation-duration: ${(props) => 1 / (props.speed ?? 1)}s;
    animation-delay: 0.4s;
  }
`;

export function ImsiLoader({
  scale,
  color,
  height,
  width,
  radius,
  speed,
  margin,
}: loader.imsiloader.ImsiLoaderProps) {
  return (
    <Root
      scale={scale}
      color={color}
      height={height}
      width={width}
      radius={radius}
      speed={speed}
      margin={margin}>
      <div className={'evo-imsi'}></div>
      <div className={'evo-imsi'}></div>
      <div className={'evo-imsi'}></div>
    </Root>
  );
}
