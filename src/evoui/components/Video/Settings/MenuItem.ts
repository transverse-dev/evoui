import styled from 'styled-components';

const MenuItem = styled.div`
  padding: 8px 12px;
  color: ${(props) => props.theme.evoui.colors.video.fgColor};
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: transparent;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  transition: all ease-in-out 200ms;
  width: 100%;

  &:hover {
    background-color: ${(props) => props.theme.evoui.colors.video.hoverBgColor};
  }
`;

export default MenuItem;
