import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { pathnameSelector } from 'redux/router/selectors';
import styled from 'styled-components';

const Root = styled.div`
  padding: 32px 48px;
`;
const ListName = styled.div`
  padding: 4px 0;
  font-size: 0.9rem;
  font-weight: 500;
  user-select: none;
`;
const List = styled.div`
  padding: 0 0 16px 48px;
`;
const Item = styled.div<any>`
  padding: 4px 0;
  font-size: 0.9rem;
  font-weight: 300;
  cursor: pointer;
  user-select: none;
  background-color: ${(props) =>
    props.selected
      ? props.theme.colors.sideMenu.selectedItemBgColor
      : 'initial'};
`;

export default function SideMenu() {
  const dispatch = useDispatch();

  const pathname = useSelector(pathnameSelector);

  return (
    <Root>
      <ListName>Getting Started</ListName>
      <List>
        <Item
          selected={pathname.split('/')[2] === 'introduction'}
          onClick={() => {
            dispatch(push('/gettingstarted/introduction'));
          }}>
          Introduction
        </Item>
        <Item
          selected={pathname.split('/')[2] === 'release'}
          onClick={() => {
            dispatch(push('/gettingstarted/release'));
          }}>
          Release
        </Item>
      </List>
      <ListName>Components</ListName>
      <List>
        <Item
          selected={pathname.split('/')[2] === 'button'}
          onClick={() => {
            dispatch(push('/components/button'));
          }}>
          Button
        </Item>
        <Item
          selected={pathname.split('/')[2] === 'dropdownlist'}
          onClick={() => {
            dispatch(push('/components/dropdownlist'));
          }}>
          DropdownList
        </Item>
        <Item
          selected={pathname.split('/')[2] === 'input'}
          onClick={() => {
            dispatch(push('/components/input'));
          }}>
          Input
        </Item>
        <Item
          selected={pathname.split('/')[2] === 'multipletextinput'}
          onClick={() => {
            dispatch(push('/components/multipletextinput'));
          }}>
          MultipleTextInput
        </Item>
        <Item
          selected={pathname.split('/')[2] === 'select'}
          onClick={() => {
            dispatch(push('/components/select'));
          }}>
          Select
        </Item>
        <Item
          selected={pathname.split('/')[2] === 'themeprovider'}
          onClick={() => {
            dispatch(push('/components/themeprovider'));
          }}>
          ThemeProvider
        </Item>
      </List>
    </Root>
  );
}
