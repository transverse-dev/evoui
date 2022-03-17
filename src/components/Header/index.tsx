import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { SET_THEME } from 'redux/constants';
import { themeSelector } from 'redux/global/selectors';
import styled from 'styled-components';

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 16px 32px;
  background-color: ${(props) => props.theme.colors.header.bgColor};
  box-shadow: ${(props) => props.theme.colors.header.shadow};
`;

const Brand = styled.div`
  color: ${(props) => props.theme.colors.universal.mainColor};
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
`;

export default function Header() {
  const dispatch = useDispatch();

  const theme = useSelector(themeSelector);

  const toggleTheme = () => {
    if (theme === 'dark') {
      localStorage.setItem('theme', 'light');
      dispatch({ type: SET_THEME, payload: 'light' });
    } else {
      localStorage.setItem('theme', 'dark');
      dispatch({ type: SET_THEME, payload: 'dark' });
    }
  };

  return (
    <Root>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Brand
          onClick={() => {
            dispatch(push('/introduction'));
          }}>
          EvoUI
        </Brand>
        <div style={{ marginRight: '16px' }} />
        <div
          style={{ cursor: 'pointer', fontSize: '0.8rem', fontWeight: '300' }}
          onClick={() => {
            dispatch(push('/version'));
          }}>
          v0.0.42
        </div>
      </div>
      <div
        onClick={toggleTheme}
        style={{ cursor: 'pointer', fontSize: '0.8rem', fontWeight: '300' }}>
        {theme} mode
      </div>
    </Root>
  );
}
