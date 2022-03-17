import styled from 'styled-components';

const Root = styled.div`
  padding: 32px;
  background-color: ${(props) => props.theme.colors.footer.bgColor};
`;

export default function Footer() {
  const openCompanyWebsite = () => {
    window.open('https://evoclass.ai/company', '_blank');
  };
  return (
    <Root>
      <div
        style={{
          cursor: 'pointer',
          textDecoration: 'underline',
          fontSize: '0.8rem',
          fontWeight: 300,
        }}
        onClick={openCompanyWebsite}>
        transverse
      </div>
    </Root>
  );
}
