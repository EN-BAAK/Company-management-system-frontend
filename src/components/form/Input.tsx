import { ErrorMessage, Field } from 'formik'
import React, { HTMLAttributes } from 'react'
import { Form } from 'react-bootstrap'
import TextError from './TextError'

export interface Props extends HTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type: string;
  inputClassName?: string,
  labelClassName?: string,
  formGroupClassName?: string
}

const Input = ({ label, name, inputClassName, labelClassName, formGroupClassName, ...reset }: Props): React.ReactNode => {

  return (
    <Form.Group className={formGroupClassName}>
      {label &&
        <Form.Label className={labelClassName}>
          {label}
        </Form.Label>}

      <Field className={`${inputClassName} form-control py-2`} name={name} {...reset} />

      <ErrorMessage name={name}>
        {msg => <TextError msg={msg} />}
      </ErrorMessage>
    </Form.Group>
  )
}

export default Input
