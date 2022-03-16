import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      [key: string]: {
        [key: string]: string; // theme object의 최대 depth 지정
      };
    };
  }
}
