import { DefaultOverridesType, DefaultPropsType, effect } from '../global-properties';
import { icon } from '../icon/index.type';
import { loader } from '../loader/index.type';
export declare namespace feedback {
    interface RootPropsType extends DefaultPropsType {
        clickable: boolean;
    }
    interface FeedbackProps {
        children?: any;
        effect?: effect;
        enhancer?: {
            loaderType: loader.type;
        } | {
            iconType: icon.type;
        };
        overrides?: {
            Root?: DefaultOverridesType;
        };
        onClick?: () => void;
    }
}
