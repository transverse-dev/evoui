import styled from 'styled-components';
import { VideoType } from './video.type';

const Root = styled.div`
  cursor: pointer;
`;

export default function PlayingButton({
  playing,
  onClick,
  isMobile,
}: VideoType.PlayingButtonType.PropsType) {
  return (
    <Root onClick={onClick}>
      {playing ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height={isMobile ? '64px' : '32px'}
          viewBox='0 0 24 24'
          width={isMobile ? '64px' : '32px'}
          fill='#ffffff'>
          <path d='M0 0h24v24H0z' fill='none' />
          <path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height={isMobile ? '64px' : '32px'}
          viewBox='0 0 24 24'
          width={isMobile ? '64px' : '32px'}
          fill='#ffffff'>
          <path d='M0 0h24v24H0z' fill='none' />
          <path d='M8 5v14l11-7z' />
        </svg>
      )}
    </Root>
  );
}
