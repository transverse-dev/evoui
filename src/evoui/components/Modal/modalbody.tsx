import styled from 'styled-components';
import { ModalBodyType } from './modalbody.type';

const Root = styled.div<ModalBodyType.RootPropsType>`
  margin-bottom: auto;
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;

  ${(props) => props?.cssStyle ?? ''};
`;

export function ModalBody({
  children,
  overrides,
}: ModalBodyType.PropsType) {
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
