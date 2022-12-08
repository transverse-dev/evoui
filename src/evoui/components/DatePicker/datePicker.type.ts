import { DefaultOverridesType, DefaultPropsType } from '../global.type';

export interface RootPropsType extends DefaultPropsType {}
export interface TextPropsType extends DefaultPropsType {}
export interface DividerPropsType extends DefaultPropsType {}
export interface CalendarPropsType extends DefaultPropsType {}
export interface CalendarDatePropsType extends DefaultPropsType {}
export interface MonthButtonPropsType extends DefaultPropsType {
  rotate?: boolean;
}
export interface DayOfWeekTextPropsType extends DefaultPropsType {
  sunday?: boolean;
}

export interface WeekTextContainerPropsType extends DefaultPropsType {}

export interface WeekTextPropsType extends DefaultPropsType {
  sunday?: boolean;
  today?: boolean;
  inRange?: boolean;
  selected?: boolean;
  isPast?: boolean;
  isEmpty?: boolean;
}

export interface RangeTilePropsType extends DefaultPropsType {
  startDay?: boolean;
  endDay?: boolean;
}

export interface PropsType {
  startDate: Date | null;
  endDate: Date | null;
  isRange?: boolean;
  onChangeStartDate?: (() => void) | ((value: Date) => void);
  onChangeEndDate?: (() => void) | ((value: Date) => void);
  Title?: React.ComponentType | React.ElementType;
  Divider?: React.ComponentType | React.ElementType;
  startText?: string;
  endText?: string;
  dayOfWeekText?: string[];
  overrides?: Partial<{
    Root: DefaultOverridesType;
  }>;
}
