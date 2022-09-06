import { Divider, Text, Title1 } from 'components/PageComponents';
import { Button, DropdownList, Input, sendToast, ToastType } from 'evoui';
import { useState } from 'react';

type ToastTypeOptionType = typeof TOAST_TYPE_OPTIONS[number];
type ToastDurationOptionType = typeof TOAST_DURATION_OPTIONS[number];

const TOAST_TYPE_OPTIONS = [
  { label: 'info' as const, id: 'info' as const },
  { label: 'success' as const, id: 'success' as const },
  { label: 'warning' as const, id: 'warning' as const },
  { label: 'error' as const, id: 'error' as const },
];
const TOAST_DURATION_OPTIONS = [
  { label: 'duration(ms): 500', id: 500 },
  { label: 'duration(ms): 3000', id: 3000 },
  { label: 'duration(ms): 5000', id: 5000 },
  { label: 'duration(ms): 10000', id: 10000 },
  { label: 'duration(ms): 20000', id: 20000 },
];

export default function ToastPage() {
  const [title, setTitle] = useState('title입니다.');
  const [content, setContent] = useState('content입니다.');
  const [toastTypeOption, setToastTypeOption] = useState<ToastTypeOptionType>(
    TOAST_TYPE_OPTIONS[0],
  );
  const [toastDurationOption, setToastDurationOption] =
    useState<ToastDurationOptionType>(TOAST_DURATION_OPTIONS[1]);

  const doToast = (
    title: string,
    content: string,
    type: ToastType,
    duration: number = 7000,
  ) => {
    sendToast({
      title,
      content,
      type,
      duration,
      closable: true,
    });
  };
  const submit = () => {
    doToast(title, content, toastTypeOption.id, toastDurationOption.id);
  };

  return (
    <>
      <Title1>Toast</Title1>
      <Divider />
      <Text>Toast 컴포넌트입니다.</Text>
      <div style={{ marginTop: '24px' }} />
      <Input
        placeholder='title'
        value={title}
        onChange={(value) => {
          setTitle(value);
        }}
      />
      <div style={{ marginTop: '24px' }} />
      <Input
        placeholder='content'
        value={content}
        onChange={(value) => {
          setContent(value);
        }}
      />
      <div style={{ marginTop: '24px' }} />
      <DropdownList
        options={TOAST_TYPE_OPTIONS}
        value={toastTypeOption}
        onChange={(option) =>
          setToastTypeOption(option as typeof TOAST_TYPE_OPTIONS[number])
        } // TODO: popover처럼 generic 타입을 사용하도록 해야함.
      />
      <div style={{ marginTop: '24px' }} />
      <DropdownList
        options={TOAST_DURATION_OPTIONS}
        value={toastDurationOption}
        onChange={(option) =>
          setToastDurationOption(
            option as typeof TOAST_DURATION_OPTIONS[number],
          )
        } // TODO: popover처럼 generic 타입을 사용하도록 해야함.
        overrides={{ Root: { css: 'width: 160px;' } }}
      />
      <div style={{ marginTop: '24px' }} />
      <Button onClick={submit}>Toast</Button>
    </>
  );
}
