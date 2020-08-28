import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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
  me?: Maybe<Order>;
  seatCondition: SeatConditionResponse;
};


export type QuerySeatConditionArgs = {
  seatId: Scalars['Int'];
};

export type Seat = {
  __typename?: 'Seat';
  id: Scalars['Int'];
  seatNumber: Scalars['String'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['Int'];
  startAt: Scalars['DateTime'];
  endAt: Scalars['DateTime'];
  seatId?: Maybe<Scalars['Int']>;
};


export type SeatConditionResponse = {
  __typename?: 'SeatConditionResponse';
  error?: Maybe<Scalars['String']>;
  seatCondition?: Maybe<SeatCondition>;
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

export type Mutation = {
  __typename?: 'Mutation';
  createSeat: Seat;
  login: OrderResponse;
  logout: Scalars['Boolean'];
  createOrder: OrderResponse;
  deleteOrder: OrderResponse;
  createSeatCondition: SeatCondition;
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
  args: OrderInput;
};


export type MutationCreateSeatConditionArgs = {
  conditions: ConditionInput;
};

export type SeatInput = {
  seatNumber: Scalars['String'];
  seatPassword: Scalars['String'];
};

export type OrderInput = {
  seatPassword: Scalars['String'];
  seatNumber: Scalars['String'];
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
  seatNumber: Scalars['String'];
  seatPassword: Scalars['String'];
  password: Scalars['String'];
  startAt: Scalars['DateTime'];
  endAt: Scalars['DateTime'];
};

export type ConditionInput = {
  status: Scalars['String'];
  description: Scalars['String'];
};

export type RegularOrderFragment = (
  { __typename?: 'Order' }
  & Pick<Order, 'id' | 'startAt' | 'endAt' | 'seatId'>
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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'Order' }
    & RegularOrderFragment
  )> }
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
      & Pick<SeatCondition, 'status' | 'description' | 'seatId'>
    )> }
  ) }
);

export type SeatsQueryVariables = Exact<{ [key: string]: never; }>;


export type SeatsQuery = (
  { __typename?: 'Query' }
  & { seats: Array<(
    { __typename?: 'Seat' }
    & Pick<Seat, 'id' | 'seatNumber'>
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

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
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

export function useCreateOrderMutation() {
  return Urql.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularOrder
  }
}
    ${RegularOrderFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const SeatConditionDocument = gql`
    query SeatCondition($seatId: Int!) {
  seatCondition(seatId: $seatId) {
    error
    seatCondition {
      status
      description
      seatId
    }
  }
}
    `;

export function useSeatConditionQuery(options: Omit<Urql.UseQueryArgs<SeatConditionQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SeatConditionQuery>({ query: SeatConditionDocument, ...options });
};
export const SeatsDocument = gql`
    query Seats {
  seats {
    id
    seatNumber
  }
}
    `;

export function useSeatsQuery(options: Omit<Urql.UseQueryArgs<SeatsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SeatsQuery>({ query: SeatsDocument, ...options });
};