import { ErrorMessage, Field } from 'formik'
import React, { HTMLAttributes } from 'react'
import { Form } from 'react-bootstrap'
import TextError from './TextError'
import { FormikControl } from '../../misc/types';

export interface Props extends HTMLAttributes<HTMLInputElement>, Omit<FormikControl, "control" | "inputMode"> { }

const Input = ({ label, name, inputClassName, labelClassName, Icon, formGroupClassName, ...reset }: Props): React.ReactNode => {

  return (
    <Form.Group className={`${formGroupClassName} formik-controller`}>
      {label &&
        <Form.Label className={`${labelClassName} fw-semibold`}>
          {label}
        </Form.Label>}

      <div className='position-relative'>
        {Icon && React.cloneElement(Icon as React.ReactElement, { className: "position-absolute" })}
        <Field className={`${inputClassName} form-control py-2 ${Icon && "with-icon"}`} name={name} {...reset} />
      </div>

      <ErrorMessage name={name}>
        {msg => <TextError msg={msg} />}
      </ErrorMessage>
    </Form.Group>
  )
}

export default Input
