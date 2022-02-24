import {
  DefaultOverridesType,
  DefaultPropsType,
  effect,
} from '../global-properties';

import { icon } from '../icon/index.type';
import { loader } from '../loader/index.type';

export namespace feedback {
  export interface RootPropsType extends DefaultPropsType {
    clickable: boolean;
  }

  export interface FeedbackProps {
    /** - */
    children?: any;
    /** This is css animation type (appearance effect) */
    effect?: effect;
    /**
     * This is enhancer. undefined value will not show enhancer.
     * (Warning)
     * Enhancer must be one.
     * loaderType and iconType are incompatible.
     */
    enhancer?: { loaderType: loader.type } | { iconType: icon.type };
    /** UI elements props will be overridden. Only css value is available on current version. */
    overrides?: {
      Root?: DefaultOverridesType;
    };
    /** - */
    onClick?: () => void;
  }
}
