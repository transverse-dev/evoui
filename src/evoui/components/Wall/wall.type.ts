import { DefaultOverridesType, DefaultPropsType } from '../global.type';
import { LoaderType } from '../Loader/loader.type';

export namespace WallType {
  export interface RootPropsType extends DefaultPropsType {
    backgroundColor?: string;
  }

  export interface PropsType {
    isOn: boolean;
    backgroundColor?: string;
    loader?: LoaderType.PropsType;
    overrides?: {
      Root?: DefaultOverridesType;
    };
  }
}
