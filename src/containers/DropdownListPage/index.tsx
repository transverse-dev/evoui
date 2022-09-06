import { Divider, Text, Title1 } from 'components/PageComponents';
import { DropdownList } from 'evoui';

export default function DropdownListPage() {
  return (
    <>
      <Title1>DropdownList</Title1>
      <Divider />
      <Text>드롭다운리스트 컴포넌트입니다.</Text>
      <div style={{ marginTop: '24px' }} />
      <DropdownList />
    </>
  );
}
