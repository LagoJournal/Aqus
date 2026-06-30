import React from 'react';

export interface FileDropzoneProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrop'> {
  accept?: string;
  multiple?: boolean;
  onFiles?: (files: File[]) => void;
  label?: string;
  sublabel?: string;
  disabled?: boolean;
}

/**
 * @startingPoint section="Forms" subtitle="Drag-and-drop dropzone — liquid blob on hover" viewport="700x300"
 * Drag-and-drop file upload. Idle = dashed border. Drag-active = liquid blob + accent glow.
 */
export function FileDropzone(props: FileDropzoneProps): JSX.Element;
