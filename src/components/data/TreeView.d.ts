import React from 'react';

export interface TreeNode {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  meta?: React.ReactNode;
  children?: TreeNode[];
}

export interface TreeViewProps extends React.HTMLAttributes<HTMLUListElement> {
  nodes: TreeNode[];
  selectedId?: string;
  onSelect?: (node: TreeNode) => void;
  /** Node ids expanded by default. */
  defaultExpanded?: string[];
}

/** Collapsible hierarchy (files, nav, org). Expand indicator = liquid bubble; selected row = accent-light. */
export function TreeView(props: TreeViewProps): JSX.Element;
