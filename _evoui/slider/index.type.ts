import { DefaultPropsType } from '../global-properties';

export interface SliderPropsType extends DefaultPropsType {
  spot?: number;
  textlist?: Array<string>;
  fillColor?: string;
  bgColor?: string;
  textColor?: string;
  stateValues?: Array<number>;
  initValue?: any;
  changeValue?: number;
  onChange?: (value: any) => any;
  selected?: boolean;
  changeClosure?: (value: boolean) => void;
  onText?: boolean;
}
