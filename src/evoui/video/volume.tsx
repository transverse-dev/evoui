import { Button } from './button';
import { VideoType } from './index.type';
import styled from 'styled-components';

const Root = styled.div`
  display: flex;
  align-items: center;

  // 나중에 props로 관리
  /* &:hover > div:last-child {
    // VolumeContainer
    width: 64px;
  } */
`;

const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 64px;
  height: 16px;
  overflow: hidden;
  transition: 0.2s;
`;

const Input = styled.input`
  display: block;
  position: absolute;
  left: 1px; // 1px 오차가 있음
  width: calc(100% - 1px); // 1px 오차가 있음
  height: 4px;
  appearance: none;
  background-color: #00000000;
  cursor: pointer;

  &::-webkit-slider-thumb {
    width: 14px;
    height: 14px;
    background-color: #ffffff;
    border-radius: 50%;
    appearance: none;
  }
`;

const VolumeBarWrapper = styled.div`
  position: absolute;
  left: 1px; // 1px 오차가 있음
  width: calc(100% - 1px); // 1px 오차가 있음
  height: 4px;
  background-color: #ffffff40;
  border-radius: 2px;
  overflow: hidden;
`;

const VolumeBar = styled.div<VideoType.VolumeType.VolumeBarPropsType>`
  width: ${(props) => props.progress}%;
  height: 100%;
  background-color: #ffffff;
`;

export function Volume({
  muted,
  toggleMuted,
  volume,
  onVolumeChange,
}: VideoType.VolumeType.PropsType) {
  return (
    <Root>
      <Button onClick={toggleMuted}>
        {muted ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='22px'
            viewBox='0 0 24 24'
            width='22px'
            fill='#ffffff'>
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z' />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='22px'
            viewBox='0 0 24 24'
            width='22px'
            fill='#ffffff'>
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z' />
          </svg>
        )}
      </Button>
      <div style={{ marginLeft: '8px' }} />
      <VolumeContainer>
        <VolumeBarWrapper>
          <VolumeBar progress={muted ? 0 : volume * 100} />
        </VolumeBarWrapper>
        <Input
          type='range'
          min={0}
          max={1}
          step={0.1}
          value={muted ? 0 : volume}
          onChange={(event) => {
            onVolumeChange(
              +event.target.value, // string to number
            );
          }}
        />
      </VolumeContainer>
    </Root>
  );
}
