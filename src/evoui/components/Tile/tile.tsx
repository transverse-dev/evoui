import styled from 'styled-components';
import { AnimationStyle } from '../z_GlobalStyle';
import { TileType } from './tile.type';

const Root = styled.div<TileType.RootPropsType>`
  padding: 20px;
  background-color: ${(props) => props.theme.evoui.colors.tile.bgColor};
  border-radius: 8px;
  box-shadow: 1px 1px 4px
    ${(props) => props.theme.evoui.colors.tile.shadowColor};

  ${(props) => props.cssStyle ?? ''};
`;

export default function Tile({ children, effect, css }: TileType.PropsType) {
  return (
    <Root
      className={(effect && AnimationStyle[effect]) || undefined}
      {...(typeof css === 'string'
        ? { cssStyle: css }
        : css === undefined
        ? {}
        : { style: css })}>
      {children}
    </Root>
  );
}
