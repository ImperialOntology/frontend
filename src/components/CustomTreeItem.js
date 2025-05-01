import * as React from "react";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { styled } from "@mui/material/styles";

const StyledTreeItem = styled((props) => (
  <TreeItem {...props} />
))(({ theme }) => ({
  [`& .${treeItemClasses.label}`]: {
    fontWeight: 'inherit',
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
  },
}));

export default StyledTreeItem;
