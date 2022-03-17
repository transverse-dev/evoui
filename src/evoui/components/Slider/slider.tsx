import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SliderType } from './slider.type';

const Root = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 6px;
  margin-bottom: 12px;
  @media only screen and (max-width: 1168px) {
    margin-left: auto;
    display: flex;
    flex-direction: column;
  }
`;

const Bar = styled.div<any>`
  width: ${(props) => (props.onText ? '80%' : '100%')};
  height: 20px;
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  background-color: ${(props) => props.bgColor ?? '#9e5cfa4e'};
  border-radius: 20px;
  padding: 0 5px 0 0;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.52) inset;

  @media only screen and (max-width: 564px) {
    width: 100%;
  }
`;

const Spot = styled.div<any>`
  z-index: 1;
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 100%;
  cursor: pointer;

  &:hover {
    transform: ${(props) => props.temp || 'scale(1.2)'};
  }
`;

const SelectBar = styled.div<any>`
  background-color: ${(props) =>
    props.fillColor ?? props.theme.colors.universal.accentColor};
  width: calc(${(props) => props.length}%);
  /* width: 50%; */
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-radius: 20px;
  transition-property: width;
  transition-duration: 0.3s;
`;

const SelectSpot = styled.div<any>`
  z-index: 2;
  position: absolute;
  width: 24px;
  height: 24px;
  right: -7px;
  border-radius: 100%;
  background-color: white;
  box-shadow: 0px 0px 7px 2px #0000004b;
`;

const ItemText = styled.div<any>`
  width: 20%;
  font-size: 20px;
  text-align: right;
  padding-right: 10px;
  color: ${(props) =>
    props.textColor ?? props.theme.colors.universal.accentColor};
  @media only screen and (min-width: 565px) and (max-width: 946px) {
    margin-bottom: 22px;
  }
  @media only screen and (max-width: 1168px) {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 9px;
  }
`;

export default function Slider({
  textlist,
  fillColor,
  bgColor,
  textColor,
  stateValues,
  initValue,
  changeValue,
  onChange,
  selected,
  changeClosure,
  onText,
}: SliderType.PropsType) {
  const [sliderIndex, _] = useState(stateValues?.indexOf(initValue));
  const [spotItem, setSpotItem] = useState({
    length: (sliderIndex ?? 0) === -1 ? 0 : sliderIndex,
    item: textlist?.[(sliderIndex ?? 0) === -1 ? 0 : sliderIndex ?? 0] ?? '',
  });

  useEffect(() => {
    if (!selected) {
      setSpotItem({
        length:
          (stateValues?.indexOf(initValue) ?? 0) === -1
            ? 0
            : stateValues?.indexOf(initValue),
        item:
          textlist?.[
            stateValues?.indexOf(initValue ?? 0) === -1
              ? 0
              : stateValues?.indexOf(initValue) ?? 0
          ] ?? '',
      });
      changeClosure?.(false);
    } else {
      setSpotItem({
        length:
          stateValues?.indexOf(changeValue ?? 0) === -1
            ? 0
            : stateValues?.indexOf(changeValue ?? 0),
        item:
          textlist?.[
            stateValues?.indexOf(changeValue ?? 0) === -1
              ? 0
              : stateValues?.indexOf(changeValue ?? 0) ?? 0
          ] ?? '',
      });
      changeClosure?.(true);
    }
  }, [selected, changeValue]);

  return (
    <Root>
      {onText ? (
        <ItemText textColor={textColor}>{spotItem.item}</ItemText>
      ) : (
        <></>
      )}
      <Bar bgColor={bgColor}>
        <Spot style={{ visibility: 'hidden' }} />
        {textlist?.map((item, i) => (
          <Spot
            key={i}
            onClick={() => {
              setSpotItem({ length: i, item: item });
              onChange?.(stateValues?.[i] ?? 0);
            }}
          />
        ))}
        <SelectBar
          fillColor={fillColor}
          length={
            (100 / (textlist?.length ?? 1)) * ((spotItem?.length ?? 1) + 1)
          }>
          <SelectSpot />
        </SelectBar>
      </Bar>
    </Root>
  );
}
