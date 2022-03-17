import { DefaultOverridesType, DefaultPropsType } from '../global.type';

export namespace IconType {
  /** This is icon type */
  export type type = 'success' | 'error' | 'warning' | 'info';

  export interface RootPropsType extends DefaultPropsType {}

  export interface PropsType {
    /** This is icon type */
    type?: type;
    overrides?: {
      Root: DefaultOverridesType;
    };
  }
}
