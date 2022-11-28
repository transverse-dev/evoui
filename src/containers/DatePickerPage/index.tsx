import { Divider, Text, Title1 } from 'components/PageComponents';
import DatePicker from 'evoui/components/DatePicker';

export default function DatePickerPage() {
  const title = () => {
    return <span>공개일</span>;
  };

  return (
    <>
      <Title1>Date Picker</Title1>
      <Divider />
      <Text>Date Picker 컴포넌트입니다.</Text>
      <div style={{ marginTop: '24px' }} />
      <DatePicker
        Title={title}
        startDate={null}
        endDate={null}
        onChange={() => {}}
        isRange
      />
    </>
  );
}
