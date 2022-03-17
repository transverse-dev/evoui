import {
  DefaultOverridesType,
  DefaultPrimitiveType,
  DefaultPropsType,
} from '../global.type';

export namespace DropdownListType {
  interface DropdownListOptionsType {
    label: any;
    id: DefaultPrimitiveType;
    disabled?: boolean;
  }

  export interface RootPropsType extends DefaultPropsType {}

  export interface ListWrapperPropsType extends DefaultPropsType {
    listVisible: boolean;
    absolute: number;
  }

  export interface ListPropsType extends DefaultPropsType {
    listVisible: boolean;
  }

  export interface ListItemPropsType extends DefaultPropsType {
    listVisible: boolean;
    selected?: boolean;
    disabled?: boolean;
  }

  export interface PropsType {
    /** Dropdown options */
    options?: Array<DropdownListOptionsType>;
    /** Placeholder text */
    placeholder?: string;
    /** Currently selected value. The value no need to be in options array. */
    value?: DropdownListOptionsType;
    /** OnChange callback function. The function will be called when selected value changed. */
    onChange?: (option: DropdownListOptionsType) => void;
    /** UI elements props will be overridden. Only css value is available on current version. */
    overrides?: {
      Root?: DefaultOverridesType;
      ListWrapper?: DefaultOverridesType;
      List?: DefaultOverridesType;
      ListItem?: DefaultOverridesType;
    };
    /** If true, list is closed when modal changed. Default value is true. */
    closeOnChange?: boolean;
  }
}
