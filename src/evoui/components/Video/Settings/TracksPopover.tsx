import { Popover } from '../../../index';
import { Dispatch, SetStateAction } from 'react';
import { TrackType } from '../video.type';
import MenuItem from './MenuItem';

export default function TracksPopover({
  track: selectedTrack,
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
        Root: { css: 'width: 100%;' },
        ButtonWrapper: { css: 'width: 100%' },
      }}
      Button={() => (
        <MenuItem>{`자막: ${
          selectedTrack ? selectedTrack.label : '사용 안 함'
        }`}</MenuItem>
      )}
      items={[
        {
          label: '사용 안 함',
          onClick: () => {
            setTrack(null);
          },
          selected: !selectedTrack,
        },
        ...tracks.map((track) => ({
          label: track.label,
          onClick: () => {
            setTrack(track);
          },
          selected: selectedTrack?.id === track.id,
        })),
      ]}
      benchmark='bottom-left'
      direction='top-left'
    />
  );
}
