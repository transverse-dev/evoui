import { Divider, Text, Title1, Title2 } from 'components/PageComponents';
import { DropdownList } from 'evoui';
import Input from 'evoui/components/Input';
import { useEffect, useState } from 'react';

export default function InputPage() {
  const inputTypes = [
    { label: 'text' as const, id: 'text' as const },
    { label: 'password' as const, id: 'password' as const },
    { label: 'email' as const, id: 'email' as const },
    { label: 'number' as const, id: 'number' as const },
  ];
  const maxLengths = [
    { label: 'maxLength: 4', id: 4 },
    { label: 'maxLength: 5', id: 5 },
    { label: 'maxLength: 8', id: 8 },
    { label: 'maxLength: 20', id: 20 },
  ];

  const [value, setValue] = useState('');
  const [maxLengthInputValue, setMaxLengthInputValue] = useState('');
  const [inputType, setInputType] = useState(inputTypes[0]);
  const [maxLength, setMaxLength] = useState(maxLengths[0]);

  useEffect(() => {
    setMaxLengthInputValue('');
  }, [maxLength]);

  return (
    <>
      <Title1>Input</Title1>
      <Divider />
      <Text>Input 컴포넌트입니다.</Text>
      <div style={{ marginTop: '24px' }} />
      <Input
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        overrides={{ Root: { css: 'max-width: 550px;' } }}
      />

      <Title2>Props</Title2>
      <Divider />

      <Text>type</Text>
      <Text>포맷을 결정합니다.</Text>
      <Text>타입: 'text' | 'password'</Text>
      <Text>기본값: 'text'</Text>
      <div style={{ marginTop: '24px' }} />
      <DropdownList
        options={inputTypes}
        value={inputType}
        onChange={(option) => setInputType(option as typeof inputTypes[number])} // TODO: popover처럼 generic 타입을 사용하도록 해야함.
      />
      <div style={{ marginTop: '24px' }} />
      <Input
        type={inputType.id}
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        overrides={{ Root: { css: 'max-width: 550px;' } }}
      />

      <div style={{ marginTop: '24px' }} />
      <Text>placeholder</Text>
      <Text>placeholder입니다.</Text>
      <Text>타입: string</Text>
      <Text>기본값: ''</Text>
      <div style={{ marginTop: '24px' }} />
      <Input
        placeholder='placeholder입니다.'
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        overrides={{ Root: { css: 'max-width: 550px;' } }}
      />

      <div style={{ marginTop: '24px' }} />
      <Text>isClearable</Text>
      <Text>
        값을 입력하면 입력한 값을 한 번에 지울 수 있는 버튼이 우측에 나타납니다.
      </Text>
      <Text>타입: boolean</Text>
      <Text>기본값: false</Text>
      <div style={{ marginTop: '24px' }} />
      <Input
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        isClearable
        overrides={{ Root: { css: 'max-width: 550px;' } }}
      />

      <div style={{ marginTop: '24px' }} />
      <Text>isError</Text>
      <Text>빨갛게 변합니다.</Text>
      <Text>타입: boolean</Text>
      <Text>기본값: false</Text>
      <div style={{ marginTop: '24px' }} />
      <Input
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        isError
        overrides={{ Root: { css: 'max-width: 550px;' } }}
      />

      <div style={{ marginTop: '24px' }} />
      <Text>maxLength</Text>
      <Text>입력할 수 있는 최대 글자수를 설정합니다.</Text>
      <Text>타입: number</Text>
      <Text>기본값: 없음</Text>
      <div style={{ marginTop: '24px' }} />
      <DropdownList
        options={maxLengths}
        value={maxLength}
        onChange={(option) => setMaxLength(option as typeof maxLengths[number])} // TODO: popover처럼 generic 타입을 사용하도록 해야함.
        overrides={{ Root: { css: 'width: 150px;' } }}
      />
      <div style={{ marginTop: '24px' }} />
      <Input
        value={maxLengthInputValue}
        onChange={(event) => setMaxLengthInputValue(event.currentTarget.value)}
        maxLength={maxLength.id}
        overrides={{ Root: { css: 'max-width: 550px;' } }}
      />

      <div style={{ marginTop: '24px' }} />
    </>
  );
}
