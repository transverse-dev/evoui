import { Title1, Text, Title2, Divider } from 'components/PageComponents';

export default function IntroductionPage() {
  return (
    <>
      <Title1>Introduction</Title1>
      <Divider />
      <Text>안녕하세요.</Text>
      <Text>
        EvoUI는 세상에서 가장 트렌디하고 세련된 React 컴포넌트 라이브러리입니다.
      </Text>
      <Text>아닐 수도 있습니다.</Text>
      <Title2>Installation</Title2>
      <Text>prerequisite: react 17, styled-components 5</Text>
      <Text>npm i @transverse/evo-ui</Text>
      <Text>
        ThemeProvider로 App을 감싸줘야 App 내의 EvoUI 컴포넌트들에 테마가
        정상적으로 적용됩니다.
      </Text>
      <Text>
        styled-components의 ThemeProvider를 이미 사용하고 있다면 EvoUI
        ThemeProvider로 대체해주세요.
      </Text>
    </>
  );
}
