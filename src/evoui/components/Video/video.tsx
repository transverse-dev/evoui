import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import PlayingButton from './playingbutton';
import Progress from './progress';
import Settings from './Settings';
import { TrackType, VideoType } from './video.type';
import Volume from './volume';
import TracksPopover from './TracksPopover';

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

// TODO: 정리 필요, util로 분리할 것인지
/**
 * 초를 HMS 형식으로 변환
 * @param _seconds 변환할 초
 * @returns 변환된 문자열
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
  tracks,
  overrides,
}: VideoType.PropsType) {
  // video properties
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState('1.0');
  const [track, setTrack] = useState<TrackType | null>(null);

  const [controllerVisible, setControllerVisible] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null); // for fullscreen
  const embeddedVideoRef = useRef<HTMLVideoElement | null>(null);

  const onLoadedMetadata = () => {
    if (embeddedVideoRef.current === null) return;
    setDuration(embeddedVideoRef.current.duration);
  };

  const onCurrentTimeUpdate = () => {
    if (embeddedVideoRef.current === null) return;

    // currentTime이 바뀌었을 때 previewTime을 넘었는지 확인
    // if (embeddedVideoRef.current.currentTime > (previewTime ?? duration)) {
    //   setPlaying(false);
    //   embeddedVideoRef.current.currentTime = previewTime ?? duration;
    //   return;
    // }

    setCurrentTime(embeddedVideoRef.current.currentTime);
  };

  const onEnded = () => {
    if (embeddedVideoRef.current === null) return;
    setEnded(embeddedVideoRef.current.ended);
    setPlaying(false); // video가 끝나면 멈추기
  };

  const onFullscreenChange = () => {
    if (rootRef.current === null) return;
    setFullscreen(document.fullscreenElement === rootRef.current);
  };

  const _onCurrentTimeChange = (currentTime: number) => {
    if (embeddedVideoRef.current === null) return;
    embeddedVideoRef.current.currentTime = currentTime;
  };

  const onVolumeChange = useCallback((volume: number) => {
    if (embeddedVideoRef.current === null) return;
    embeddedVideoRef.current.volume = volume;
    setVolume(volume);
    setMuted(volume === 0);
  }, []);

  const _onSpeedChange = useCallback((speed: string) => {
    if (embeddedVideoRef.current === null) return;
    embeddedVideoRef.current.playbackRate = +speed; // string to number
    setSpeed(speed);
  }, []);

  const togglePlaying = () => {
    setPlaying((oldState) => !oldState);
  };

  const toggleMuted = useCallback(() => {
    setMuted((oldState) => !oldState);
  }, []);

  const toggleFullscreen = () => {
    if (rootRef.current === null) return;
    document.fullscreenElement === rootRef.current
      ? document.exitFullscreen()
      : rootRef.current.requestFullscreen();
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const checkIsMobileView = (): void => {
      if (
        rootRef?.current &&
        rootRef.current.getBoundingClientRect().width <= 500
      ) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    if (rootRef.current) {
      window.addEventListener('resize', checkIsMobileView);
      checkIsMobileView();
    }

    return () => window.removeEventListener('resize', checkIsMobileView);
  }, [rootRef]);

  // 만약 videoRef prop이 있다면 내부 ref 오브젝트를 넘겨줌.
  useEffect(() => {
    if (videoRef) {
      videoRef.current = embeddedVideoRef.current;
    }
  }, [videoRef, embeddedVideoRef.current]);

  useEffect(() => {
    if (embeddedVideoRef.current === null) return;
    playing
      ? embeddedVideoRef.current.play()
      : embeddedVideoRef.current.pause();
  }, [playing, embeddedVideoRef.current]);

  useEffect(() => {
    if (embeddedVideoRef.current === null) return;
    embeddedVideoRef.current.muted = muted;
  }, [muted, embeddedVideoRef.current]);

  useEffect(() => {
    if (embeddedVideoRef.current === null) return;

    // previewTime이 바뀌었을 때 currentTime이 넘었는지 확인
    // if (embeddedVideoRef.current.currentTime <= (previewTime ?? duration)) return;
    // setPlaying(false);
    // embeddedVideoRef.current.currentTime = previewTime ?? duration;
  }, [previewTime, duration, embeddedVideoRef.current]);

  useEffect(() => {
    if (onPlayingChange) onPlayingChange(playing);
  }, [playing]);

  useEffect(() => {
    if (onCurrentTimeChange) onCurrentTimeChange(currentTime);
  }, [currentTime]);

  useEffect(() => {
    if (onSpeedChange) onSpeedChange(+speed); // string to number
  }, [speed]);

  useEffect(() => {
    if (onDurationChange) onDurationChange(duration);
  }, [duration]);

  useEffect(() => {
    if (onEndedChange) onEndedChange(ended);
  }, [ended]);

  return (
    <Root
      ref={rootRef}
      controllerVisible={controllerVisible}
      onMouseEnter={isMobile ? undefined : () => setControllerVisible(true)} // mobile이 아닌 경우 마우스 호버로 컨트롤러 호출
      onMouseLeave={isMobile ? undefined : () => setControllerVisible(false)} // mobile이 아닌 경우 마우스 호버로 컨트롤러 호출
      isMobile={isMobile}
      {...(typeof overrides?.Root?.css === 'string'
        ? { cssStyle: overrides.Root.css, ...(overrides.Root ?? {}) }
        : overrides?.Root == undefined
        ? {}
        : { style: overrides.Root.css, ...(overrides.Root ?? {}) })}>
      <video
        src={src}
        ref={embeddedVideoRef}
        onTimeUpdate={onCurrentTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
        style={{ width: '100%', height: '100%', cursor: 'pointer' }}
        crossOrigin={tracks ? 'anonymous' : undefined}>
        {track ? <track default src={track.src} /> : null}
      </video>
      {isMobile ? (
        <Shadow
          onClick={(event) => {
            if (event.currentTarget === event.target)
              // 자식이 아닌 본인을 클릭했을 때(currentTarget: 이벤트가 발생한 곳, target: 실제 클릭한 곳)
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
            {tracks ? (
              <TracksPopover
                track={track}
                setTrack={setTrack}
                tracks={tracks}
              />
            ) : null}
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
        /> // ProgressBar를 클릭하는 것을 방지
      )}
    </Root>
  );
}
