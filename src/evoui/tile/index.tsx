import '../globalstyle/animation.css';

import styled from 'styled-components';
import { tile } from './index.type';

const Root = styled.div<tile.RootPropsType>`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 1px 1px 4px rgb(0, 0, 0, 0.25);

  ${(props) => props.cssStyle ?? ''};
`;

export function Tile({ children, effect, overrides }: tile.TileProps) {
  return (
    <Root
      className={`evo-${effect}` || undefined}
      {...(typeof overrides?.Root?.css === 'string'
        ? { cssStyle: overrides.Root.css, ...(overrides.Root ?? {}) }
        : overrides?.Root == undefined
        ? {}
        : { style: overrides.Root.css, ...(overrides.Root ?? {}) })}>
      {children}
    </Root>
  );
}
