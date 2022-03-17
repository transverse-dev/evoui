import { Suspense } from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { themeSelector } from 'redux/global/selectors';
import { dark, light } from 'theme';
import GlobalStyle from 'GlobalStyle';
import ButtonPage from 'containers/ButtonPage';
import Executer from './executer';
import { push } from 'connected-react-router';
import Header from 'components/Header';
import { ThemeProvider } from 'evoui';
import Footer from 'components/Footer';
import PageWrapper from 'components/PageWrapper';
import styled from 'styled-components';

const List = styled.div`
  padding-left: 48px;
`;
const Item = styled.div<any>`
  padding: 4px 0;
  font-size: 0.9rem;
  font-weight: ${(props) => (props.selected ? 500 : 300)};
  cursor: pointer;
`;

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const theme = useSelector(themeSelector);
  const StyledComponentsTheme = theme === 'dark' ? dark : light;

  return (
    <ThemeProvider theme={StyledComponentsTheme} darkMode={theme === 'dark'}>
      <BrowserRouter>
        <Header />
        <div style={{ display: 'flex', minHeight: '100%' }}>
          <div style={{ padding: '32px 48px' }}>
            <Item selected={location.pathname.split('/')[1] === 'components'}>
              Components
            </Item>
            <List>
              <Item
                selected={location.pathname.split('/')[2] === 'button'}
                onClick={() => {
                  dispatch(push('/components/button'));
                }}>
                Button
              </Item>
              <Item
                selected={location.pathname.split('/')[2] === 'dropdownlist'}
                onClick={() => {
                  dispatch(push('/components/dropdownlist'));
                }}>
                DropdownList
              </Item>
              <Item
                selected={location.pathname.split('/')[2] === 'feedback'}
                onClick={() => {
                  dispatch(push('/components/feedback'));
                }}>
                Feedback
              </Item>
            </List>
          </div>
          <PageWrapper>
            <Suspense fallback={<div>loading</div>}>
              <Switch location={location}>
                <Route
                  path='/components/button'
                  render={() => <ButtonPage />}
                />
                <Route
                  render={() => (
                    <Executer
                      targetFunction={() => {
                        dispatch(push('/components/button'));
                      }}
                    />
                  )}
                />
              </Switch>
            </Suspense>
          </PageWrapper>
        </div>
        <Footer />
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}
