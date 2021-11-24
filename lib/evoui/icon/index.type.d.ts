import { DefaultOverridesType, DefaultPropsType } from '../global-properties';
export declare namespace icon {
    interface IconProps {
        type?: type;
        overrides?: {
            Root: DefaultOverridesType;
        };
    }
    type type = 'success' | 'error' | 'warning' | 'info';
    interface RootPropsType extends DefaultPropsType {
    }
}
