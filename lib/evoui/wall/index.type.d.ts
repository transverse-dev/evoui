import { DefaultOverridesType, DefaultPropsType } from "../global-properties";
import { loader } from "../loader/index.type";
export declare namespace wall {
    interface RootPropsType extends DefaultPropsType {
        backgroundColor?: string;
    }
    interface WallProps {
        isOn: boolean;
        backgroundColor?: string;
        loader?: loader.LoaderProps;
        overrides?: {
            Root?: DefaultOverridesType;
        };
    }
}
