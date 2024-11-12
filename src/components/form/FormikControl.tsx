import React from 'react'
import Input from './Input'
import { FormikControl as FormikControlType } from '../../misc/types'
import Textarea from './Textarea'

const FormikControl = ({ control, ...reset }: FormikControlType): React.ReactNode => {
  switch (control) {
    case "input":
      return <Input {...reset} />
    case "textarea":
      return <Textarea {...reset} />
    default:
      return <></>
  }
}

export default FormikControl
