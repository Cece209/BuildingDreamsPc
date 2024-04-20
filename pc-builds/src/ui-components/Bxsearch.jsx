/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Icon } from "@aws-amplify/ui-react";
export default function Bxsearch(props) {
  const { overrides, ...rest } = props;
  return (
    <Icon
      width="43px"
      height="43px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      viewBox={{ minX: 0, minY: 0, width: 43, height: 43 }}
      paths={[
        {
          d: "M14.3333 28.6667C17.5135 28.666 20.602 27.6014 23.1071 25.6423L30.9833 33.5185L33.5167 30.9851L25.6405 23.1089C27.6006 20.6036 28.6659 17.5143 28.6667 14.3333C28.6667 6.43029 22.2364 0 14.3333 0C6.43029 0 0 6.43029 0 14.3333C0 22.2364 6.43029 28.6667 14.3333 28.6667ZM14.3333 3.58333C20.262 3.58333 25.0833 8.40471 25.0833 14.3333C25.0833 20.262 20.262 25.0833 14.3333 25.0833C8.40471 25.0833 3.58333 20.262 3.58333 14.3333C3.58333 8.40471 8.40471 3.58333 14.3333 3.58333Z",
          fill: "rgba(124,124,124,1)",
          fillRule: "nonzero",
          style: { transform: "translate(8.33%, 8.33%)" },
        },
      ]}
      {...getOverrideProps(overrides, "Bxsearch")}
      {...rest}
    ></Icon>
  );
}
