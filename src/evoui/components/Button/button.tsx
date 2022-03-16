import styled from 'styled-components';
import { ButtonType } from './button.type';

const Root = styled.div`
  padding: 12px;
  border-radius: 6px;
  font-size: 1.1rem;
  text-align: center;
  transition: 0.2s;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
`;

export default function Button({ children }: ButtonType.PropsType) {
  return <Root>{children}</Root>;
}
