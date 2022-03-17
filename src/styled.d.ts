import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      [key: string]: {
        [key: string]: any;
      };
    };
    evoui: {
      colors: {
        [key: string]: {
          [key: string]: any;
        };
      };
    };
  }
}
