import styled from 'styled-components';
import { ModalFooterType } from './modalfooter.type';

const Root = styled.div<ModalFooterType.RootPropsType>`
  padding: 40px 0 12px 0;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;

  @media screen and (max-width: 768px) {
    padding: 20px 0 6px 0;
  }

  ${(props) => props?.cssStyle ?? ''};
`;

export default function ModalFooter({
  children,
  overrides,
}: ModalFooterType.PropsType) {
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
