/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { IconProps } from "@aws-amplify/ui-react";
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
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type Fluentemojilaugh16regularOverridesProps = {
    Fluentemojilaugh16regular?: PrimitiveOverrideProps<IconProps>;
} & EscapeHatchProps;
export declare type Fluentemojilaugh16regularProps = React.PropsWithChildren<Partial<IconProps> & {
    overrides?: Fluentemojilaugh16regularOverridesProps | undefined | null;
}>;
export default function Fluentemojilaugh16regular(props: Fluentemojilaugh16regularProps): React.ReactElement;
