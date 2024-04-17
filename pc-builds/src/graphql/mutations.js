/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
