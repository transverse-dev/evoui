import * as CSS from 'csstype';
export interface DefaultOverridesType {
    css?: string | CSSPropertiesType;
}
export declare type StyleType = CSSPropertiesType | string;
export interface CSSPropertiesType extends CSS.Properties, CSS.PropertiesHyphen {
}
export declare type DefaultPrimitiveType = string | number;
export interface DefaultPropsType {
    cssStyle?: string;
}
export declare type effect = 'fadeInUp' | 'jelly';
