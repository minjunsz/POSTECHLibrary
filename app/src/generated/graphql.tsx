import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  seats: Array<Seat>;
  seat: Seat;
  me?: Maybe<Order>;
  seatCondition: SeatConditionResponse;
};


export type QuerySeatsArgs = {
  seatType: Array<SeatType>;
  needOutlet: Scalars['Boolean'];
  floor: Scalars['Int'];
};


export type QuerySeatArgs = {
  seatId: Scalars['Int'];
};


export type QuerySeatConditionArgs = {
  seatId: Scalars['Int'];
};

/** Type of Seats */
export enum SeatType {
  A = 'A',
  B = 'B',
  C = 'C'
}

export type Seat = {
  __typename?: 'Seat';
  id: Scalars['Int'];
  floor: Scalars['Int'];
  xpos: Scalars['Float'];
  ypos: Scalars['Float'];
  seatType: SeatType;
  hasOutlet: Scalars['Boolean'];
  order?: Maybe<Order>;
  seatCondition?: Maybe<SeatCondition>;
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['Int'];
  startAt: Scalars['DateTime'];
  endAt: Scalars['DateTime'];
  seatId: Scalars['Int'];
};


export type SeatCondition = {
  __typename?: 'SeatCondition';
  id: Scalars['Int'];
  status: SeatStatus;
  description: Scalars['String'];
  seatId: Scalars['Int'];
};

/** Status of seat */
export enum SeatStatus {
  Fine = 'FINE',
  Unavailable = 'UNAVAILABLE',
  Uncomfortable = 'UNCOMFORTABLE',
  Unsanitary = 'UNSANITARY'
}

export type SeatConditionResponse = {
  __typename?: 'SeatConditionResponse';
  error?: Maybe<Scalars['String']>;
  seatCondition?: Maybe<SeatCondition>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createSeat: Seat;
  login: OrderResponse;
  logout: Scalars['Boolean'];
  createOrder: OrderResponse;
  deleteOrder: OrderResponse;
  createSeatCondition: SeatCondition;
  updateSeatCondition: SeatCondition;
};


export type MutationCreateSeatArgs = {
  args: SeatInput;
};


export type MutationLoginArgs = {
  args: OrderInput;
};


export type MutationCreateOrderArgs = {
  args: CreateOrderInput;
};


export type MutationDeleteOrderArgs = {
  seatId: Scalars['Int'];
};


export type MutationCreateSeatConditionArgs = {
  conditions: ConditionInput;
};


export type MutationUpdateSeatConditionArgs = {
  conditions: ConditionInput;
};

export type SeatInput = {
  seatPassword: Scalars['String'];
  floor: Scalars['Int'];
  xpos: Scalars['Float'];
  ypos: Scalars['Float'];
  seatType: Scalars['String'];
  hasOutlet: Scalars['Boolean'];
};

export type OrderInput = {
  seatId: Scalars['Int'];
  seatPassword: Scalars['String'];
  password: Scalars['String'];
};

