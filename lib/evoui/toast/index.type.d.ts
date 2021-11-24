import { DefaultOverridesType, DefaultPropsType } from '../global-properties';
import { ReactElement, ReactInstance } from 'react';
export declare namespace toast {
    type ToastTypes = 'success' | 'error' | 'info' | 'warning';
    export interface IndependentToastPropsType {
        title: string;
        content?: string | ReactInstance | ReactElement;
        type?: ToastTypes;
        duration?: number;
        closable?: boolean;
        icon?: string | ReactInstance | ReactElement;
        closeButton?: string | ReactInstance | ReactElement;
        overrides?: {
            Root?: DefaultOverridesType;
            ToastContent?: DefaultOverridesType;
            Header?: DefaultOverridesType;
            Icon?: DefaultOverridesType;
            Title?: DefaultOverridesType;
            CloseButton?: DefaultOverridesType;
            Content?: DefaultOverridesType;
        };
    }
    export interface RootPropsType extends DefaultPropsType {
    }
    export interface ToastContentPropsType extends DefaultPropsType {
        type: ToastTypes;
        willRemoved?: boolean;
    }
    export interface HeaderPropsType extends DefaultPropsType {
    }
    export interface IconPropsType extends DefaultPropsType {
    }
    export interface TitlePropsType extends DefaultPropsType {
    }
    export interface CloseButtonPropsType extends DefaultPropsType {
    }
    export interface ContentPropsType extends DefaultPropsType {
    }
    export interface ToastProps {
        overrides?: {
            Root?: DefaultOverridesType;
        };
        onOpen?: () => any;
        onClose?: () => any;
    }
    export {};
}
