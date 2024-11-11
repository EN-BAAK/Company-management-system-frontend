import React from 'react'
import Input from './Input'
import { FormikControl as FormikControlType } from '../../misc/types'

const FormikControl = ({ control, ...reset }: FormikControlType): React.ReactNode => {
  switch (control) {
    case "input":
      return <Input {...reset} />
    default:
      return <></>
  }
}

export default FormikControl
