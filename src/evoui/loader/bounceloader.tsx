import { loader } from './index.type';
import styled from 'styled-components';

const Root = styled.div<loader.bounceloader.RootPropsType>`
  width: ${(props) => (props.scale ?? 1) * ((props.width ?? 0) + 38)}px;
  height: ${(props) => (props.scale ?? 1) * ((props.height ?? 0) + 38)}px;
  position: relative;

  & > div {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: ${(props) =>
      props.color ?? '#9f5cfa'};
    border-radius: 50%;
    opacity: 0.6;
    animation: bounce 2s infinite ease-in-out;
    top: 0;
    left: 0;
  }

  & > .second {
    animation-delay: -1s;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;
export function BounceLoader({
  scale,
  color,
  height,
  width,
  radius,
  speed,
  margin,
}: loader.bounceloader.BounceLoaderProps) {
  return (
    <Root
      scale={scale}
      color={color}
      height={height}
      width={width}
      radius={radius}
      speed={speed}
      margin={margin}>
      <div className='first'></div>
      <div className='second'></div>
    </Root>
  );
}
