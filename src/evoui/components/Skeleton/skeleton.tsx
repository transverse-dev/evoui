import styled from 'styled-components';
import { SkeletonType } from './skeleton.type';

const Root = styled.div<SkeletonType.RootPropsType>`
  width: 100%;
  height: 100%;
  background: ${(props) =>
    `linear-gradient(135deg, ${props.theme.evoui.colors.skeleton.gradientBgColor} 33%, ${props.theme.evoui.colors.skeleton.gradientAccentColor} 50%, ${props.theme.evoui.colors.skeleton.gradientBgColor} 66%)`};
  background-size: 300% 300%;
  background-color: ${(props) => props.theme.evoui.colors.skeleton.bgColor};
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

export default function Skeleton({ overrides }: SkeletonType.PropsType) {
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
