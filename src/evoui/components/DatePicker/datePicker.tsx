import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ClickAwayListener from '../ClickAwayListener';
import Select from '../Select';

import {
  PropsType,
  RootPropsType,
  TextPropsType,
  DividerPropsType,
  CalendarPropsType,
  CalendarDatePropsType,
  MonthButtonPropsType,
  DayOfWeekTextPropsType,
  WeekTextPropsType,
  WeekTextContainerPropsType,
  RangeTilePropsType,
} from './datePicker.type';

const Root = styled.div<RootPropsType>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: auto;
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
  background-color: ${(props) => props.theme.evoui.colors.datePicker.bgColor};
  ${(props) => props.cssStyle ?? ''};
`;

const DateText = styled.span<TextPropsType>`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.theme.evoui.colors.datePicker.text};
  ${(props) => props.cssStyle ?? ''};
`;

const DefaultDivider = styled.span<DividerPropsType>`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  margin: 0px 8px;
  color: ${(props) => props.theme.evoui.colors.datePicker.text};
  ${(props) => props.cssStyle ?? ''};
`;

const CalendarContainer = styled.div<CalendarPropsType>`
  position: absolute;
  top: 60px;
  left: 0;
  width: 340px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  z-index: 10001;
  background-color: ${(props) =>
    props.theme.evoui.colors.datePicker.calendarBgColor};
  ${(props) => props.cssStyle ?? ''};
`;

const CalendarDate = styled.div<CalendarDatePropsType>`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background-color: ${(props) => props.theme.evoui.colors.datePicker.bgColor};
  ${(props) => props.cssStyle ?? ''};
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const MonthButton = styled.div<MonthButtonPropsType>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 50px;
  height: 50px;
  cursor: pointer;
  rotate: ${(props) => (props.rotate ? '180deg' : '0deg')};
`;

const DayOfWeekContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 40px;
  flex-direction: row;
  background-color: ${(props) => props.theme.evoui.colors.datePicker.bgColor};
`;

const DayOfWeekText = styled.div<DayOfWeekTextPropsType>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 12px;
  padding: 0 20px;
  line-height: 17px;
  width: 32px;
  height: 32px;
  box-sizing: border-box;
  color: ${(props) =>
    props.sunday
      ? props.theme.evoui.colors.datePicker.sundayText
      : props.theme.evoui.colors.datePicker.text};
  background-color: ${(props) => props.theme.evoui.colors.datePicker.bgColor};
`;

const WeekContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 40px;
  padding: 0 20px;
  flex-direction: row;
  background-color: ${(props) =>
    props.theme.evoui.colors.datePicker.calendarBgColor};
`;

const WeekTextContainer = styled.div<WeekTextContainerPropsType>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-align: center;
  width: 42.85px;
  height: 32px;
  font-size: 12px;
  line-height: 17px;
`;

const WeekText = styled.div<WeekTextPropsType>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-align: center;
  width: 32px;
  height: 32px;
  font-size: 12px;
  line-height: 17px;
  border-radius: 50%;
  border: 1px solid transparent;
  z-index: 1;
  color: ${(props) =>
    props.isPast
      ? props.theme.evoui.colors.datePicker.pastColor
      : props.selected
      ? props.theme.evoui.colors.datePicker.selectedText
      : props.sunday
      ? props.theme.evoui.colors.datePicker.sundayText
      : props.theme.evoui.colors.datePicker.text};
  background-color: ${(props) => {
    if (props.selected) {
      return props.theme.evoui.colors.datePicker.dayColor;
    }
    if (props.today) {
      return props.theme.evoui.colors.datePicker.todayBgColor;
    }
  }};
  &:hover {
    border-color: ${(props) =>
      props.isEmpty
        ? 'transparent'
        : props.theme.evoui.colors.datePicker.dayColor};
  }
`;

