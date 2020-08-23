import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'
import { Provider, createClient, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';

import theme from '../theme'
import { NavBar } from '../components/NavBar';
import { betterUpdateQuery } from '../utils/cacheExchange';
import { LoginMutation, MeQuery, MeDocument, CreateOrderMutation } from '../generated/graphql';

const client = createClient({
  url: "http://localhost:8000/graphql",
  fetchOptions: {
    credentials: "include"
  },
  exchanges: [ //define cache update
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              result,
              (_result, query) => {
                if (_result.login.errors) {
                  return query;
                } else {
                  return { me: _result.login.order }
                }
              })
          },
          retister: (result, args, cache, info) => {
            betterUpdateQuery<CreateOrderMutation, MeQuery>(
              cache,
              { query: MeDocument },
              result,
              (_result, query) => {
                if (_result.createOrder.errors) {
                  return query;
                } else {
                  return { me: _result.createOrder.order }
                }
              })
          }
        }
      }
    }),
    fetchExchange]
});

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <NavBar></NavBar>
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
