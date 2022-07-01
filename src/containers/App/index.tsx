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
import Footer from 'components/Footer';
import PageWrapper from 'components/PageWrapper';
import SideMenu from 'components/SideMenu';
import IntroductionPage from 'containers/IntroductionPage';
import ReleasePage from 'containers/ReleasePage';
import ThemeProviderPage from 'containers/ThemeProviderPage';
import DropdownListPage from 'containers/DropdownListPage';
import { ThemeProvider } from 'evoui';
import SelectPage from 'containers/SelectPage';

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
          <SideMenu />
          <PageWrapper>
            <Suspense fallback={<div>loading</div>}>
              <Switch location={location}>
                <Route
                  path='/gettingstarted/introduction'
                  render={() => <IntroductionPage />}
                />
                <Route
                  path='/gettingstarted/release'
                  render={() => <ReleasePage />}
                />
                <Route
                  path='/components/button'
                  render={() => <ButtonPage />}
                />
                <Route
                  path='/components/dropdownlist'
                  render={() => <DropdownListPage />}
                />
                <Route
                  path='/components/select'
                  render={() => <SelectPage />}
                />
                <Route
                  path='/components/themeprovider'
                  render={() => <ThemeProviderPage />}
                />
                <Route
                  render={() => (
                    <Executer
                      targetFunction={() => {
                        dispatch(push('/gettingstarted/introduction'));
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
