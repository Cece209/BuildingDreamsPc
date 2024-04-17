/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      partType
      name
      price
      productPicturePath
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
