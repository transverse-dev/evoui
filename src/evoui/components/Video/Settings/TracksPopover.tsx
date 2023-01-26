import { Popover } from '../../../index';
import { Dispatch, SetStateAction } from 'react';
import { TrackType } from '../video.type';
import MenuItem from './MenuItem';

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
        Root: { css: 'width: 100%;' },
        ButtonWrapper: { css: 'width: 100%' },
      }}
      Button={() => (
        <MenuItem>{`자막: ${track ? track.label : '사용 안 함'}`}</MenuItem>
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
      benchmark='bottom-left'
      direction='top-left'
    />
  );
}