const RangeTile = styled.div<RangeTilePropsType>`
  height: 32px;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: ${(props) => {
    if (props.startDay && props.endDay) {
      return `transparent`;
    }
    if (props.startDay) {
      return `linear-gradient(
    90deg,
    transparent 50%,
     ${props.theme.evoui.colors.datePicker.rangeColor} 50%)`;
    }
    if (props.endDay) {
      return `linear-gradient(
    90deg,
    ${props.theme.evoui.colors.datePicker.rangeColor} 50%,
     transparent 50%)`;
    }
    return props.theme.evoui.colors.datePicker.rangeColor;
  }};
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

const months = [
  { label: '1', id: '1' },
  { label: '2', id: '2' },
  { label: '3', id: '3' },
  { label: '4', id: '4' },
  { label: '5', id: '5' },
  { label: '6', id: '6' },
  { label: '7', id: '7' },
  { label: '8', id: '8' },
  { label: '9', id: '9' },
  { label: '10', id: '10' },
  { label: '11', id: '11' },
  { label: '12', id: '12' },
];

type ItemType = typeof months[number];

const currentDate = new Date();

const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

const backgroundWidth = 100 / 7;

export default function DatePicker({
  startDate,
  endDate,
  isRange,
  onChange,
  dayOfWeekText,
  Title,
  Divider,
  startText,
  endText,
  overrides,
}: PropsType): JSX.Element {
  const [years, setYears] = useState<ItemType[]>([
    { label: '2022', id: '2022' },
    { label: '2023', id: '2023' },
    { label: '2024', id: '2024' },
  ]);

  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const [currentYear, setCurrentYear] = useState<number>(0);
  const [currentMonth, setCurrentMonth] = useState<number>(0);

  const [calendarVisible, setCalendarVisible] = useState<boolean>(false);

  const [isUnderSelection, setIsUnderSelection] = useState<boolean>(false);

  const [calendarArray, setCalendarArray] = useState<
    { day: number; isRange: boolean }[][]
  >([[]]);

  useEffect(() => {
    const year = years.findIndex(
      (item: ItemType) => item.id === currentDate.getFullYear().toString(),
    );
    setCurrentYear(year);

    const month = months.findIndex(
      (item: ItemType) => item.id === (currentDate.getMonth() + 1).toString(),
    );
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    renderCalendar();
  }, [currentYear, currentMonth, selectedStartDate, selectedEndDate]);

  const handleCalendarVisible = () => {
    setCalendarVisible(!calendarVisible);
  };
  const handleCalendarInvisible = () => {
    setCalendarVisible(false);
  };

  const renderStartDate = () => {
    if (selectedStartDate) {
      const year = selectedStartDate.getFullYear();
      const month =
        selectedStartDate.getMonth() + 1 < 10
          ? `0${selectedStartDate.getMonth() + 1}`
          : selectedStartDate.getMonth() + 1;
      const day = selectedStartDate.getDate();
      return `
        ${year} / ${month} / ${day}
      `;
    } else {
      return startText ?? '시작일';
    }
  };

  const renderEndDate = () => {
    if (selectedEndDate) {
      const year = selectedEndDate.getFullYear();
      const month =
        selectedEndDate.getMonth() + 1 < 10
          ? `0${selectedEndDate.getMonth() + 1}`
          : selectedEndDate.getMonth() + 1;
      const day = selectedEndDate.getDate();
      return `
        ${year} / ${month} / ${day}
      `;
    } else {
      return endText ?? '종료일을 선택하세요.';
    }
  };

  const handleSetStartDate = (day: number) => {
    const newDate = new Date();
    newDate.setFullYear(Number(years[currentYear].id));
    newDate.setMonth(Number(months[currentMonth].id) - 1);
    newDate.setDate(Number(day));
    newDate.setHours(0, 0, 0);

    setSelectedStartDate(newDate);
  };

  const handleSetEndDate = (day: number) => {
    if (isRange) {
      const newDate = new Date();
      newDate.setFullYear(Number(years[currentYear].id));
      newDate.setMonth(Number(months[currentMonth].id) - 1);
      newDate.setDate(Number(day));
      newDate.setHours(23, 59, 59);

      if (selectedStartDate && newDate < selectedStartDate) {
        newDate.setHours(0, 0, 0);
        setSelectedStartDate(newDate);
        setIsUnderSelection(true);
      } else {
        setSelectedEndDate(newDate);
      }
    }
  };

  const handleSelectDate = (day: number) => {
    if (selectedStartDate && isUnderSelection && isRange) {
      setIsUnderSelection(false);
      handleSetEndDate(day);
    } else {
      setSelectedEndDate(null);
      handleSetStartDate(day);
      setIsUnderSelection(true);
    }
  };

  const handleSelectYear = (selected: ItemType) => {
    setCurrentYear(
      years.findIndex((item: ItemType) => item.id === selected.id),
    );
    setCalendarVisible(true);
  };

  const handleSelectMonth = (selected: ItemType) => {
    setCurrentMonth(
      months.findIndex((item: ItemType) => item.id === selected.id),
    );
    setCalendarVisible(true);
  };

  // 다음달로 넘긴다.
  // 12월에서 다음으로 넘기면 1월로 지정하고 년도를 +1 한다
  // 년수가 최대에 도달하면 아무런 동작도 하지 않는다.
  const handleSelectNextMonth = () => {
    if (currentMonth < months.length - 1) {
      setCurrentMonth(currentMonth + 1);
    } else {
      if (currentYear < years.length - 1) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      }
    }
  };

  // 이전달로 넘긴다.
  // 1월에서 이전으로 넘기면 12월로 지정하고 년도를 -1 한다
  // 년수가 최소에 도달하면 아무런 동작도 하지 않는다.
  const handleSelectPrevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth(currentMonth - 1);
    } else {
      if (currentYear > 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      }
    }
  };

  // 달의 총 일수를 가져온다
  const daysInMonth = () => {
    return new Date(
      Number(years[currentYear].id),
      Number(months[currentMonth].id),
      0,
    ).getDate();
  };

  // 달력 데이터를 2차원배열에 생성한다
  const renderCalendar = () => {
    // 선택된 년도, 달을 설정하고 시작요일을 가져오기위해 일수를 1일로 지정한다
    const selectedDate = new Date();
    selectedDate.setFullYear(Number(years[currentYear].id));
    selectedDate.setMonth(Number(months[currentMonth].id) - 1);
    selectedDate.setDate(1);

    // 시작일수를 가져온다
    const startDay = selectedDate.getDay();

    const calendar = [];
    let dayCount = 1; // 1일부터 시작
    const daysOfMonth = daysInMonth(); // 달의 총 일수를 가져온다 (28, 29, 30, 31)

    // 첫 주 부터 시작해 반복문으로 한 주씩 데이터를 삽입한다.
    for (let week = 0; ; week++) {
      const newWeek: { day: number; isRange: boolean }[] = [];
      calendar.push(newWeek); // 한 주 추가
      // 일주일을 (7일) 반목문을 돌려 하루하루씩 추가한다.
      for (let day = 0; day < 7; day++) {
        // dayCount가 달의 총 일수를 넘지않거나 시작일 이상이면 1일부터 삽입한다
        // 그외에는 0
        if (daysOfMonth >= dayCount && (startDay <= day || week !== 0)) {
          calendar[week].push({ day: dayCount, isRange: getIsRange(dayCount) });
          dayCount += 1;
        } else {
          calendar[week].push({ day: 0, isRange: false });
        }
      }
      // 달의 종 일수에 도달하면 더이상 일주일을 추가할 필요가 없으므로 break
      if (daysOfMonth <= dayCount) {
        break;
      }
    }

    setCalendarArray(calendar);
  };

  const getIsRange = (item: number) => {
    if (selectedStartDate && selectedEndDate) {
      const selectedDate = new Date();
      selectedDate.setFullYear(Number(years[currentYear].id));
      selectedDate.setMonth(Number(months[currentMonth].id) - 1);
      selectedDate.setDate(item);

      return (
        selectedStartDate <= selectedDate && selectedDate <= selectedEndDate
      );
    }

    return false;
  };

  const getIsPast = (item: number) => {
    const selectedDate = new Date();
    selectedDate.setFullYear(Number(years[currentYear].id));
    selectedDate.setMonth(Number(months[currentMonth].id) - 1);
    selectedDate.setDate(item);

    return currentDate > selectedDate;
  };

  const getIsSelected = (item: number) => {
    if (
      selectedStartDate?.getFullYear() === Number(years[currentYear].id) &&
      selectedStartDate?.getMonth() + 1 === Number(months[currentMonth].id) &&
      selectedStartDate?.getDate() === item
    ) {
      return true;
    }

    if (
      selectedEndDate?.getFullYear() === Number(years[currentYear].id) &&
      selectedEndDate?.getMonth() + 1 === Number(months[currentMonth].id) &&
      selectedEndDate?.getDate() === item
    ) {
      return true;
    }

    return false;
  };

  const getIsStartDay = (day: number) => {
    if (
      selectedStartDate?.getFullYear() === Number(years[currentYear].id) &&
      selectedStartDate?.getMonth() + 1 === Number(months[currentMonth].id) &&
      selectedStartDate?.getDate() === day
    ) {
      return true;
    } else {
      return false;
    }
  };

  const getIsEndDay = (day: number) => {
    if (
      selectedEndDate?.getFullYear() === Number(years[currentYear].id) &&
      selectedEndDate?.getMonth() + 1 === Number(months[currentMonth].id) &&
      selectedEndDate?.getDate() === day
    ) {
      return true;
    } else {
      return false;
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
      <DateButton onClick={handleCalendarVisible}>
        <DateIcon></DateIcon>
        <DateText>{renderStartDate()}</DateText>
      </DateButton>
      {isRange ? (
        <>
          {Divider !== undefined ? (
            <Divider />
          ) : (
            <DefaultDivider>~</DefaultDivider>
          )}
          <DateButton onClick={handleCalendarVisible}>
            <DateText>{renderEndDate()}</DateText>
          </DateButton>
        </>
      ) : null}
      {calendarVisible ? (
        <ClickAwayListener handleClickAway={handleCalendarInvisible}>
          <CalendarContainer>
            <CalendarDate>
              <MonthButton onClick={handleSelectPrevMonth}>
                <svg
                  width='11'
                  height='20'
                  viewBox='0 0 11 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M9 2L5 6L1.70711 9.29289C1.31658 9.68342 1.31658 10.3166 1.70711 10.7071L9 18'
                    stroke='#DFDFDF'
                    stroke-width='2.5'
                    stroke-linecap='round'
                  />
                </svg>
              </MonthButton>
              <SelectContainer>
                <Select
                  value={years[currentYear]}
                  items={years}
                  onChange={({ selected }) => handleSelectYear(selected)}
                  valueShouldExist
                  overrides={{
                    InputWrapper: {
                      css: `background-color: transparent; width: 90px;`,
                    },
                  }}></Select>
                <Select
                  value={months[currentMonth]}
                  items={months}
                  onChange={({ selected }) => handleSelectMonth(selected)}
                  valueShouldExist
                  overrides={{
                    InputWrapper: {
                      css: `background-color: transparent; width: 70px;`,
                    },
                  }}></Select>
              </SelectContainer>
              <MonthButton rotate onClick={handleSelectNextMonth}>
                <svg
                  width='11'
                  height='20'
                  viewBox='0 0 11 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M9 2L5 6L1.70711 9.29289C1.31658 9.68342 1.31658 10.3166 1.70711 10.7071L9 18'
                    stroke='#DFDFDF'
                    stroke-width='2.5'
                    stroke-linecap='round'
                  />
                </svg>
              </MonthButton>
            </CalendarDate>
            <DayOfWeekContainer>
              {dayOfWeekText
                ? dayOfWeekText.map((item: string, index: number) => {
                    return (
                      <DayOfWeekText sunday={index === 0}>{item}</DayOfWeekText>
                    );
                  })
                : dayOfWeek.map((item: string, index: number) => {
                    return (
                      <DayOfWeekText sunday={index === 0}>{item}</DayOfWeekText>
                    );
                  })}
            </DayOfWeekContainer>
            {calendarArray.map((week: { day: number; isRange: boolean }[]) => {
              return (
                <WeekContainer>
                  {week.map(
                    (
                      item: { day: number; isRange: boolean },
                      index: number,
                    ) => (
                      <WeekTextContainer
                        onClick={() => handleSelectDate(item.day)}>
                        <WeekText
                          sunday={index === 0}
                          isEmpty={item.day !== 0 ? false : true}
                          today={
                            currentDate.getFullYear() ===
                              Number(years[currentYear].id) &&
                            currentDate.getMonth() + 1 ===
                              Number(months[currentMonth].id) &&
                            currentDate.getDate() === item.day
                          }
                          selected={getIsSelected(item.day)}
                          isPast={getIsPast(item.day)}>
                          {item.day !== 0 ? item.day : ''}
                        </WeekText>
                        {item.isRange ? (
                          <RangeTile
                            startDay={getIsStartDay(item.day)}
                            endDay={getIsEndDay(item.day)}
                          />
                        ) : null}
                      </WeekTextContainer>
                    ),
                  )}
                </WeekContainer>
              );
            })}
          </CalendarContainer>
        </ClickAwayListener>
      ) : null}
    </Root>
  );
}
