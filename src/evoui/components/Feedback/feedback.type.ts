import { DefaultOverridesType, DefaultPropsType, effect } from '../global.type';
import { IconType } from '../Icon/icon.type';
import { LoaderType } from '../Loader/loader.type';

export namespace FeedbackType {
  export interface RootPropsType extends DefaultPropsType {
    clickable: boolean;
  }

  export interface PropsType {
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
    enhancer?: { loaderType: LoaderType.type } | { iconType: IconType.type };
    /** UI elements props will be overridden. Only css value is available on current version. */
    overrides?: {
      Root?: DefaultOverridesType;
    };
    /** - */
    onClick?: () => void;
  }
}