export type OrderResponse = {
  __typename?: 'OrderResponse';
  errors?: Maybe<Array<FieldError>>;
  order?: Maybe<Order>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type CreateOrderInput = {
  seatId: Scalars['Int'];
  seatPassword: Scalars['String'];
  password: Scalars['String'];
  startAt: Scalars['DateTime'];
  endAt: Scalars['DateTime'];
};

export type ConditionInput = {
  seatId: Scalars['Int'];
  status: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type RegularOrderFragment = (
  { __typename?: 'Order' }
  & Pick<Order, 'id' | 'startAt' | 'endAt' | 'seatId'>
);

export type RegularSeatFragment = (
  { __typename?: 'Seat' }
  & Pick<Seat, 'id' | 'floor' | 'xpos' | 'ypos' | 'seatType' | 'hasOutlet'>
);

export type RegularSeatConditionFragment = (
  { __typename?: 'SeatCondition' }
  & Pick<SeatCondition, 'id' | 'status' | 'description' | 'seatId'>
);

export type CreateSeatConditionMutationVariables = Exact<{
  conditions: ConditionInput;
}>;


export type CreateSeatConditionMutation = (
  { __typename?: 'Mutation' }
  & { createSeatCondition: (
    { __typename?: 'SeatCondition' }
    & RegularSeatConditionFragment
  ) }
);

export type DeleteOrderMutationVariables = Exact<{
  seatId: Scalars['Int'];
}>;


export type DeleteOrderMutation = (
  { __typename?: 'Mutation' }
  & { deleteOrder: (
    { __typename?: 'OrderResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, order?: Maybe<(
      { __typename?: 'Order' }
      & RegularOrderFragment
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  args: OrderInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'OrderResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, order?: Maybe<(
      { __typename?: 'Order' }
      & RegularOrderFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type CreateOrderMutationVariables = Exact<{
  args: CreateOrderInput;
}>;


export type CreateOrderMutation = (
  { __typename?: 'Mutation' }
  & { createOrder: (
    { __typename?: 'OrderResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, order?: Maybe<(
      { __typename?: 'Order' }
      & RegularOrderFragment
    )> }
  ) }
);

export type UpdateSeatConditionMutationVariables = Exact<{
  conditions: ConditionInput;
}>;


export type UpdateSeatConditionMutation = (
  { __typename?: 'Mutation' }
  & { updateSeatCondition: (
    { __typename?: 'SeatCondition' }
    & RegularSeatConditionFragment
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'Order' }
    & RegularOrderFragment
  )> }
);

export type SeatQueryVariables = Exact<{
  seatId: Scalars['Int'];
}>;


export type SeatQuery = (
  { __typename?: 'Query' }
  & { seat: (
    { __typename?: 'Seat' }
    & { order?: Maybe<(
      { __typename?: 'Order' }
      & Pick<Order, 'id'>
    )>, seatCondition?: Maybe<(
      { __typename?: 'SeatCondition' }
      & RegularSeatConditionFragment
    )> }
    & RegularSeatFragment
  ) }
);

export type SeatConditionQueryVariables = Exact<{
  seatId: Scalars['Int'];
}>;


export type SeatConditionQuery = (
  { __typename?: 'Query' }
  & { seatCondition: (
    { __typename?: 'SeatConditionResponse' }
    & Pick<SeatConditionResponse, 'error'>
    & { seatCondition?: Maybe<(
      { __typename?: 'SeatCondition' }
      & RegularSeatConditionFragment
    )> }
  ) }
);

export type SeatsQueryVariables = Exact<{
  floor: Scalars['Int'];
  needOutlet: Scalars['Boolean'];
  seatType: Array<SeatType>;
}>;


export type SeatsQuery = (
  { __typename?: 'Query' }
  & { seats: Array<(
    { __typename?: 'Seat' }
    & { order?: Maybe<(
      { __typename?: 'Order' }
      & Pick<Order, 'id'>
    )>, seatCondition?: Maybe<(
      { __typename?: 'SeatCondition' }
      & RegularSeatConditionFragment
    )> }
    & RegularSeatFragment
  )> }
);

export const RegularOrderFragmentDoc = gql`
    fragment RegularOrder on Order {
  id
  startAt
  endAt
  seatId
}
    `;
export const RegularSeatFragmentDoc = gql`
    fragment RegularSeat on Seat {
  id
  floor
  xpos
  ypos
  seatType
  hasOutlet
}
    `;
export const RegularSeatConditionFragmentDoc = gql`
    fragment RegularSeatCondition on SeatCondition {
  id
  status
  description
  seatId
}
    `;
export const CreateSeatConditionDocument = gql`
    mutation CreateSeatCondition($conditions: ConditionInput!) {
  createSeatCondition(conditions: $conditions) {
    ...RegularSeatCondition
  }
}
    ${RegularSeatConditionFragmentDoc}`;
export type CreateSeatConditionMutationFn = Apollo.MutationFunction<CreateSeatConditionMutation, CreateSeatConditionMutationVariables>;

/**
 * __useCreateSeatConditionMutation__
 *
 * To run a mutation, you first call `useCreateSeatConditionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSeatConditionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSeatConditionMutation, { data, loading, error }] = useCreateSeatConditionMutation({
 *   variables: {
 *      conditions: // value for 'conditions'
 *   },
 * });
 */
export function useCreateSeatConditionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSeatConditionMutation, CreateSeatConditionMutationVariables>) {
        return Apollo.useMutation<CreateSeatConditionMutation, CreateSeatConditionMutationVariables>(CreateSeatConditionDocument, baseOptions);
      }
export type CreateSeatConditionMutationHookResult = ReturnType<typeof useCreateSeatConditionMutation>;
export type CreateSeatConditionMutationResult = Apollo.MutationResult<CreateSeatConditionMutation>;
export type CreateSeatConditionMutationOptions = Apollo.BaseMutationOptions<CreateSeatConditionMutation, CreateSeatConditionMutationVariables>;
export const DeleteOrderDocument = gql`
    mutation DeleteOrder($seatId: Int!) {
  deleteOrder(seatId: $seatId) {
    errors {
      field
      message
    }
    order {
      ...RegularOrder
    }
  }
}
    ${RegularOrderFragmentDoc}`;
export type DeleteOrderMutationFn = Apollo.MutationFunction<DeleteOrderMutation, DeleteOrderMutationVariables>;

/**
 * __useDeleteOrderMutation__
 *
 * To run a mutation, you first call `useDeleteOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrderMutation, { data, loading, error }] = useDeleteOrderMutation({
 *   variables: {
 *      seatId: // value for 'seatId'
 *   },
 * });
 */
export function useDeleteOrderMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOrderMutation, DeleteOrderMutationVariables>) {
        return Apollo.useMutation<DeleteOrderMutation, DeleteOrderMutationVariables>(DeleteOrderDocument, baseOptions);
      }
export type DeleteOrderMutationHookResult = ReturnType<typeof useDeleteOrderMutation>;
export type DeleteOrderMutationResult = Apollo.MutationResult<DeleteOrderMutation>;
export type DeleteOrderMutationOptions = Apollo.BaseMutationOptions<DeleteOrderMutation, DeleteOrderMutationVariables>;
export const LoginDocument = gql`
    mutation Login($args: OrderInput!) {
  login(args: $args) {
    errors {
      field
      message
    }
    order {
      ...RegularOrder
    }
  }
}
    ${RegularOrderFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const CreateOrderDocument = gql`
    mutation CreateOrder($args: CreateOrderInput!) {
  createOrder(args: $args) {
    errors {
      field
      message
    }
    order {
      ...RegularOrder
    }
  }
}
    ${RegularOrderFragmentDoc}`;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, baseOptions);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const UpdateSeatConditionDocument = gql`
    mutation UpdateSeatCondition($conditions: ConditionInput!) {
  updateSeatCondition(conditions: $conditions) {
    ...RegularSeatCondition
  }
}
    ${RegularSeatConditionFragmentDoc}`;
export type UpdateSeatConditionMutationFn = Apollo.MutationFunction<UpdateSeatConditionMutation, UpdateSeatConditionMutationVariables>;

/**
 * __useUpdateSeatConditionMutation__
 *
 * To run a mutation, you first call `useUpdateSeatConditionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSeatConditionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSeatConditionMutation, { data, loading, error }] = useUpdateSeatConditionMutation({
 *   variables: {
 *      conditions: // value for 'conditions'
 *   },
 * });
 */
export function useUpdateSeatConditionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSeatConditionMutation, UpdateSeatConditionMutationVariables>) {
        return Apollo.useMutation<UpdateSeatConditionMutation, UpdateSeatConditionMutationVariables>(UpdateSeatConditionDocument, baseOptions);
      }
