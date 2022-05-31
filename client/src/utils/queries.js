import { gql } from '@apollo/client';

export const QUERY_IDEES = gql`
  query idees($username: String) {
    idees(username: $username) {
      _id
      ideeText
      createdAt
      username
      replyCount
      replys {
        _id
        createdAt
        username
        replyBody
      }
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
      replyCount
      replys {
        _id
        createdAt
        username
        replyBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      idees {
        _id
        ideeText
        createdAt
        replyCount
      }
      friendCount
      friends {
        _id
        username
      }
      communities {
        _id
        communityName
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
      friendCount
      friends {
        _id
        username
      }
      idees {
        _id
        ideeText
        createdAt
        replyCount
        replys {
          _id
          createdAt
          replyBody
          username
        }
      }
      communities {
        _id
        communityName
        createdAt
        communityIdees {
          _id
          communityIdeeText
          createdAt
          communityReplyCount
          communityReplys {
            _id
            createdAt
            communityReplyBody
            username
          }
        }
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
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_COMMUNITY = gql`
  query community($communityName: String!) {
      community(communityName: $communityName) {
          _id
          communityName
          createdAt
          communityIdees {
            _id
            communityIdeeText
            createdAt
            communityReplyCount
            communityReplys {
              _id
              createdAt
              communityReplyBody
              username
            }
          }
      }
  }
`

export const QUERY_COMMUNITIES = gql`
  query communities($communityName: String) {
      communities(communityName: $communityName) {
        _id
          communityName
          createdAt
          communityIdees {
            _id
            communityIdeeText
            createdAt
            communityReplyCount
            communityReplys {
              _id
              createdAt
              communityReplyBody
              username
            }
          }
      }
  }
`