import { gql } from '@apollo/client'

export const GET_CUSTOMERS = gql`
  query customers {
    customers(first: 6) {
      nodes {
        id
        email
      }
    }
  }
`
