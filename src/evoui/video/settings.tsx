import { Button } from "./button";
import { PopoverMenu } from "../popovermenu";
import { VideoType } from "./index.type";
import { memo } from "react";
import styled from "styled-components";

const Root = styled.div``;

export const Settings = memo(
  ({
    speed,
    onSpeedChange,
    isMobile,
    muted,
    toggleMuted,
    volume,
    onVolumeChange,
  }: VideoType.SettingsType.PropsType) => {
    return (
      <Root>
        <PopoverMenu
          Button={() => {
            return (
              <Button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  height={`${22 * (isMobile ? 0.8 : 1)}px`}
                  viewBox="0 0 24 24"
                  width={`${22 * (isMobile ? 0.8 : 1)}px`}
                  fill="#ffffff"
                >
                  <g>
                    <path d="M0,0h24v24H0V0z" fill="none" />
                    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
                  </g>
                </svg>
              </Button>
            );
          }}
          items={
            isMobile
              ? [
                  {
                    label: (
                      <PopoverMenu
                        Button={() => (
                          <div
                            style={{
                              cursor: "pointer",
                            }}
                          >{`재생 속도 ${speed}배`}</div>
                        )}
                        items={[
                          {
                            label: "재생 속도 0.5배",
                            onClick: () => onSpeedChange("0.5"),
                          },
                          {
                            label: "재생 속도 1.0배",
                            onClick: () => onSpeedChange("1.0"),
                          },
                          {
                            label: "재생 속도 1.5배",
                            onClick: () => onSpeedChange("1.5"),
                          },
                          {
                            label: "재생 속도 2.0배",
                            onClick: () => onSpeedChange("2.0"),
                          },
                        ]}
                        location="top-end"
                      />
                    ),
                  },
                  {
                    label: (
                      <PopoverMenu
                        Button={() => (
                          <div
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            {muted ? "무음 모드" : `소리 ${volume * 100}%`}
                          </div>
                        )}
                        items={[
                          {
                            label: muted ? "무음 모드 해제" : "무음 모드",
                            onClick: () => toggleMuted(),
                          },
                          {
                            label: "소리 25%",
                            onClick: () => onVolumeChange(0.25),
                          },
                          {
                            label: "소리 50%",
                            onClick: () => onVolumeChange(0.5),
                          },
                          {
                            label: "소리 75%",
                            onClick: () => onVolumeChange(0.75),
                          },
                          {
                            label: "소리 100%",
                            onClick: () => onVolumeChange(1),
                          },
                        ]}
                        location="top-end"
                      />
                    ),
                  },
                ]
              : [
                  {
                    label: (
                      <PopoverMenu
                        Button={() => <Button>{`재생 속도 ${speed}배`}</Button>}
                        items={[
                          {
                            label: "재생 속도 0.5배",
                            onClick: () => onSpeedChange("0.5"),
                          },
                          {
                            label: "재생 속도 1.0배",
                            onClick: () => onSpeedChange("1.0"),
                          },
                          {
                            label: "재생 속도 1.5배",
                            onClick: () => onSpeedChange("1.5"),
                          },
                          {
                            label: "재생 속도 2.0배",
                            onClick: () => onSpeedChange("2.0"),
                          },
                        ]}
                        location="top-end"
                      />
                    ),
                  },
                ]
          }
          location="top-end"
          overrides={{
            MenuItem: { css: { overflow: "visible" } },
            MenuList: { css: { overflow: "visible" } },
            MenuListWrapper: { css: { overflow: "visible" } },
          }}
        />
      </Root>
    );
  }
);
