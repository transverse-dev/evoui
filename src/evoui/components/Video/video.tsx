import React from 'react';
import styled from 'styled-components';
import PlayingButton from './playingbutton';
import Progress from './progress';
import Settings from './settings';
import { VideoType } from './video.type';
import Volume from './volume';

const ControllerContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 8px 16px;
  opacity: 0;
  transition: 0.2s;
`;

const Shadow = styled.div<VideoType.ShadowPropsType>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  ${(props) =>
    props.isMobile
      ? 'background-color: #000000b8;'
      : 'background-image: linear-gradient(to top, #000000b8, #00000000 32%);'}
  opacity: 0;
  transition: 0.2s;
  cursor: pointer;
`;

const Root = styled.div<VideoType.RootPropsType>`
  position: relative;
  width: 100%;
  background-color: #000000;

  &:hover ${ControllerContainer}, &:hover ${Shadow} {
    ${(props) => (props.isMobile ? '' : 'opacity: 1;')};
  }

  & ${ControllerContainer}, & ${Shadow} {
    ${(props) =>
      props.isMobile
        ? props.controllerVisible
          ? 'opacity: 1;'
          : 'opacity: 0;'
        : ''};
  }

  ${(props) => props.cssStyle ?? ''};
`;

const Wall = styled.div<VideoType.WallPropsType>`
  ${(props) => (props.controllerVisible ? 'display: none;' : '')}
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

const ControllerBottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FullscreenButton = styled.button<VideoType.FullscreenButtonPropsType>`
  margin: 0;
  border: 0;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.isMobile ? '20px' : '24px')};
  height: ${(props) => (props.isMobile ? '20px' : '24px')};
  background-color: transparent;
  cursor: pointer;

  > svg {
    width: 100%;
    height: 100%;
    fill: #ffffff;
    transition: transform ease-in-out 200ms;
  }

  &:hover {
    > svg {
      transform: ${(props) =>
        props.isFullscreen ? 'scale(0.9)' : 'scale(1.2)'};
    }
  }
