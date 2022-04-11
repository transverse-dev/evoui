import { Title1, Text, Divider } from 'components/PageComponents';

export default function ReleasePage() {
  return (
    <>
      <Title1>Release</Title1>
      <Divider />
      <Text>Latest version: v{require('../../../package.json').version}</Text>
    </>
  );
}
