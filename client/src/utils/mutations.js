import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_COMMUNITY = gql`
  mutation addCommunity($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      communities {
        _id
        communityname
      }
    }
  }
`;

export const ADD_IDEE = gql`
  mutation addThought($ideeText: String!) {
    addIdee(ideeText: $ideeText) {
      _id
      ideeText
      createdAt
      username
      replyCount
      replys {
        _id
      }
    }
  }
`;


export const ADD_REPLY = gql`
  mutation addReply($thoughtId: ID!, $replyBody: String!) {
    addReply(thoughtId: $thoughtId, replyBody: $replyBody) {
      _id
      replyCount
      replys {
        _id
        replyBody
        createdAt
        username
      }
    }
  }
`;