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

export const ADD_IDEE = gql`
  mutation addIdee($ideeText: String!) {
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
  mutation addReply($ideeId: ID!, $replyBody: String!) {
    addReply(ideeId: $ideeId, replyBody: $replyBody) {
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

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($id: ID!) {
    removeFriend(id: $id) {
      _id
      username
      friends {
        _id
        username
      }
    }
  }
`;

export const ADD_COMMUNITY = gql`
  mutation addCommunity($id: ID!) {
    addCommunity(communityId: $id) {
      _id
      username
      communities {
        _id
        communityName
        username
      }
    }
  }
`;