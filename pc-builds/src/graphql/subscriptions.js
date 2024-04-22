/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBuilds = /* GraphQL */ `
  subscription OnCreateBuilds($filter: ModelSubscriptionBuildsFilterInput) {
    onCreateBuilds(filter: $filter) {
      id
      name
      date
      Products {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateBuilds = /* GraphQL */ `
  subscription OnUpdateBuilds($filter: ModelSubscriptionBuildsFilterInput) {
    onUpdateBuilds(filter: $filter) {
      id
      name
      date
      Products {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteBuilds = /* GraphQL */ `
  subscription OnDeleteBuilds($filter: ModelSubscriptionBuildsFilterInput) {
    onDeleteBuilds(filter: $filter) {
      id
      name
      date
      Products {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateMessages = /* GraphQL */ `
  subscription OnCreateMessages($filter: ModelSubscriptionMessagesFilterInput) {
    onCreateMessages(filter: $filter) {
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
export const onUpdateMessages = /* GraphQL */ `
  subscription OnUpdateMessages($filter: ModelSubscriptionMessagesFilterInput) {
    onUpdateMessages(filter: $filter) {
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
export const onDeleteMessages = /* GraphQL */ `
  subscription OnDeleteMessages($filter: ModelSubscriptionMessagesFilterInput) {
    onDeleteMessages(filter: $filter) {
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
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct($filter: ModelSubscriptionProductFilterInput) {
    onCreateProduct(filter: $filter) {
      id
      partType
      name
      price
      productPicturePath
      Description
      buildsID
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
      Description
      buildsID
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
      Description
      buildsID
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
