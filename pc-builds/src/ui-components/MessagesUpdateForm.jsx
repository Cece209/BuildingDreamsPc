/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getMessages } from "../graphql/queries";
import { updateMessages } from "../graphql/mutations";
const client = generateClient();
export default function MessagesUpdateForm(props) {
  const {
    id: idProp,
    messages: messagesModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    messageID: "",
    senderID: "",
    recipientID: "",
    content: "",
    timestamp: "",
  };
  const [messageID, setMessageID] = React.useState(initialValues.messageID);
  const [senderID, setSenderID] = React.useState(initialValues.senderID);
  const [recipientID, setRecipientID] = React.useState(
    initialValues.recipientID
  );
  const [content, setContent] = React.useState(initialValues.content);
  const [timestamp, setTimestamp] = React.useState(initialValues.timestamp);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = messagesRecord
      ? { ...initialValues, ...messagesRecord }
      : initialValues;
    setMessageID(cleanValues.messageID);
    setSenderID(cleanValues.senderID);
    setRecipientID(cleanValues.recipientID);
    setContent(cleanValues.content);
    setTimestamp(cleanValues.timestamp);
    setErrors({});
  };
  const [messagesRecord, setMessagesRecord] = React.useState(messagesModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getMessages.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getMessages
        : messagesModelProp;
      setMessagesRecord(record);
    };
    queryData();
  }, [idProp, messagesModelProp]);
  React.useEffect(resetStateValues, [messagesRecord]);
  const validations = {
    messageID: [],
    senderID: [],
    recipientID: [],
    content: [],
    timestamp: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          messageID: messageID ?? null,
          senderID: senderID ?? null,
          recipientID: recipientID ?? null,
          content: content ?? null,
          timestamp: timestamp ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateMessages.replaceAll("__typename", ""),
            variables: {
              input: {
                id: messagesRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "MessagesUpdateForm")}
      {...rest}
    >
      <TextField
        label="Message id"
        isRequired={false}
        isReadOnly={false}
        value={messageID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              messageID: value,
              senderID,
              recipientID,
              content,
              timestamp,
            };
            const result = onChange(modelFields);
            value = result?.messageID ?? value;
          }
          if (errors.messageID?.hasError) {
            runValidationTasks("messageID", value);
          }
          setMessageID(value);
        }}
        onBlur={() => runValidationTasks("messageID", messageID)}
        errorMessage={errors.messageID?.errorMessage}
        hasError={errors.messageID?.hasError}
        {...getOverrideProps(overrides, "messageID")}
      ></TextField>
      <TextField
        label="Sender id"
        isRequired={false}
        isReadOnly={false}
        value={senderID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              messageID,
              senderID: value,
              recipientID,
              content,
              timestamp,
            };
            const result = onChange(modelFields);
            value = result?.senderID ?? value;
          }
          if (errors.senderID?.hasError) {
            runValidationTasks("senderID", value);
          }
          setSenderID(value);
        }}
        onBlur={() => runValidationTasks("senderID", senderID)}
        errorMessage={errors.senderID?.errorMessage}
        hasError={errors.senderID?.hasError}
        {...getOverrideProps(overrides, "senderID")}
      ></TextField>
      <TextField
        label="Recipient id"
        isRequired={false}
        isReadOnly={false}
        value={recipientID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              messageID,
              senderID,
              recipientID: value,
              content,
              timestamp,
            };
            const result = onChange(modelFields);
            value = result?.recipientID ?? value;
          }
          if (errors.recipientID?.hasError) {
            runValidationTasks("recipientID", value);
          }
          setRecipientID(value);
        }}
        onBlur={() => runValidationTasks("recipientID", recipientID)}
        errorMessage={errors.recipientID?.errorMessage}
        hasError={errors.recipientID?.hasError}
        {...getOverrideProps(overrides, "recipientID")}
      ></TextField>
      <TextField
        label="Content"
        isRequired={false}
        isReadOnly={false}
        value={content}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              messageID,
              senderID,
              recipientID,
              content: value,
              timestamp,
            };
            const result = onChange(modelFields);
            value = result?.content ?? value;
          }
          if (errors.content?.hasError) {
            runValidationTasks("content", value);
          }
          setContent(value);
        }}
        onBlur={() => runValidationTasks("content", content)}
        errorMessage={errors.content?.errorMessage}
        hasError={errors.content?.hasError}
        {...getOverrideProps(overrides, "content")}
      ></TextField>
      <TextField
        label="Timestamp"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={timestamp && convertToLocal(new Date(timestamp))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              messageID,
              senderID,
              recipientID,
              content,
              timestamp: value,
            };
            const result = onChange(modelFields);
            value = result?.timestamp ?? value;
          }
          if (errors.timestamp?.hasError) {
            runValidationTasks("timestamp", value);
          }
          setTimestamp(value);
        }}
        onBlur={() => runValidationTasks("timestamp", timestamp)}
        errorMessage={errors.timestamp?.errorMessage}
        hasError={errors.timestamp?.hasError}
        {...getOverrideProps(overrides, "timestamp")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || messagesModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || messagesModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
