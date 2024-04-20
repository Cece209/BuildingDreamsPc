/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { IconProps, ViewProps } from "@aws-amplify/ui-react";
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
export declare type BimicfillOverridesProps = {
    Bimicfill?: PrimitiveOverrideProps<ViewProps>;
    Group?: PrimitiveOverrideProps<ViewProps>;
    Vector411?: PrimitiveOverrideProps<IconProps>;
    Vector412?: PrimitiveOverrideProps<IconProps>;
} & EscapeHatchProps;
export declare type BimicfillProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: BimicfillOverridesProps | undefined | null;
}>;
export default function Bimicfill(props: BimicfillProps): React.ReactElement;
