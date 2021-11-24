import { DefaultOverridesType, DefaultPropsType } from '../global-properties';
export declare namespace SkeletonType {
    interface RootPropsType extends DefaultPropsType {
    }
    interface PropsType {
        overrides?: {
            Root?: DefaultOverridesType;
        };
    }
}
