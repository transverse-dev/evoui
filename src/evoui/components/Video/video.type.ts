import { MutableRefObject } from 'react';
import { DefaultOverridesType, DefaultPropsType } from '../global.type';

export namespace VideoType {
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

  export interface FullscreenButtonPropsType {
    isMobile: boolean;
    isFullscreen: boolean;
  }

  export interface PropsType {
    src?: string;
    videoRef?: MutableRefObject<HTMLVideoElement | null>;
    previewTime?: number;
    onPlayingChange?: (playing: boolean) => void;
    onCurrentTimeChange?: (currentTime: number) => void;
    onSpeedChange?: (speed: number) => void;
    onDurationChange?: (duration: number) => void;
    onEndedChange?: (ended: boolean) => void;
    isMobile?: boolean;
    tracks?: TrackType[];
    overrides?: {
      Root?: DefaultOverridesType;
    };
  }

  export namespace PlayingButtonType {
    export interface PropsType {
      playing: boolean;
      onClick: () => void;
      isMobile?: boolean;
    }
  }

  export namespace ProgressType {
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

    export interface PropsType {
      duration: number;
      currentTime: number;
      previewTime: number;
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
      isMobile?: boolean;
    }
  }

  export namespace VolumeType {
    export interface VolumeBarPropsType {
      progress: number;
    }

    export interface PropsType {
      muted: boolean;
      toggleMuted: () => void;
      volume: number;
      onVolumeChange: (volume: number) => void;
    }
  }

  export namespace SettingsType {
    export interface SettingButtonPropsType {
      isMobile: boolean;
    }

    export interface PropsType {
      isMobile?: boolean;
      speed: string;
      onSpeedChange: (speed: string) => void;
      volume: number;
      onVolumeChange: (volume: number) => void;
      muted: boolean;
      toggleMuted: () => void;
    }
  }
}

export type TrackType = {
  id: number | string;
  label: string;
  src: string;
};
