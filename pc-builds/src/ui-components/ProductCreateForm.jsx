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
import { createProduct } from "../graphql/mutations";
const client = generateClient();
export default function ProductCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    partType: "",
    name: "",
    price: "",
    productPicturePath: "",
    Description: "",
    Description2: "",
  };
  const [partType, setPartType] = React.useState(initialValues.partType);
  const [name, setName] = React.useState(initialValues.name);
  const [price, setPrice] = React.useState(initialValues.price);
  const [productPicturePath, setProductPicturePath] = React.useState(
    initialValues.productPicturePath
  );
  const [Description, setDescription] = React.useState(
    initialValues.Description
  );
  const [Description2, setDescription2] = React.useState(
    initialValues.Description2
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setPartType(initialValues.partType);
    setName(initialValues.name);
    setPrice(initialValues.price);
    setProductPicturePath(initialValues.productPicturePath);
    setDescription(initialValues.Description);
    setDescription2(initialValues.Description2);
    setErrors({});
  };
  const validations = {
    partType: [{ type: "Required" }],
    name: [{ type: "Required" }],
    price: [{ type: "Required" }],
    productPicturePath: [{ type: "URL" }],
    Description: [],
    Description2: [],
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
          partType,
          name,
          price,
          productPicturePath,
          Description,
          Description2,
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
            query: createProduct.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ProductCreateForm")}
      {...rest}
    >
      <TextField
        label="Part type"
        isRequired={true}
        isReadOnly={false}
        value={partType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              partType: value,
              name,
              price,
              productPicturePath,
              Description,
              Description2,
            };
            const result = onChange(modelFields);
            value = result?.partType ?? value;
          }
          if (errors.partType?.hasError) {
            runValidationTasks("partType", value);
          }
          setPartType(value);
        }}
        onBlur={() => runValidationTasks("partType", partType)}
        errorMessage={errors.partType?.errorMessage}
        hasError={errors.partType?.hasError}
        {...getOverrideProps(overrides, "partType")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              partType,
              name: value,
              price,
              productPicturePath,
              Description,
              Description2,
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
        label="Price"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={price}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              partType,
              name,
              price: value,
              productPicturePath,
              Description,
              Description2,
            };
            const result = onChange(modelFields);
            value = result?.price ?? value;
          }
          if (errors.price?.hasError) {
            runValidationTasks("price", value);
          }
          setPrice(value);
        }}
        onBlur={() => runValidationTasks("price", price)}
        errorMessage={errors.price?.errorMessage}
        hasError={errors.price?.hasError}
        {...getOverrideProps(overrides, "price")}
      ></TextField>
      <TextField
        label="Product picture path"
        isRequired={false}
        isReadOnly={false}
        value={productPicturePath}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              partType,
              name,
              price,
              productPicturePath: value,
              Description,
              Description2,
            };
            const result = onChange(modelFields);
            value = result?.productPicturePath ?? value;
          }
          if (errors.productPicturePath?.hasError) {
            runValidationTasks("productPicturePath", value);
          }
          setProductPicturePath(value);
        }}
        onBlur={() =>
          runValidationTasks("productPicturePath", productPicturePath)
        }
        errorMessage={errors.productPicturePath?.errorMessage}
        hasError={errors.productPicturePath?.hasError}
        {...getOverrideProps(overrides, "productPicturePath")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={Description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              partType,
              name,
              price,
              productPicturePath,
              Description: value,
              Description2,
            };
            const result = onChange(modelFields);
            value = result?.Description ?? value;
          }
          if (errors.Description?.hasError) {
            runValidationTasks("Description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("Description", Description)}
        errorMessage={errors.Description?.errorMessage}
        hasError={errors.Description?.hasError}
        {...getOverrideProps(overrides, "Description")}
      ></TextField>
      <TextField
        label="Description2"
        isRequired={false}
        isReadOnly={false}
        value={Description2}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              partType,
              name,
              price,
              productPicturePath,
              Description,
              Description2: value,
            };
            const result = onChange(modelFields);
            value = result?.Description2 ?? value;
          }
          if (errors.Description2?.hasError) {
            runValidationTasks("Description2", value);
          }
          setDescription2(value);
        }}
        onBlur={() => runValidationTasks("Description2", Description2)}
        errorMessage={errors.Description2?.errorMessage}
        hasError={errors.Description2?.hasError}
        {...getOverrideProps(overrides, "Description2")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
