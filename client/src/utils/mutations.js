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
    }
  }
`;

// export const ADD_REACTION = gql`
//   mutation addReaction($thoughtId: ID!, $reactionBody: String!) {
//     addReaction(thoughtId: $thoughtId, reactionBody: $reactionBody) {
//       _id
//       reactionCount
//       reactions {
//         _id
//         reactionBody
//         createdAt
//         username
//       }
//     }
//   }
// `;