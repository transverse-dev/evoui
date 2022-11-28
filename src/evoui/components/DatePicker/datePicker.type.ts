import { DefaultOverridesType, DefaultPropsType } from '../global.type';

export interface RootPropsType extends DefaultPropsType {}
export interface TextPropsType extends DefaultPropsType {}
export interface DividerPropsType extends DefaultPropsType {}

export interface PropsType {
  startDate: Date | null;
  endDate: Date | null;
  isRange?: boolean;
  onChange: (() => void) | ((value: Date) => void);
  Title?: React.ComponentType | React.ElementType;
  Divider?: React.ComponentType | React.ElementType;
  overrides?: Partial<{
    Root: DefaultOverridesType;
  }>;
}
