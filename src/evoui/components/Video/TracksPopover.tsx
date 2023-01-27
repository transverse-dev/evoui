import { Dispatch, SetStateAction } from 'react';

import styled from 'styled-components';

import { TrackType } from './video.type';
import { Popover } from '../../index';

const SubtitleButton = styled.button<{ isOn: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 16px;
  cursor: pointer;

  > svg {
    width: 100%;
    fill: #fafafa;
    opacity: ${(props) => (props.isOn ? '1' : '0.3')};
    transition: all ease-in-out 200ms;
  }
`;

export default function TracksPopover({
  track,
  setTrack,
  tracks,
}: {
  track: TrackType | null;
  setTrack: Dispatch<SetStateAction<TrackType | null>>;
  tracks: TrackType[];
}) {
  return (
    <Popover
      overrides={{
        Root: {
          css: `
            margin-right: 16px;
          `,
        },
      }}
      Button={() => (
        <SubtitleButton isOn={!!track}>
          <svg viewBox='0 0 20 16'>
            <path d='M4 8.25H5.5V6.75H4V8.25ZM4 11.25H13V9.75H4V11.25ZM14.5 11.25H16V9.75H14.5V11.25ZM7 8.25H16V6.75H7V8.25ZM1.5 16C1.1 16 0.75 15.85 0.45 15.55C0.15 15.25 0 14.9 0 14.5V1.5C0 1.1 0.15 0.75 0.45 0.45C0.75 0.15 1.1 0 1.5 0H18.5C18.9 0 19.25 0.15 19.55 0.45C19.85 0.75 20 1.1 20 1.5V14.5C20 14.9 19.85 15.25 19.55 15.55C19.25 15.85 18.9 16 18.5 16H1.5Z' />
          </svg>
        </SubtitleButton>
      )}
      items={[
        {
          label: '사용 안 함',
          onClick: () => {
            setTrack(null);
          },
          selected: !track,
        },
        ...tracks.map((trackItem) => ({
          label: trackItem.label,
          onClick: () => {
            setTrack(trackItem);
          },
          selected: track?.id === trackItem.id,
        })),
      ]}
      benchmark='top-right'
      direction='top-left'
      position={{
        x: 0,
        y: 6,
      }}
    />
  );
}
