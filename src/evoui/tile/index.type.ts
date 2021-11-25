import {
  DefaultOverridesType,
  DefaultPropsType,
  effect,
} from '../global-properties';

export namespace tile {
  export interface RootPropsType extends DefaultPropsType {}

  export interface TileProps extends DefaultOverridesType {
    /** - */
    children?: any;
    /** This is css animation type (appearance effect) */
    effect?: effect;
  }
}