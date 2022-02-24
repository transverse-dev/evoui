import { DefaultOverridesType, DefaultPropsType } from '../global-properties';

import { loader } from '../loader/index.type';

export namespace wall {
  export interface RootPropsType extends DefaultPropsType {
    backgroundColor?: string;
  }

  export interface WallProps {
    isOn: boolean;
    backgroundColor?: string;
    loader?: loader.LoaderProps;
    overrides?: {
      Root?: DefaultOverridesType;
    };
  }
}
