import { DefaultOverridesType, DefaultPropsType } from '../global.type';

export namespace InfiniteScrollType {
  export interface RootPropsType extends DefaultPropsType {
    isMouseMoving: boolean;
    refreshOn: boolean;
  }
  export interface RefreshIconWrapperPropsType extends DefaultPropsType {
    isScrollY: boolean;
    translateValue: { x: number; y: number };
    refreshGap: number;
  }
  export interface RefreshIconPropsType extends DefaultPropsType {
    isRefreshing: boolean;
    rotateDeg: number;
  }
  export interface ListWrapperPropsType extends DefaultPropsType {
    isScrollY: boolean;
    translateValue: { x: number; y: number };
  }
  export interface RefreshMessageWrapperPropsType extends DefaultPropsType {}
  export interface RefreshMessagePropsType extends DefaultPropsType {
    refreshGap: number;
  }
  export interface DefaultLoadingMessagePropsType extends DefaultPropsType {}
  export interface DefaultEndingMessagePropsType extends DefaultPropsType {}
  export interface PrevObserverPropsType {
    isScrollY: boolean;
    activeGap: number;
  }
  export interface NextObserverPropsType {
    isScrollY: boolean;
    activeGap: number;
  }

  export interface PropsType {
    children: any;
    dataLength: number;
    next: () => void;
    prev?: () => void;
    hasMore: boolean;
    LoadingMessage?: React.ComponentType | React.ElementType;
    EndingMessage?: React.ComponentType | React.ElementType;
    scrollDirection?: 'x' | 'y';
    scrollTargetId?: string;
    activeGap?: number;
    refreshFunction?: () => void;
    refreshType?: 'none' | 'icon' | 'message';
    refreshGap?: number;
    refreshMessage?: string;
    overrides?: {
      Root?: DefaultOverridesType;
      RefreshIconWrapper?: DefaultOverridesType;
      RefreshIcon?: DefaultOverridesType;
      ListWrapper?: DefaultOverridesType;
      RefreshMessageWrapper?: DefaultOverridesType;
      RefreshMessage?: DefaultOverridesType;
      DefaultLoadingMessage?: DefaultOverridesType;
      DefaultEndingMessage?: DefaultOverridesType;
    };
  }
}
