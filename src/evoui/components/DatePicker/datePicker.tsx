import styled from 'styled-components';

import {
  PropsType,
  RootPropsType,
  TextPropsType,
  DividerPropsType,
} from './datePicker.type';

const Root = styled.div<RootPropsType>`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  ${(props) => props.cssStyle ?? ''};
`;

const DateButton = styled.div<RootPropsType>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 15px;
  height: 50px;
  width: 180px;
  cursor: pointer;
  background-color: ${(props) => props.theme.evoui.colors.datePicker.bgColor}
    ${(props) => props.cssStyle ?? ''};
`;

const DateText = styled.span<TextPropsType>`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.theme.evoui.colors.datePicker.text}
    ${(props) => props.cssStyle ?? ''};
`;

const DefaultDivider = styled.span<DividerPropsType>`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  margin: 0px 8px;
  color: ${(props) => props.theme.evoui.colors.datePicker.text}
    ${(props) => props.cssStyle ?? ''};
`;

const DateIcon = () => {
  return (
    <svg
      width='18'
      height='20'
      viewBox='0 0 18 20'
      fill='none'
      style={{ marginRight: '10px' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M4.65 12.15C4.36667 12.15 4.12917 12.0542 3.9375 11.8625C3.74583 11.6708 3.65 11.4333 3.65 11.15C3.65 10.8667 3.74583 10.6292 3.9375 10.4375C4.12917 10.2458 4.36667 10.15 4.65 10.15C4.93333 10.15 5.17083 10.2458 5.3625 10.4375C5.55417 10.6292 5.65 10.8667 5.65 11.15C5.65 11.4333 5.55417 11.6708 5.3625 11.8625C5.17083 12.0542 4.93333 12.15 4.65 12.15ZM9.075 12.15C8.79167 12.15 8.55417 12.0542 8.3625 11.8625C8.17083 11.6708 8.075 11.4333 8.075 11.15C8.075 10.8667 8.17083 10.6292 8.3625 10.4375C8.55417 10.2458 8.79167 10.15 9.075 10.15C9.35833 10.15 9.59583 10.2458 9.7875 10.4375C9.97917 10.6292 10.075 10.8667 10.075 11.15C10.075 11.4333 9.97917 11.6708 9.7875 11.8625C9.59583 12.0542 9.35833 12.15 9.075 12.15ZM13.325 12.15C13.0417 12.15 12.8042 12.0542 12.6125 11.8625C12.4208 11.6708 12.325 11.4333 12.325 11.15C12.325 10.8667 12.4208 10.6292 12.6125 10.4375C12.8042 10.2458 13.0417 10.15 13.325 10.15C13.6083 10.15 13.8458 10.2458 14.0375 10.4375C14.2292 10.6292 14.325 10.8667 14.325 11.15C14.325 11.4333 14.2292 11.6708 14.0375 11.8625C13.8458 12.0542 13.6083 12.15 13.325 12.15ZM1.5 20C1.1 20 0.75 19.85 0.45 19.55C0.15 19.25 0 18.9 0 18.5V3C0 2.6 0.15 2.25 0.45 1.95C0.75 1.65 1.1 1.5 1.5 1.5H3.125V0H4.75V1.5H13.25V0H14.875V1.5H16.5C16.9 1.5 17.25 1.65 17.55 1.95C17.85 2.25 18 2.6 18 3V18.5C18 18.9 17.85 19.25 17.55 19.55C17.25 19.85 16.9 20 16.5 20H1.5ZM1.5 18.5H16.5V7.75H1.5V18.5ZM1.5 6.25H16.5V3H1.5V6.25ZM1.5 6.25V3V6.25Z'
        fill='#555555'
      />
    </svg>
  );
};

export default function DatePicker({
  startDate,
  endDate,
  isRange,
  onChange,
  Title,
  Divider,
  overrides,
}: PropsType): JSX.Element {
  const renderStartDate = () => {
    if (startDate) {
    } else {
      return '시작일';
    }
  };

  const renderEndDate = () => {
    if (endDate) {
    } else {
      return '종료일을 선택하세요.';
    }
  };

  return (
    <Root
      {...(overrides?.Root === undefined
        ? {}
        : typeof overrides?.Root?.css === 'string'
        ? {
            cssStyle: overrides.Root.css,
            ...(overrides.Root ?? {}),
          }
        : {
            style: overrides.Root.css,
            ...overrides.Root,
          })}>
      {Title !== undefined ? <Title /> : null}
      <DateButton>
        <DateIcon></DateIcon>
        <DateText>{renderStartDate()}</DateText>
      </DateButton>
      {Divider !== undefined ? <Divider /> : <DefaultDivider>~</DefaultDivider>}
      {isRange ? (
        <DateButton>
          <DateIcon></DateIcon>
          <DateText>{renderEndDate()}</DateText>
        </DateButton>
      ) : null}
    </Root>
  );
}
