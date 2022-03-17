import { DefaultOverridesType, DefaultPropsType, effect } from '../global.type';

export namespace TileType {
  export interface RootPropsType extends DefaultPropsType {}

  export interface PropsType extends DefaultOverridesType {
    /** - */
    children?: any;
    /** This is css animation type (appearance effect) */
    effect?: effect;
  }
}
