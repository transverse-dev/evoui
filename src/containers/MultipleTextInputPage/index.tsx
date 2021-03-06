import { useState } from 'react';
import { cloneDeep } from 'lodash-es';

import styled from 'styled-components';

import { Input, MultipleTextInput } from 'evoui';

import {
  Divider,
  Text,
  Title1,
  Title2,
  Title3,
} from 'components/PageComponents';

const DEFAULT_STATE_COLORS: Array<{
  state: string;
  fgColor: string;
  bgColor: string;
}> = [
  { state: 'r', fgColor: '#f3d1c5', bgColor: '#ca4b22' },
  { state: 'a', fgColor: '#ca4b22', bgColor: '#f3d1c5' },
  { state: 'i', fgColor: '#ecc12d', bgColor: '#fffae1' },
  { state: 'n', fgColor: '#2d6974', bgColor: '#c7e0c7' },
  { state: 'b', fgColor: '#3571d7', bgColor: '#c9ddf4' },
  { state: 'o', fgColor: '#204cc8', bgColor: '#c2d3f0' },
  { state: 'w', fgColor: '#4c09e2', bgColor: '#d2c5f7' },
];

const StateColorsTable = styled.div`
  display: inline-flex;
  flex-direction: column;
  row-gap: 6px;
  width: 100%;
`;

const StateColorItem = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
`;

const StateColorItemState = styled.div<{ fgColor: string; bgColor: string }>`
  border-radius: 5px;
  padding: 4px 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  color: ${(props) => props.fgColor};
  font-size: 0.875rem;
  white-space: nowrap;
  background-color: ${(props) => props.bgColor};
`;

const StateColorItemColorWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  column-gap: 2px;
`;

const SetItemStateWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 2px;
  width: 100%;
