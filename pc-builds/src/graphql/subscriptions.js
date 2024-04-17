/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct($filter: ModelSubscriptionProductFilterInput) {
    onCreateProduct(filter: $filter) {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct($filter: ModelSubscriptionProductFilterInput) {
    onUpdateProduct(filter: $filter) {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct($filter: ModelSubscriptionProductFilterInput) {
    onDeleteProduct(filter: $filter) {
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
export const onCreateForum = /* GraphQL */ `
  subscription OnCreateForum($filter: ModelSubscriptionForumFilterInput) {
    onCreateForum(filter: $filter) {
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
export const onUpdateForum = /* GraphQL */ `
  subscription OnUpdateForum($filter: ModelSubscriptionForumFilterInput) {
    onUpdateForum(filter: $filter) {
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
export const onDeleteForum = /* GraphQL */ `
  subscription OnDeleteForum($filter: ModelSubscriptionForumFilterInput) {
    onDeleteForum(filter: $filter) {
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
