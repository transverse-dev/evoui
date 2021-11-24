export declare namespace loader {
    interface LoaderCommonPropsType {
        scale?: number;
        color?: string;
        height?: number;
        width?: number;
        radius?: number;
        speed?: number;
        margin?: number;
    }
    namespace flealoader {
        interface RootPropsType extends LoaderCommonPropsType {
        }
        interface FleaLoaderProps extends LoaderCommonPropsType {
        }
    }
    namespace imsiloader {
        interface RootPropsType extends LoaderCommonPropsType {
        }
        interface ImsiLoaderProps extends LoaderCommonPropsType {
        }
    }
    namespace spinloader {
        interface RootPropsType extends LoaderCommonPropsType {
        }
        interface SpinLoaderProps extends LoaderCommonPropsType {
        }
    }
    namespace bounceloader {
        interface RootPropsType extends LoaderCommonPropsType {
        }
        interface BounceLoaderProps extends LoaderCommonPropsType {
        }
    }
    interface LoaderProps extends LoaderCommonPropsType, flealoader.RootPropsType, imsiloader.RootPropsType, spinloader.RootPropsType, bounceloader.RootPropsType {
        type?: type;
    }
    type type = 'flea' | 'imsi' | 'spin' | 'bounce';
}
