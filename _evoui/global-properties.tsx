import * as CSS from 'csstype';

/**
 *  Overrides type of Evo UI
 *  @param css An object that contains styles, an example: { backgroundColor: '#FFFFFF', color: 'white' }
 */
export interface DefaultOverridesType {
  css?: string | CSSPropertiesType;
}

export type StyleType = CSSPropertiesType | string;

export interface CSSPropertiesType
  extends CSS.Properties,
    CSS.PropertiesHyphen {}

export type DefaultPrimitiveType = string | number;

export interface DefaultPropsType {
  cssStyle?: string;
}

/**
 * This is css animation type (appearance effect)
 */
export type effect = 'fadeInUp' | 'jelly';
