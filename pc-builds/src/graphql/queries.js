/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMessages = /* GraphQL */ `
  query GetMessages($id: ID!) {
    getMessages(id: $id) {
      id
      messageID
      senderID
      recipientID
      content
      timestamp
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessagesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        messageID
        senderID
        recipientID
        content
        timestamp
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      partType
      name
      price
      productPicturePath
      Description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        partType
        name
        price
        productPicturePath
        Description
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
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
