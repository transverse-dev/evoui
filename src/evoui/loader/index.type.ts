export namespace loader {
  export interface LoaderCommonPropsType {
    scale?: number;
    /**Loader color */
    color?: string;
    /**Loader height, width, radius */
    height?: number;
    width?: number;
    radius?: number;
    /**Loader moving speed */
    speed?: number;
    /**Spacing between elements of the loader */
    margin?: number;
  }

  export namespace flealoader {
    export interface RootPropsType extends LoaderCommonPropsType {}

    export interface FleaLoaderProps extends LoaderCommonPropsType {}
  }

  export namespace imsiloader {
    export interface RootPropsType extends LoaderCommonPropsType {}

    export interface ImsiLoaderProps extends LoaderCommonPropsType {}
  }

  export namespace spinloader {
    export interface RootPropsType extends LoaderCommonPropsType {}

    export interface SpinLoaderProps extends LoaderCommonPropsType {}
  }

  export namespace bounceloader {
    export interface RootPropsType extends LoaderCommonPropsType {}

    export interface BounceLoaderProps extends LoaderCommonPropsType {}
  }

  export interface LoaderProps
    extends LoaderCommonPropsType,
      flealoader.RootPropsType,
      imsiloader.RootPropsType,
      spinloader.RootPropsType,
      bounceloader.RootPropsType {
    /** This is loader type */
    type?: type;
  }

  /** This is loader type */
  export type type = 'flea' | 'imsi' | 'spin' | 'bounce';
}
