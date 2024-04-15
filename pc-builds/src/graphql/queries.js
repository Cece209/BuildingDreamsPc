/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getForum = /* GraphQL */ `
  query GetForum($id: ID!) {
    getForum(id: $id) {
      id
      name
      title
      description
      forumPicturePath
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listForums = /* GraphQL */ `
  query ListForums(
    $filter: ModelForumFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listForums(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        title
        description
        forumPicturePath
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
