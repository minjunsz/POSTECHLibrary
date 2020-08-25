import { ColorModeProvider, CSSReset, ThemeProvider } from '@chakra-ui/core';
import { NavBar } from '../components/NavBar';
import theme from '../theme';


function MyApp({ Component, pageProps }: any) {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <NavBar></NavBar>
        <Component {...pageProps} />
      </ColorModeProvider>
    </ThemeProvider>
  )
}

export default MyApp
