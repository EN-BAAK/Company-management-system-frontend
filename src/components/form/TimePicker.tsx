import { ErrorMessage, Field } from 'formik'
import React, { HTMLAttributes } from 'react'
import { Form } from 'react-bootstrap'
import TextError from './TextError'
import { FormikControl } from '../../misc/types';

export interface Props extends HTMLAttributes<HTMLInputElement>, Omit<FormikControl, "control"> { }

const TimePicker = ({
  label,
  name,
  formGroupClassName,
  labelClassName,
  inputClassName,
}: Props): React.ReactNode => {
  return (
    <Form.Group className={`${formGroupClassName} formik-controller`}>
      {label && <Form.Label className={`${labelClassName} fw-semibold`}>{label}</Form.Label>}

      <div className="position-relative">
        <Field
          className={`${inputClassName} form-control py-2`}
          name={name}
          type="time"
        />
      </div>

      <ErrorMessage name={name}>
        {msg => <TextError msg={msg} />}
      </ErrorMessage>
    </Form.Group>
  );
};

export default TimePicker;
