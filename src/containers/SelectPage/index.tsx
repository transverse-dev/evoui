import { Divider, Text, Title1 } from 'components/PageComponents';
import { Select } from 'evoui';
import { useState } from 'react';

const items = [
  { label: '사과', id: 'apple' },
  { label: '버섯', id: 'mushroom' },
  { label: '당근', id: 'carrot' },
];
type ItemType = typeof items[number];

export default function SelectPage() {
  const [value, setValue] = useState<ItemType>(items[0]);

  return (
    <>
      <Title1>Select</Title1>
      <Divider />
      <Text>Select 컴포넌트입니다.</Text>
      <div style={{ marginTop: '24px' }} />
      <Select
        value={value}
        items={items}
        onChange={({ selected }) => setValue(selected)}
        valueShouldExist
      />
    </>
  );
}
