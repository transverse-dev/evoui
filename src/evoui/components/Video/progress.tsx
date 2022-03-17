import styled from 'styled-components';
import { VideoType } from './video.type';

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8px;
`;

const Background = styled.div<VideoType.ProgressType.BackgroundPropsType>`
  width: calc(
    100% - 16px
  ); // thumb이 input 내부에서만 움직임. 그래서 thumb width만큼 빼줘야 자연스러움.
  height: 4px;
  background-color: #ffffff40;
  border-radius: 2px;
  transition: 0.2s;

  ${(props) =>
    props.isMobile
      ? ''
      : `
  &:hover {
    height: 8px;
    border-radius: 4px;
  }
  &:hover > div {
    // Preview
    border-radius: 4px;
  }
  &:hover > div > div {
    // ProgressBarWrapper
    border-radius: 4px;
  }
  `}
`;

const Preview = styled.div<VideoType.ProgressType.PreviewPropsType>`
  position: relative;
  width: ${(props) => props.progress}%;
  height: 100%;
  background-color: #9f5cfa40;
  border-radius: 2px;
  transition: 0.2s;
`;

const Input = styled.input<VideoType.ProgressType.InputPropsType>`
  display: block;
  position: absolute;

  // thumb이 input 내부에서만 움직임. 그래서 thumb width만큼 빼줘야 자연스러움.
  left: ${(props) => (props.isMobile ? '-5px' : '-8px')};
  width: ${(props) =>
    props.isMobile ? 'calc(100% + 10px)' : 'calc(100% + 16px)'};

  height: 100%;
  background-color: #00000000;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    width: ${(props) => (props.isMobile ? '10px' : '16px')};
    height: ${(props) => (props.isMobile ? '10px' : '16px')};
    background-color: #9f5cfa;
    border-radius: 50%;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    ${(props) => (props.isMobile ? '' : 'transform: scale(0);')}
    transition: 0.2s;
  }
  ${(props) =>
    props.isMobile
      ? ''
      : `
  &:hover::-webkit-slider-thumb {
    transform: scale(1);
  }
  `}
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 2px;
  transition: 0.2s;
  overflow: hidden;
`;

const ProgressBar = styled.div<VideoType.ProgressType.ProgressBarPropsType>`
  width: ${(props) => props.progress}%;
  height: 100%;
  background-color: #9f5cfa;
`;

export default function Progress({
  duration,
  currentTime,
  previewTime,
  onChange,
  isMobile,
}: VideoType.ProgressType.PropsType) {
  return (
    <Root>
      <Background isMobile={isMobile}>
        <Preview progress={duration > 0 ? (previewTime / duration) * 100 : 0}>
          <Input
            type='range'
            min={0}
            max={Math.floor(previewTime)}
            value={Math.floor(currentTime)}
            onChange={onChange}
            isMobile={isMobile}
          />
          <ProgressBarWrapper>
            <ProgressBar
              progress={
                Math.floor(previewTime) > 0
                  ? (Math.floor(currentTime) / Math.floor(previewTime)) * 100
                  : 0
              }
            />
          </ProgressBarWrapper>
        </Preview>
      </Background>
    </Root>
  );
}
