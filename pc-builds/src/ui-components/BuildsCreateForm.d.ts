/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type BuildsCreateFormInputValues = {
    name?: string;
    date?: string;
    itemsPurchased?: string;
    ownerID?: string;
};
export declare type BuildsCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
    itemsPurchased?: ValidationFunction<string>;
    ownerID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BuildsCreateFormOverridesProps = {
    BuildsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    itemsPurchased?: PrimitiveOverrideProps<TextFieldProps>;
    ownerID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BuildsCreateFormProps = React.PropsWithChildren<{
    overrides?: BuildsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: BuildsCreateFormInputValues) => BuildsCreateFormInputValues;
    onSuccess?: (fields: BuildsCreateFormInputValues) => void;
    onError?: (fields: BuildsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BuildsCreateFormInputValues) => BuildsCreateFormInputValues;
    onValidate?: BuildsCreateFormValidationValues;
} & React.CSSProperties>;
export default function BuildsCreateForm(props: BuildsCreateFormProps): React.ReactElement;
