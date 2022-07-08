import { Divider, Text, Title1, Title2 } from 'components/PageComponents';
import Input from 'evoui/components/Input';
import { useState } from 'react';

export default function InputPage() {
  const [value, setValue] = useState('');

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
      <Divider />
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
      <Divider />
      <Text>type</Text>
      <Text>포맷을 결정합니다.</Text>
      <Text>타입: 'text' | 'password'</Text>
      <Text>기본값: 'text'</Text>
      <div style={{ marginTop: '24px' }} />
      <Input
        type='password'
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        overrides={{ Root: { css: 'max-width: 550px;' } }}
      />
    </>
  );
}