export type UpdateSeatConditionMutationHookResult = ReturnType<typeof useUpdateSeatConditionMutation>;
export type UpdateSeatConditionMutationResult = Apollo.MutationResult<UpdateSeatConditionMutation>;
export type UpdateSeatConditionMutationOptions = Apollo.BaseMutationOptions<UpdateSeatConditionMutation, UpdateSeatConditionMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularOrder
  }
}
    ${RegularOrderFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SeatDocument = gql`
    query Seat($seatId: Int!) {
  seat(seatId: $seatId) {
    ...RegularSeat
    order {
      id
    }
    seatCondition {
      ...RegularSeatCondition
    }
  }
}
    ${RegularSeatFragmentDoc}
${RegularSeatConditionFragmentDoc}`;

/**
 * __useSeatQuery__
 *
 * To run a query within a React component, call `useSeatQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeatQuery({
 *   variables: {
 *      seatId: // value for 'seatId'
 *   },
 * });
 */
export function useSeatQuery(baseOptions?: Apollo.QueryHookOptions<SeatQuery, SeatQueryVariables>) {
        return Apollo.useQuery<SeatQuery, SeatQueryVariables>(SeatDocument, baseOptions);
      }
export function useSeatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeatQuery, SeatQueryVariables>) {
          return Apollo.useLazyQuery<SeatQuery, SeatQueryVariables>(SeatDocument, baseOptions);
        }
