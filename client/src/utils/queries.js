import { gql } from '@apollo/client';

export const QUERY_IDEES = gql`
  query idees($username: String) {
    idees(username: $username) {
      _id
      ideeText
      createdAt
      username
    }
  }
`;

export const QUERY_IDEE = gql`
  query idee($id: ID!) {
    idee(_id: $id) {
      _id
      ideeText
      createdAt
      username
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      communities {
        _id
        communityname
      }
      idees {
        _id
        ideeText
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      idees {
        _id
        ideeText
        createdAt
      }
      communities {
        _id
        communityname
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      communities {
        _id
        communityname
      }
    }
  }
`;