`;

// TODO: ?????? ??????, util??? ????????? ?????????
/**
 * ?????? HMS ???????????? ??????
 * @param _seconds ????????? ???
 * @returns ????????? ?????????
 */
const secondsToHMS = (_seconds: number) => {
  const $ = (n: number) => ('0' + n).slice(-2); // filling zeros
  const seconds = Math.floor(_seconds);
  let result = '';
  const minutes = Math.floor(seconds / 60);
  result = $(seconds % 60) + result;
  const hours = Math.floor(minutes / 60);
  result = (hours > 99 ? 99 : hours) + ':' + $(minutes % 60) + ':' + result;
  return result;
};

export default function Video({
  src,
  videoRef,
  previewTime,
  onPlayingChange,
  onCurrentTimeChange,
  onSpeedChange,
  onDurationChange,
  onEndedChange,
  isMobile,
  overrides,
}: VideoType.PropsType) {
  // video properties
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [ended, setEnded] = React.useState(false);
  const [muted, setMuted] = React.useState(false);
  const [fullscreen, setFullscreen] = React.useState(false);
  const [volume, setVolume] = React.useState(1);
  const [speed, setSpeed] = React.useState('1.0');

  const [controllerVisible, setControllerVisible] = React.useState(false);

  const rootRef = React.useRef<HTMLDivElement>(null); // for fullscreen

  const onLoadedMetadata = () => {
    if (videoRef.current === null) return;
    setDuration(videoRef.current.duration);
  };

  const onCurrentTimeUpdate = () => {
    if (videoRef.current === null) return;

    // currentTime??? ???????????? ??? previewTime??? ???????????? ??????
    // if (videoRef.current.currentTime > (previewTime ?? duration)) {
    //   setPlaying(false);
    //   videoRef.current.currentTime = previewTime ?? duration;
    //   return;
    // }

    setCurrentTime(videoRef.current.currentTime);
  };

  const onEnded = () => {
    if (videoRef.current === null) return;
    setEnded(videoRef.current.ended);
    setPlaying(false); // video??? ????????? ?????????
  };

  const onFullscreenChange = () => {
    if (rootRef.current === null) return;
    setFullscreen(document.fullscreenElement === rootRef.current);
  };

  const _onCurrentTimeChange = (currentTime: number) => {
    if (videoRef.current === null) return;
    videoRef.current.currentTime = currentTime;
  };

  const onVolumeChange = React.useCallback((volume: number) => {
    if (videoRef.current === null) return;
    videoRef.current.volume = volume;
    setVolume(volume);
    setMuted(volume === 0);
  }, []);

  const _onSpeedChange = React.useCallback((speed: string) => {
    if (videoRef.current === null) return;
    videoRef.current.playbackRate = +speed; // string to number
    setSpeed(speed);
  }, []);

  const togglePlaying = () => {
    setPlaying((oldState) => !oldState);
  };

  const toggleMuted = React.useCallback(() => {
    setMuted((oldState) => !oldState);
  }, []);

  const toggleFullscreen = () => {
    if (rootRef.current === null) return;
    document.fullscreenElement === rootRef.current
      ? document.exitFullscreen()
      : rootRef.current.requestFullscreen();
  };

  React.useEffect(() => {
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);

  React.useEffect(() => {
    if (videoRef.current === null) return;
    playing ? videoRef.current.play() : videoRef.current.pause();
  }, [playing, videoRef.current]);

  React.useEffect(() => {
    if (videoRef.current === null) return;
    videoRef.current.muted = muted;
  }, [muted, videoRef.current]);

  React.useEffect(() => {
    if (videoRef.current === null) return;

    // previewTime??? ???????????? ??? currentTime??? ???????????? ??????
    // if (videoRef.current.currentTime <= (previewTime ?? duration)) return;
    // setPlaying(false);
    // videoRef.current.currentTime = previewTime ?? duration;
  }, [previewTime, duration, videoRef.current]);

  React.useEffect(() => {
    if (onPlayingChange) onPlayingChange(playing);
  }, [playing]);

  React.useEffect(() => {
    if (onCurrentTimeChange) onCurrentTimeChange(currentTime);
  }, [currentTime]);

  React.useEffect(() => {
    if (onSpeedChange) onSpeedChange(+speed); // string to number
  }, [speed]);

  React.useEffect(() => {
    if (onDurationChange) onDurationChange(duration);
  }, [duration]);

  React.useEffect(() => {
    if (onEndedChange) onEndedChange(ended);
  }, [ended]);

  return (
    <Root
      ref={rootRef}
      controllerVisible={controllerVisible}
      onMouseEnter={isMobile ? undefined : () => setControllerVisible(true)} // mobile??? ?????? ?????? ????????? ????????? ???????????? ??????
      onMouseLeave={isMobile ? undefined : () => setControllerVisible(false)} // mobile??? ?????? ?????? ????????? ????????? ???????????? ??????
      isMobile={isMobile}
      {...(typeof overrides?.Root?.css === 'string'
        ? { cssStyle: overrides.Root.css, ...(overrides.Root ?? {}) }
        : overrides?.Root == undefined
        ? {}
        : { style: overrides.Root.css, ...(overrides.Root ?? {}) })}>
      <video
        src={src}
        ref={videoRef}
        onTimeUpdate={onCurrentTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
        style={{ width: '100%', height: '100%', cursor: 'pointer' }}
      />
      {isMobile ? (
        <Shadow
          onClick={(event) => {
            if (event.currentTarget === event.target)
              // ????????? ?????? ????????? ???????????? ???(currentTarget: ???????????? ????????? ???, target: ?????? ????????? ???)
              setControllerVisible(false);
          }}
          isMobile>
          <PlayingButton playing={playing} onClick={togglePlaying} isMobile />
        </Shadow>
      ) : (
        <Shadow onClick={togglePlaying} />
      )}
      <ControllerContainer>
        {isMobile || (
          <>
            <Progress
              duration={duration}
              currentTime={currentTime}
              previewTime={previewTime ?? duration}
              onChange={(event: any) => {
                _onCurrentTimeChange(
                  +event.target.value, // string to number
                );
              }}
            />
            <div style={{ marginBottom: '8px' }} />
          </>
        )}
        <ControllerBottomContainer>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isMobile ? (
              <div style={{ marginRight: '8px' }} />
            ) : (
              <>
                <PlayingButton playing={playing} onClick={togglePlaying} />
                <div style={{ marginRight: '10px' }} />
                <Volume
                  muted={muted}
                  toggleMuted={toggleMuted}
                  volume={volume}
                  onVolumeChange={onVolumeChange}
                />
                <div style={{ marginRight: '12px' }} />
              </>
            )}
            <div
              style={{
                marginBottom: '2px',
                color: '#ffffffc0',
                fontSize: '0.8rem',
              }}>
              {secondsToHMS(currentTime)} / {secondsToHMS(duration)}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginRight: '6px',
            }}>
            <Settings
              speed={speed}
              onSpeedChange={_onSpeedChange}
              isMobile={isMobile}
              muted={muted}
              toggleMuted={toggleMuted}
              volume={volume}
              onVolumeChange={onVolumeChange}
            />
            <div style={{ marginRight: '10px' }} />
            <FullscreenButton
              isMobile={!!isMobile}
              isFullscreen={fullscreen}
              onClick={toggleFullscreen}>
              {fullscreen ? (
                <svg viewBox='0 0 24 24'>
                  <path d='M0 0h24v24H0V0z' fill='none' />
                  <path d='M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z' />
                </svg>
              ) : (
                <svg viewBox='0 0 24 24'>
                  <path d='M0 0h24v24H0z' fill='none' />
                  <path d='M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z' />
                </svg>
              )}
            </FullscreenButton>
          </div>
        </ControllerBottomContainer>
        {isMobile && (
          <>
            <div style={{ marginBottom: '8px' }} />
            <Progress
              duration={duration}
              currentTime={currentTime}
              previewTime={previewTime ?? duration}
              onChange={(event: any) => {
                _onCurrentTimeChange(
                  +event.target.value, // string to number
                );
              }}
              isMobile
            />
            <div style={{ marginBottom: '8px' }} />
          </>
        )}
      </ControllerContainer>
      {isMobile && (
        <Wall
          onClick={() => setControllerVisible(true)}
          controllerVisible={controllerVisible}
        /> // ProgressBar??? ???????????? ?????? ??????
      )}
    </Root>
  );
}
