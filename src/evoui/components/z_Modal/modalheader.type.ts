import { DefaultOverridesType, DefaultPropsType } from '../global.type';

export namespace ModalHeaderType {
  export interface RootPropsType extends DefaultPropsType {}

  export interface PropsType {
    children: any;
    overrides?: {
      Root?: DefaultOverridesType;
    };
  }
}
