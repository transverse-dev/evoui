import { Text, Title1 } from 'components/PageComponents';
import { Button } from 'evoui';

export default function ButtonPage() {
  return (
    <>
      <Title1>Button</Title1>
      <Text>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout.
      </Text>
      <Text>
        The point of using Lorem Ipsum is that it has a more-or-less normal
        distribution of letters, as opposed to using 'Content here, content
        here', making it look like readable English.
      </Text>
      <Text>
        Many desktop publishing packages and web page editors now use Lorem
        Ipsum as their default model text, and a search for 'lorem ipsum' will
        uncover many web sites still in their infancy.
      </Text>
      <div style={{ marginTop: '32px' }} />
      <Button>클릭하기</Button>
      <div style={{ marginTop: '32px' }} />
      <Button kind='secondary'>클릭하기</Button>
      <div style={{ marginTop: '32px' }} />
      <Button kind='tertiary'>클릭하기</Button>
      <div style={{ marginTop: '32px' }} />
      <Button disabled>클릭하기</Button>
    </>
  );
}
