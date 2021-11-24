import { CSSProperties } from "styled-components";

export type EvouiButtonKinds = undefined | 'primary' | 'secondary' | 'tertiary' | string;

export namespace ButtonTypes {
  export interface BoxPropsType {
    kind: EvouiButtonKinds;
    disabled: boolean | undefined;
  }

  export interface PropsType {
    disabled?: boolean;
    kind?: EvouiButtonKinds;
    onClick: () => void;
    style?: CSSProperties | undefined;
    children?: JSX.Element | HTMLElement | string;
  }
}
