import { Divider, Text, Title1 } from 'components/PageComponents';
import { Button } from '@transverse/evo-ui';

export default function ButtonPage() {
  return (
    <>
      <Title1>Button</Title1>
      <Divider />
      <Text>버튼 컴포넌트입니다.</Text>
      <div style={{ marginTop: '24px' }} />
      <Button>Submit</Button>
      <div style={{ marginTop: '24px' }} />
      <Button kind='secondary'>Submit</Button>
      <div style={{ marginTop: '24px' }} />
      <Button kind='tertiary'>Submit</Button>
      <div style={{ marginTop: '24px' }} />
      <Button disabled>Submit</Button>
    </>
  );
}
