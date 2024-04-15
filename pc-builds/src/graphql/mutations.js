/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
