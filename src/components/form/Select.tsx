import { ErrorMessage, Field } from 'formik'
import React, { HTMLAttributes } from 'react'
import { Form } from 'react-bootstrap'
import TextError from './TextError'
import { FormikControl } from '../../misc/types';

export interface Props extends HTMLAttributes<HTMLInputElement>, Omit<FormikControl, "control" | "inputMode"> { }

const Select = ({ label, placeholder, options, name, inputClassName, labelClassName, Icon, formGroupClassName, ...reset }: Props): React.ReactNode => {
  return (
    <Form.Group className={`${formGroupClassName} formik-controller`}>
      {label &&
        <Form.Label className={`${labelClassName} fw-semibold`}>
          {label}
        </Form.Label>}

      <div className='position-relative'>
        {Icon && React.cloneElement(Icon as React.ReactElement, { className: "position-absolute" })}
        <Field
          className={`${inputClassName} form-control py-2 ${Icon && "with-icon"}`}
          name={name}
          as="select"
          {...reset} >
          <option value="">{label || placeholder}</option>
          {options && options.length > 0 && options.map(option =>
            <option
              key={`options-${name}-${option.id}`}
              value={option.key}
            >
              {option.value}
            </option>
          )}
        </Field>
      </div>

      <ErrorMessage name={name}>
        {msg => <TextError msg={msg} />}
      </ErrorMessage>
    </Form.Group>
  )
}

export default Select
