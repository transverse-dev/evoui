import { DefaultOverridesType, DefaultPrimitiveType, DefaultPropsType } from "../global-properties";
export declare namespace dropDownList {
    export interface RootPropsType extends DefaultPropsType {
    }
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
    interface DropDownListOptionsType {
        label: any;
        id: DefaultPrimitiveType;
        disabled?: boolean;
    }
    export interface DropDownListProps {
        options?: Array<DropDownListOptionsType>;
        placeholder?: string;
        value?: DropDownListOptionsType;
        onChange?: (option: DropDownListOptionsType) => void;
        overrides?: {
            Root?: DefaultOverridesType;
            ListWrapper?: DefaultOverridesType;
            List?: DefaultOverridesType;
            ListItem?: DefaultOverridesType;
        };
        closeOnChange?: boolean;
    }
    export {};
}
