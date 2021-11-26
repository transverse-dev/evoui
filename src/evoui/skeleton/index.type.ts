import { DefaultOverridesType, DefaultPropsType } from '../global-properties';

export namespace SkeletonType {
  export interface RootPropsType extends DefaultPropsType {}

  export interface PropsType {
    overrides?: {
      Root?: DefaultOverridesType;
    };
  }
}
