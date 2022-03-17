import { Text, Title1 } from 'components/PageComponents';
import styled from 'styled-components';

const PageWrapper = styled.div`
  flex-grow: 1;
  padding: 32px 48px;
  background-color: ${(props) => props.theme.colors.pageWrapper.bgColor};

  & ${Text} {
    padding-top: 0.4rem;
    font-size: 0.9rem;
    line-height: 1.2rem;
  }

  & ${Title1} {
    padding-top: 2rem;
    font-size: 2rem;
    font-weight: 600;
  }
`;

export default PageWrapper;
