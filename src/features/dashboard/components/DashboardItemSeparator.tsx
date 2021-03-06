import { VerticalSpacing } from "@components/atoms";
import { colors, grid } from "@constants";
import React from "react";
import styled from "styled-components/native";

const ImportantSectionItemSeparator = styled.View`
  height: 1px;
  background-color: ${colors.platinum};
  border-left-width: ${grid}px;
  border-color: ${colors.yellow};
`;

export function DashboardItemSeparator(props: {
  isImportant: boolean;
  isGrouped: boolean;
}) {
  if (props.isImportant) {
    return <ImportantSectionItemSeparator />;
  }
  if (props.isGrouped) {
    return null;
  }
  return <VerticalSpacing height={grid} />;
}
