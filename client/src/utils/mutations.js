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
  mutation addCommunity($communityName: String!) {
    addCommunity(communityName: $communityName) {
      _id
      communityName
      createdAt
      username
      communityIdees {
        _id
      }
    }
  }
`;

export const REMOVE_COMMUNITY = gql`
  mutation removeCommunity($communityName: String!) {
    removeCommunity(communityName: $communityName) {
      _id
      communityName
      createdAt
      username
      communityIdees {
        _id
      }
    }
  }
`;

export const ADD_COMMUNITYIDEE = gql`
  mutation addCommunityIdee($communityName: String!, $communityIdeeText: String!) {
    addCommunityIdee(communityName: $communityName, communityIdeeText: $communityIdeeText) {
      communityName
      communityIdees {
        _id
        communityIdeeText
        createdAt
        username
        communityReplyCount
        communityReplys {
          _id
        }
      }
    }
  }
`

export const ADD_COMMUNIYREPLY = gql`
  mutation addCommunityReply(communityName: String!, communityIdeeId: ID!, communityReplyBody: String!) {
    addCommunityIdee(communityName: $communityName, communityIdeeId: $communityIdeeId, communityReplyBody: $communityReplyBody) {
      communityName
      communityIdees {
        _id
        communityReplys {
          _id
          communityReplyBody
          createdAt
          username
        }
      }
    }
  }
`