export type SeatQueryHookResult = ReturnType<typeof useSeatQuery>;
export type SeatLazyQueryHookResult = ReturnType<typeof useSeatLazyQuery>;
export type SeatQueryResult = Apollo.QueryResult<SeatQuery, SeatQueryVariables>;
export const SeatConditionDocument = gql`
    query SeatCondition($seatId: Int!) {
  seatCondition(seatId: $seatId) {
    error
    seatCondition {
      ...RegularSeatCondition
    }
  }
}
    ${RegularSeatConditionFragmentDoc}`;

/**
 * __useSeatConditionQuery__
 *
 * To run a query within a React component, call `useSeatConditionQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeatConditionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeatConditionQuery({
 *   variables: {
 *      seatId: // value for 'seatId'
 *   },
 * });
 */
export function useSeatConditionQuery(baseOptions?: Apollo.QueryHookOptions<SeatConditionQuery, SeatConditionQueryVariables>) {
        return Apollo.useQuery<SeatConditionQuery, SeatConditionQueryVariables>(SeatConditionDocument, baseOptions);
      }
export function useSeatConditionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeatConditionQuery, SeatConditionQueryVariables>) {
          return Apollo.useLazyQuery<SeatConditionQuery, SeatConditionQueryVariables>(SeatConditionDocument, baseOptions);
        }
export type SeatConditionQueryHookResult = ReturnType<typeof useSeatConditionQuery>;
export type SeatConditionLazyQueryHookResult = ReturnType<typeof useSeatConditionLazyQuery>;
export type SeatConditionQueryResult = Apollo.QueryResult<SeatConditionQuery, SeatConditionQueryVariables>;
export const SeatsDocument = gql`
    query Seats($floor: Int!, $needOutlet: Boolean!, $seatType: [SeatType!]!) {
  seats(floor: $floor, needOutlet: $needOutlet, seatType: $seatType) {
    ...RegularSeat
    order {
      id
    }
    seatCondition {
      ...RegularSeatCondition
    }
  }
}
    ${RegularSeatFragmentDoc}
${RegularSeatConditionFragmentDoc}`;

/**
 * __useSeatsQuery__
 *
 * To run a query within a React component, call `useSeatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeatsQuery({
 *   variables: {
 *      floor: // value for 'floor'
 *      needOutlet: // value for 'needOutlet'
 *      seatType: // value for 'seatType'
 *   },
 * });
 */
export function useSeatsQuery(baseOptions?: Apollo.QueryHookOptions<SeatsQuery, SeatsQueryVariables>) {
        return Apollo.useQuery<SeatsQuery, SeatsQueryVariables>(SeatsDocument, baseOptions);
      }
export function useSeatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeatsQuery, SeatsQueryVariables>) {
          return Apollo.useLazyQuery<SeatsQuery, SeatsQueryVariables>(SeatsDocument, baseOptions);
        }
export type SeatsQueryHookResult = ReturnType<typeof useSeatsQuery>;
export type SeatsLazyQueryHookResult = ReturnType<typeof useSeatsLazyQuery>;
export type SeatsQueryResult = Apollo.QueryResult<SeatsQuery, SeatsQueryVariables>;