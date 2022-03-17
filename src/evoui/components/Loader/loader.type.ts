export namespace LoaderType {
  /** This is loader type */
  export type type = 'flea' | 'daily' | 'spin' | 'bounce';

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

  export interface PropsType
    extends LoaderCommonPropsType,
      FleaLoaderType.RootPropsType,
      DailyLoaderType.RootPropsType,
      SpinLoaderType.RootPropsType,
      BounceLoaderType.RootPropsType {
    /** This is loader type */
    type?: type;
  }

  export namespace FleaLoaderType {
    export interface RootPropsType extends LoaderCommonPropsType {}

    export interface PropsType extends LoaderCommonPropsType {}
  }

  export namespace DailyLoaderType {
    export interface RootPropsType extends LoaderCommonPropsType {}

    export interface PropsType extends LoaderCommonPropsType {}
  }

  export namespace SpinLoaderType {
    export interface RootPropsType extends LoaderCommonPropsType {}

    export interface PropsType extends LoaderCommonPropsType {}
  }

  export namespace BounceLoaderType {
    export interface RootPropsType extends LoaderCommonPropsType {}

    export interface PropsType extends LoaderCommonPropsType {}
  }
}
