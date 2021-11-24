/// <reference types="react" />
import { ButtonTypes } from './index.type';
export declare const KIND: {
    primary: string;
    secondary: string;
    tertiary: string;
};
export declare function Button({ disabled, kind, onClick, style, children, }: ButtonTypes.PropsType): JSX.Element;
export declare namespace Button {
    var defaultProps: {
        disabled: boolean;
        kind: string;
        onClick: undefined;
        style: undefined;
        children: string;
    };
}