`;

const StateColorsInputOverrides = {
  Root: { css: 'padding: 0; max-width: 100px;' },
  Input: { css: 'width: 100%;' },
};

const SetItemStateInputOverrides = {
  Root: { css: 'padding: 0; width: 280px;' },
};

export default function InputPage(): JSX.Element {
  const [items, setItems] = useState<Array<{ value: string; state: string }>>(
    [],
  );
  const [warnItems, setWarnItems] = useState<
    Array<{ value: string; state: string }>
  >([]);
  const [deduplicationItems, setDeduplicationItems] = useState<
    Array<{ value: string; state: string }>
  >([]);
  const [stateColors, setStateColors] =
    useState<Array<{ state: string; fgColor: string; bgColor: string }>>(
      DEFAULT_STATE_COLORS,
    );
  const [itemConditionalStatement, setItemConditionalStatement] =
    useState<string>('');

  const setItemState = (): string => {
    return DEFAULT_STATE_COLORS[
      Math.floor(Math.random() * DEFAULT_STATE_COLORS.length)
    ].state;
  };

  const onStateColorFgChange = (value: string, state: string): void => {
    let tempStateColors = cloneDeep(stateColors);
    Object.defineProperty(
      tempStateColors.find(
        (tempStateColorItem) => tempStateColorItem.state === state,
      ),
      'fgColor',
      {
        value,
        writable: true,
      },
    );
    setStateColors(tempStateColors);
  };

  const onStateColorBgChange = (value: string, state: string): void => {
    let tempStateColors = cloneDeep(stateColors);
    Object.defineProperty(
      tempStateColors.find(
        (tempStateColorItem) => tempStateColorItem.state === state,
      ),
      'bgColor',
      {
        value,
        writable: true,
      },
    );
    setStateColors(tempStateColors);
  };

  const checkWarnItem = (value: string): string => {
    if (
      itemConditionalStatement.length > 0 &&
      value.includes(itemConditionalStatement)
    ) {
      return 'warn';
    }
    return 'default';
  };

  return (
    <>
      <Title1>MultipleTextInput</Title1>
      <Divider />
      <Text>MultipleTextInput ?????????????????????.</Text>
      <div style={{ marginTop: '24px' }} />
      <MultipleTextInput
        items={items}
        onChange={(items) => setItems(items)}
        setItemState={setItemState}
        overrides={{ Root: { css: 'max-width: 550px;' } }}
      />

      <Title2>Props</Title2>
      <Divider />

      <Title3>placeholder</Title3>
      <Text>placeholder?????????.</Text>
      <Text>??????: string</Text>
      <Text>?????????: ''</Text>
      <div style={{ marginTop: '24px' }} />
      <MultipleTextInput
        items={items}
        placeholder={
          items.length === 0
            ? 'placeholder?????????.(Enter??? Space?????? ????????? ?????? ??????)'
            : 'placeholder?????????.'
        }
        onChange={(items) => setItems(items)}
        setItemState={setItemState}
        overrides={{ Root: { css: 'max-width: 550px;' } }}
      />

      <Title3>stateColors</Title3>
      <Text>value??? state?????? ????????? ????????? ??? ????????????.</Text>
      <Text>
        ??????: Array&#60;&#123; state: string; fgColor: string; bgColor: string
        &#125;&#62;
      </Text>
      <Text>
        ?????????: &#91;&#123; state: 'default', fgColor: '#e7d6fe', bgColor:
        '#555555' &#125;&#93;
      </Text>
      <div style={{ marginTop: '24px' }} />
      <StateColorsTable>
        {stateColors.slice(0, stateColors.length).map((stateColorItem, i) => (
          <StateColorItem key={`${stateColorItem.state}_${i}`}>
            <StateColorItemState
              fgColor={stateColorItem.fgColor}
              bgColor={
                stateColorItem.bgColor
              }>{`State ${stateColorItem.state}`}</StateColorItemState>
            <StateColorItemColorWrapper>
              <p>fgColor:</p>
              <Input
                value={stateColorItem.fgColor}
                placeholder={'#??????'}
                onChange={(event) =>
                  onStateColorFgChange(
                    event.currentTarget.value,
                    stateColorItem.state,
                  )
                }
                overrides={StateColorsInputOverrides}
              />
            </StateColorItemColorWrapper>
            <StateColorItemColorWrapper>
              <p>bgColor:</p>
              <Input
                value={stateColorItem.bgColor}
                placeholder={'#??????'}
                onChange={(event) =>
                  onStateColorBgChange(
                    event.currentTarget.value,
                    stateColorItem.state,
                  )
                }
                overrides={StateColorsInputOverrides}
              />
            </StateColorItemColorWrapper>
          </StateColorItem>
        ))}
      </StateColorsTable>
      <div style={{ marginTop: '24px' }} />
      <MultipleTextInput
        items={items}
        onChange={(items) => setItems(items)}
        stateColors={stateColors}
        setItemState={setItemState}
        overrides={{ Root: { css: 'max-width: 550px;' } }}
      />
      <Title3>setItemState</Title3>
      <Text>
        ?????? ???????????? item??? state??? ????????? ??? ????????????.
        <br />
        ex) if(value === 'number') return 'number'
      </Text>
      <Text>??????: (value: string) =&#62; string(state)</Text>
      <Text>?????????: undefined</Text>
      <div style={{ marginTop: '24px' }} />
      <SetItemStateWrapper>
        <p>if(</p>
        <p>value.includes(</p>
        <Input
          value={itemConditionalStatement}
          placeholder={`state??? 'warn'?????? ????????? ?????? ???????????????`}
          onChange={(event) =>
            setItemConditionalStatement(event.currentTarget.value)
          }
          overrides={SetItemStateInputOverrides}
        />
        <p>) return 'warn'</p>
      </SetItemStateWrapper>
      <div style={{ marginTop: '24px' }} />
      <MultipleTextInput
        items={warnItems}
        onChange={(items) => setWarnItems(items)}
        stateColors={[
          { state: 'warn', fgColor: '#fffae1', bgColor: '#ecc12d' },
        ]}
        setItemState={checkWarnItem}
        overrides={{ Root: { css: 'max-width: 550px;' } }}
      />
      <Title3>options</Title3>
      <Text>
        optiions??? ????????? ??? ????????????.
        <br />
        'deduplication': ???????????? ???????????????.
      </Text>
      <Text>??????: Array&#60;'deduplication'&#62;</Text>
      <Text>?????????: undefined</Text>
      <div style={{ marginTop: '24px' }} />
      <MultipleTextInput
        items={deduplicationItems}
        placeholder={
          deduplicationItems.length === 0
            ? '???????????? ????????? ???????????????.'
            : undefined
        }
        onChange={(items) => setDeduplicationItems(items)}
        options={['deduplication']}
        overrides={{ Root: { css: 'max-width: 550px;' } }}
      />
    </>
  );
}
