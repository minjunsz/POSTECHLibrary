import { dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { betterUpdateQuery } from "./cacheExchange";
import { LoginMutation, MeQuery, MeDocument, CreateOrderMutation, LogoutMutation } from "../generated/graphql";

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:8000/graphql",
  fetchOptions: {
    credentials: "include" as const
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
          },
          logout: (result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache, { query: MeDocument }, result, (_result, query) => {
                if (_result.logout) { return { me: null }; }
                else { return query; }
              }
            )
          }
        }
      }
    }),
    ssrExchange,
    fetchExchange]
})