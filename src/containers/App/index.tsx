import { Suspense } from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { themeSelector } from 'redux/global/selectors';
import { ThemeProvider } from 'styled-components';
import { dark, light } from 'theme';
import GlobalStyle from 'GlobalStyle';
import ButtonPage from 'containers/ButtonPage';
import Executer from './executer';
import { push } from 'connected-react-router';

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const theme = useSelector(themeSelector);

  const StyledComponentsTheme = theme === 'dark' ? dark : light;

  return (
    <ThemeProvider theme={StyledComponentsTheme}>
      <BrowserRouter>
        <Suspense fallback={<div>loading</div>}>
          <Switch location={location}>
            <Route path='/button' render={() => <ButtonPage />} />
            <Route
              render={() => (
                <Executer
                  targetFunction={() => {
                    dispatch(push('/button'));
                  }}
                />
              )}
            />
          </Switch>
        </Suspense>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}
