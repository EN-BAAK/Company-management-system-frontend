import React from 'react';
import { FormikControl as FormikControlType } from '../../misc/types';
import Input from './Input';
import Textarea from './Textarea';
import Select from './Select';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';

const FormikControl = ({ control, ...reset }: FormikControlType): React.ReactNode => {
  switch (control) {
    case "input":
      return <Input {...reset} />;
    case "textarea":
      return <Textarea {...reset} />;
    case "select":
      return <Select {...reset} />;
    case "date":
      return <DatePicker {...reset} />;
    case "time":
      return <TimePicker {...reset} />;
    default:
      return <></>;
  }
};

export default FormikControl;
