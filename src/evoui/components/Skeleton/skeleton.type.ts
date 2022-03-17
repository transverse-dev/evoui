import { DefaultOverridesType, DefaultPropsType } from '../global.type';

export namespace SkeletonType {
  export interface RootPropsType extends DefaultPropsType {}

  export interface PropsType {
    overrides?: {
      Root?: DefaultOverridesType;
    };
  }
}
