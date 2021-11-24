import { ComponentType, ElementType, ReactElement, ReactInstance } from "react";
import { DefaultOverridesType, DefaultPrimitiveType, DefaultPropsType } from "../global-properties";
export declare namespace popoverMenu {
    export interface RootPropsType extends DefaultPropsType {
    }
    export interface MenuListBasePropsType extends DefaultPropsType {
    }
    export interface MenuListWrapperPropsType extends DefaultPropsType {
        menuVisible: boolean;
        isFixed: boolean;
    }
    export interface MenuListPropsType extends DefaultPropsType {
    }
    export interface MenuItemPropsType extends DefaultPropsType {
        disabled?: boolean;
        noClick?: boolean;
    }
    export interface DividerPropsType extends DefaultPropsType {
    }
    export interface DefaultButtonPropsType {
        toggleMenu: () => void;
    }
    interface PopoverMenuItemType {
        label: DefaultPrimitiveType | ComponentType | ElementType | ReactElement;
        onClick?: (event: any) => any;
        disabled?: boolean;
    }
    export interface PopoverMenuProps {
        Button?: ComponentType | ElementType;
        items?: Array<PopoverMenuItemType | "divider">;
        overrides?: {
            Root?: DefaultOverridesType;
            MenuListBase?: DefaultOverridesType;
            MenuListWrapper?: DefaultOverridesType;
            MenuList?: DefaultOverridesType;
            MenuItem?: DefaultOverridesType;
            Divider?: DefaultOverridesType;
        };
        snap?: "sticky" | "pop" | false;
        closeOnOut?: boolean;
        isFixed?: boolean;
        fixedParent?: ReactInstance;
        onOpen?: () => any;
        onClose?: () => any;
        location?: "top-end" | "top-center" | "top-start" | "bottom-end" | "bottom-center" | "bottom-start";
        scrollTarget?: any | ComponentType | ElementType | ReactElement;
    }
    export {};
}
