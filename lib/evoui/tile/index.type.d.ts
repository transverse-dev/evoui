import { DefaultOverridesType, DefaultPropsType, effect } from '../global-properties';
export declare namespace tile {
    interface RootPropsType extends DefaultPropsType {
    }
    interface TileProps extends DefaultOverridesType {
        children?: any;
        effect?: effect;
    }
}
