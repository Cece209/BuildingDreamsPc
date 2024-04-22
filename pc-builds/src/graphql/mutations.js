/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBuilds = /* GraphQL */ `
  mutation CreateBuilds(
    $input: CreateBuildsInput!
    $condition: ModelBuildsConditionInput
  ) {
    createBuilds(input: $input, condition: $condition) {
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
export const updateBuilds = /* GraphQL */ `
  mutation UpdateBuilds(
    $input: UpdateBuildsInput!
    $condition: ModelBuildsConditionInput
  ) {
    updateBuilds(input: $input, condition: $condition) {
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
export const deleteBuilds = /* GraphQL */ `
  mutation DeleteBuilds(
    $input: DeleteBuildsInput!
    $condition: ModelBuildsConditionInput
  ) {
    deleteBuilds(input: $input, condition: $condition) {
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
export const createMessages = /* GraphQL */ `
  mutation CreateMessages(
    $input: CreateMessagesInput!
    $condition: ModelMessagesConditionInput
  ) {
    createMessages(input: $input, condition: $condition) {
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
export const updateMessages = /* GraphQL */ `
  mutation UpdateMessages(
    $input: UpdateMessagesInput!
    $condition: ModelMessagesConditionInput
  ) {
    updateMessages(input: $input, condition: $condition) {
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
export const deleteMessages = /* GraphQL */ `
  mutation DeleteMessages(
    $input: DeleteMessagesInput!
    $condition: ModelMessagesConditionInput
  ) {
    deleteMessages(input: $input, condition: $condition) {
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
export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
export const createForum = /* GraphQL */ `
  mutation CreateForum(
    $input: CreateForumInput!
    $condition: ModelForumConditionInput
  ) {
    createForum(input: $input, condition: $condition) {
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
export const updateForum = /* GraphQL */ `
  mutation UpdateForum(
    $input: UpdateForumInput!
    $condition: ModelForumConditionInput
  ) {
    updateForum(input: $input, condition: $condition) {
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
export const deleteForum = /* GraphQL */ `
  mutation DeleteForum(
    $input: DeleteForumInput!
    $condition: ModelForumConditionInput
  ) {
    deleteForum(input: $input, condition: $condition) {
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
