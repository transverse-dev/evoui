import {
  DefaultOverridesType,
  DefaultPropsType,
} from "evoui/global-properties";

import { ChangeEvent } from "react";

export namespace VideoType {
  export interface PropsType {
    src?: string;
    previewTime?: number;
    onPlayingChange?: (playing: boolean) => void;
    onCurrentTimeChange?: (currentTime: number) => void;
    onSpeedChange?: (speed: number) => void;
    onDurationChange?: (duration: number) => void;
    onEndedChange?: (ended: boolean) => void;
    isMobile?: boolean;
    overrides?: {
      Root?: DefaultOverridesType;
    };
  }

  export interface RootPropsType extends DefaultPropsType {
    controllerVisible: boolean;
    isMobile?: boolean;
  }

  export interface WallPropsType {
    controllerVisible: boolean;
  }

  export interface ShadowPropsType {
    isMobile?: boolean;
  }

  export namespace PlayingButtonType {
    export interface PropsType {
      playing: boolean;
      onClick: () => void;
      isMobile?: boolean;
    }
  }

  export namespace ProgressType {
    export interface PropsType {
      duration: number;
      currentTime: number;
      previewTime: number;
      onChange: (event: ChangeEvent<HTMLInputElement>) => void;
      isMobile?: boolean;
    }

    export interface BackgroundPropsType {
      isMobile?: boolean;
    }

    export interface ProgressBarPropsType {
      progress: number;
    }

    export interface PreviewPropsType {
      progress: number;
    }

    export interface InputPropsType {
      isMobile?: boolean;
    }
  }

  export namespace VolumeType {
    export interface PropsType {
      muted: boolean;
      toggleMuted: () => void;
      volume: number;
      onVolumeChange: (volume: number) => void;
    }

    export interface VolumeBarPropsType {
      progress: number;
    }
  }

  export namespace SettingsType {
    export interface PropsType {
      speed: string;
      onSpeedChange: (speed: string) => void;
      isMobile?: boolean;
      muted: boolean;
      toggleMuted: () => void;
      volume: number;
      onVolumeChange: (volume: number) => void;
    }
  }
}
