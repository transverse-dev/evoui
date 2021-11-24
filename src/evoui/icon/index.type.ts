import {
  DefaultOverridesType,
  DefaultPropsType,
} from '../global-properties';

export namespace icon {
  export interface IconProps {
    /** This is icon type */
    type?: type;
    overrides?: {
      Root: DefaultOverridesType;
    };
  }

  /** This is icon type */
  export type type = 'success' | 'error' | 'warning' | 'info';

  export interface RootPropsType extends DefaultPropsType {}
}
