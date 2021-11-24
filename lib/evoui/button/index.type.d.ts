/// <reference types="react" />
import { CSSProperties } from "styled-components";
export declare type EvouiButtonKinds = undefined | 'primary' | 'secondary' | 'tertiary' | string;
export declare namespace ButtonTypes {
    interface BoxPropsType {
        kind: EvouiButtonKinds;
        disabled: boolean | undefined;
    }
    interface PropsType {
        disabled?: boolean;
        kind?: EvouiButtonKinds;
        onClick: () => void;
        style?: CSSProperties | undefined;
        children?: JSX.Element | HTMLElement | string;
    }
}
