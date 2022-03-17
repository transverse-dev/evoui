import styled from 'styled-components';
import { IconType } from './icon.type';

const Root = styled.div<IconType.RootPropsType>`
  ${(props) => props.cssStyle ?? ''};
`;

export default function Icon({
  type = 'success',
  overrides,
}: IconType.PropsType) {
  switch (type) {
    case 'success':
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
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 0 24 24'
            width='24px'
            fill='currentColor'>
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
          </svg>
        </Root>
      );
    case 'error':
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
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 0 24 24'
            width='24px'
            fill='currentColor'>
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z' />
          </svg>
        </Root>
      );
    case 'warning':
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
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 0 24 24'
            width='24px'
            fill='currentColor'>
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z' />
          </svg>
        </Root>
      );
    case 'info':
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
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 0 24 24'
            width='24px'
            fill='currentColor'>
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z' />
          </svg>
        </Root>
      );
  }
}
