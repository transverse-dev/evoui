import { Divider, Text, Title1 } from 'components/PageComponents';
import DatePicker from 'evoui/components/DatePicker';

export default function DatePickerPage() {
  const title = () => {
    return <span style={{ marginRight: '10px' }}>왕복</span>;
  };

  const title2 = () => {
    return <span style={{ marginRight: '10px' }}>편도</span>;
  };

  return (
    <>
      <Title1>Date Picker</Title1>
      <Divider />
      <Text>Date Picker 컴포넌트입니다.</Text>
      <div style={{ marginTop: '24px' }} />
      <DatePicker
        startDate={null}
        endDate={null}
        startText='출발'
        endText='도착'
        onChange={() => {}}
        isRange
      />
      <div style={{ marginTop: '24px' }} />
      <DatePicker
        startDate={null}
        endDate={null}
        startText='출발'
        onChange={() => {}}
      />
      <div style={{ marginTop: '24px' }} />
      <DatePicker
        Title={title}
        startDate={null}
        endDate={null}
        startText='출발'
        endText='도착'
        onChange={() => {}}
        isRange
      />
      <div style={{ marginTop: '24px' }} />
      <DatePicker
        Title={title2}
        startDate={null}
        endDate={null}
        startText='출발'
        onChange={() => {}}
      />
    </>
  );
}
