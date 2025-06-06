import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { styled } from '@mui/material/styles';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';

export function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" sx={{ width: 14, height: 14 }} {...props}>
      <path d="M22 22H2V2h20v20zM17 11H7v2h10v-2z" />
    </SvgIcon>
  );
}

export function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" sx={{ width: 14, height: 14 }} {...props}>
      <path d="M22 22H2V2h20v20zM17 11h-4V7h-2v4H7v2h4v4h2v-4h4v-2z" />
    </SvgIcon>
  );
}

export function CloseSquare(props) {
  return (
    <SvgIcon fontSize="inherit" sx={{ width: 14, height: 14 }} {...props}>
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696.268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281.281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268.294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

export const CustomTreeItem = styled(TreeItem)({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
});