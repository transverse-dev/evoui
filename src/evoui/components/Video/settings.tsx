import { memo } from 'react';
import styled from 'styled-components';
import Popover from '../Popover';
import { VideoType } from './video.type';

const SettingButton = styled.button<VideoType.SettingsType.SettingButtonPropsType>`
  margin: 0;
  border: 0;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  cursor: pointer;

  > svg {
    width: ${(props) => `${22 * (props.isMobile ? 0.8 : 1)}px`};
    height: ${(props) => `${22 * (props.isMobile ? 0.8 : 1)}px`};
    fill: #ffffff;
    transition: transform ease-in-out 200ms;
  }

  &:hover,
  &:focus {
    > svg {
      transform: rotate(60deg);
    }
  }
`;

const MenuItem = styled.div`
  padding: 8px 12px;
  color: ${(props) => props.theme.evoui.colors.video.fgColor};
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: transparent;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  transition: all ease-in-out 200ms;

  &:hover {
    background-color: ${(props) =>
      props.theme.evoui.colors.video.hoverBgColor};
  }
`;

const Settings = memo(
  ({
    isMobile,
    speed,
    onSpeedChange,
    volume,
    onVolumeChange,
    muted,
    toggleMuted,
  }: VideoType.SettingsType.PropsType) => {
    return (
      <Popover
        overrides={{
          Menu: {
            css: `
              overflow: visible;
            `,
          },
        }}
        Button={() => {
          return (
            <SettingButton isMobile={!!isMobile}>
              <svg viewBox='0 0 24 24'>
                <g>
                  <path d='M0,0h24v24H0V0z' fill='none' />
                  <path d='M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z' />
                </g>
              </svg>
            </SettingButton>
          );
        }}
        items={
          isMobile
            ? [
                <Popover
                  Button={() => <MenuItem>{`재생 속도 ${speed}배`}</MenuItem>}
                  items={[
                    {
                      label: '재생 속도 0.5배',
                      onClick: () => onSpeedChange('0.5'),
                    },
                    {
                      label: '재생 속도 1.0배',
                      onClick: () => onSpeedChange('1.0'),
                    },
                    {
                      label: '재생 속도 1.5배',
                      onClick: () => onSpeedChange('1.5'),
                    },
                    {
                      label: '재생 속도 2.0배',
                      onClick: () => onSpeedChange('2.0'),
                    },
                  ]}
                  benchmark='bottom-left'
                  direction='top-left'
                />,
                <Popover
                  Button={() => (
                    <MenuItem>
                      {muted ? '무음 모드' : `소리 ${volume * 100}%`}
                    </MenuItem>
                  )}
                  items={[
                    {
                      label: muted ? '무음 모드 해제' : '무음 모드',
                      onClick: () => toggleMuted(),
                    },
                    {
                      label: '소리 25%',
                      onClick: () => onVolumeChange(0.25),
                    },
                    {
                      label: '소리 50%',
                      onClick: () => onVolumeChange(0.5),
                    },
                    {
                      label: '소리 75%',
                      onClick: () => onVolumeChange(0.75),
                    },
                    {
                      label: '소리 100%',
                      onClick: () => onVolumeChange(1),
                    },
                  ]}
                  benchmark='bottom-left'
                  direction='top-left'
                />,
              ]
            : [
                <Popover
                  Button={() => <MenuItem>{`재생 속도 ${speed}배`}</MenuItem>}
                  items={[
                    {
                      label: '재생 속도 0.5배',
                      onClick: () => onSpeedChange('0.5'),
                    },
                    {
                      label: '재생 속도 1.0배',
                      onClick: () => onSpeedChange('1.0'),
                    },
                    {
                      label: '재생 속도 1.5배',
                      onClick: () => onSpeedChange('1.5'),
                    },
                    {
                      label: '재생 속도 2.0배',
                      onClick: () => onSpeedChange('2.0'),
                    },
                  ]}
                  benchmark='bottom-left'
                  direction='top-left'
                />,
              ]
        }
        benchmark='top-right'
        direction='top-left'
      />
    );
  },
);

export default Settings;
