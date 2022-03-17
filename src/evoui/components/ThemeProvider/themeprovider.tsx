import { ThemeProvider as Root } from 'styled-components';
import { dark, light } from '../../theme';
import { ThemeProviderType } from './themeprovider.type';

export default function ThemeProvider({
  darkMode = false,
  children,
  theme,
}: ThemeProviderType.PropsType) {
  return (
    <Root theme={{ evoui: darkMode ? dark : light, ...theme }}>
      {children}
    </Root>
  );
}
