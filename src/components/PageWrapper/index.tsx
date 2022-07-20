import {
  Divider,
  Text,
  Title1,
  Title2,
  Title3,
} from 'components/PageComponents';
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

  & ${Title2} {
    padding-top: 1.6rem;
    font-size: 1.6rem;
    font-weight: 500;
  }

  & ${Title3} {
    padding-top: 1.25rem;
    font-size: 1.25rem;
    font-weight: 500;
  }

  & ${Divider} {
    height: 1px;
    margin: 0.5rem 0;
    background-color: ${(props) => props.theme.colors.universal.fgColor}20;
  }
`;

export default PageWrapper;
