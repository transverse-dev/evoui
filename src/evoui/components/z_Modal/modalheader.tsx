import styled from 'styled-components';
import { ModalHeaderType } from './modalheader.type';

const Root = styled.div<ModalHeaderType.RootPropsType>`
  padding-bottom: 32px;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  font-size: 1.25rem;
  font-weight: 500;

  @media screen and (max-width: 768px) {
    padding-bottom: 18px;
  }

  ${(props) => props?.cssStyle ?? ''};
`;

export default function ModalHeader({
  children,
  overrides,
}: ModalHeaderType.PropsType) {
  return (
    <Root
      {...(typeof overrides?.Root?.css === 'string'
        ? {
            cssStyle: overrides.Root.css,
            ...(overrides.Root ?? {}),
          }
        : overrides?.Root == undefined
        ? {}
        : { style: overrides.Root.css, ...overrides.Root })}>
      {children}
    </Root>
  );
}
