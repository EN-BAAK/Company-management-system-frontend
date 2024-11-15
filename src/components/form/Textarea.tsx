import { Field, ErrorMessage } from 'formik'
import React, { HTMLAttributes } from 'react'
import { Form } from 'react-bootstrap'
import TextError from './TextError'
import { FormikControl } from '../../misc/types'

export interface Props extends HTMLAttributes<HTMLInputElement>, Omit<FormikControl, "control" | "inputMode"> { }

const Textarea = ({ label, name, inputClassName, labelClassName, Icon, formGroupClassName, ...reset }: Props): React.ReactNode => {
  return (
    <Form.Group className={`${formGroupClassName} formik-controller`}>
      {label &&
        <Form.Label className={`${labelClassName} fw-semibold`}>
          {label}
        </Form.Label>}

      <div className='position-relative'>
        <Field as="textarea" className={`${inputClassName} form-control py-2 ${Icon && "with-icon"}`} name={name} {...reset} />
      </div>

      <ErrorMessage name={name}>
        {msg => <TextError msg={msg} />}
      </ErrorMessage>
    </Form.Group>
  )
}

export default Textarea
