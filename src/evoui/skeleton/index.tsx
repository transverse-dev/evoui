import { SkeletonType } from './index.type';
import styled from 'styled-components';

const Root = styled.div<SkeletonType.RootPropsType>`
  width: 100%;
  height: 100%;
  background: ${(props) =>
    `linear-gradient(135deg, #00000000 33%, #00000011 50%, #00000000 66%)`};
  background-size: 300% 300%;
  background-color: #f6f6f6;
  animation: skeleton 1.4s infinite;

  @keyframes skeleton {
    0% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }

  ${(props) => props.cssStyle ?? ''};
`;

export function Skeleton({ overrides }: SkeletonType.PropsType) {
  return (
    <Root
      {...(typeof overrides?.Root?.css === 'string'
        ? { cssStyle: overrides.Root.css, ...(overrides.Root ?? {}) }
        : overrides?.Root == undefined
        ? {}
        : { style: overrides.Root.css, ...(overrides.Root ?? {}) })}
    />
  );
}
