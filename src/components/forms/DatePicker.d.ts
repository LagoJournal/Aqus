import React from 'react';

export interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: Date | string | null;
  onChange?: (date: Date) => void;
  label?: string;
  placeholder?: string;
}

/** Calendar in a glass popover. Selected day = filled liquid blob, today = outline ring. */
export function DatePicker(props: DatePickerProps): JSX.Element;
