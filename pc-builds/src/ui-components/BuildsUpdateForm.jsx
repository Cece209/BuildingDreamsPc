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
import { getBuilds } from "../graphql/queries";
import { updateBuilds } from "../graphql/mutations";
const client = generateClient();
export default function BuildsUpdateForm(props) {
  const {
    id: idProp,
    builds: buildsModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    date: "",
    itemsPurchased: "",
    ownerID: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [date, setDate] = React.useState(initialValues.date);
  const [itemsPurchased, setItemsPurchased] = React.useState(
    initialValues.itemsPurchased
  );
  const [ownerID, setOwnerID] = React.useState(initialValues.ownerID);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = buildsRecord
      ? { ...initialValues, ...buildsRecord }
      : initialValues;
    setName(cleanValues.name);
    setDate(cleanValues.date);
    setItemsPurchased(cleanValues.itemsPurchased);
    setOwnerID(cleanValues.ownerID);
    setErrors({});
  };
  const [buildsRecord, setBuildsRecord] = React.useState(buildsModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getBuilds.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getBuilds
        : buildsModelProp;
      setBuildsRecord(record);
    };
    queryData();
  }, [idProp, buildsModelProp]);
  React.useEffect(resetStateValues, [buildsRecord]);
  const validations = {
    name: [],
    date: [],
    itemsPurchased: [],
    ownerID: [],
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
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name: name ?? null,
          date: date ?? null,
          itemsPurchased: itemsPurchased ?? null,
          ownerID: ownerID ?? null,
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
            query: updateBuilds.replaceAll("__typename", ""),
            variables: {
              input: {
                id: buildsRecord.id,
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
      {...getOverrideProps(overrides, "BuildsUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              date,
              itemsPurchased,
              ownerID,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Date"
        isRequired={false}
        isReadOnly={false}
        value={date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              date: value,
              itemsPurchased,
              ownerID,
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks("date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("date", date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, "date")}
      ></TextField>
      <TextField
        label="Items purchased"
        isRequired={false}
        isReadOnly={false}
        value={itemsPurchased}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              date,
              itemsPurchased: value,
              ownerID,
            };
            const result = onChange(modelFields);
            value = result?.itemsPurchased ?? value;
          }
          if (errors.itemsPurchased?.hasError) {
            runValidationTasks("itemsPurchased", value);
          }
          setItemsPurchased(value);
        }}
        onBlur={() => runValidationTasks("itemsPurchased", itemsPurchased)}
        errorMessage={errors.itemsPurchased?.errorMessage}
        hasError={errors.itemsPurchased?.hasError}
        {...getOverrideProps(overrides, "itemsPurchased")}
      ></TextField>
      <TextField
        label="Owner id"
        isRequired={false}
        isReadOnly={false}
        value={ownerID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              date,
              itemsPurchased,
              ownerID: value,
            };
            const result = onChange(modelFields);
            value = result?.ownerID ?? value;
          }
          if (errors.ownerID?.hasError) {
            runValidationTasks("ownerID", value);
          }
          setOwnerID(value);
        }}
        onBlur={() => runValidationTasks("ownerID", ownerID)}
        errorMessage={errors.ownerID?.errorMessage}
        hasError={errors.ownerID?.hasError}
        {...getOverrideProps(overrides, "ownerID")}
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
          isDisabled={!(idProp || buildsModelProp)}
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
              !(idProp || buildsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
