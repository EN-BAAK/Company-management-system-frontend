import React, { Dispatch, SetStateAction } from 'react'
import { Company as CompanyType } from '../../misc/types'
import { useTranslation } from 'react-i18next'
import { useAppContext } from '../../context/AppProvider'
import { useMutation } from 'react-query'
import { createCompany, editCompany } from '../../api-client'
import { formatMobileNumber, handleCreate as handleCreateFunc, handleEdit as handleEditFunc } from '../../misc/helpers'
import { Form, Formik, FormikHelpers } from 'formik'
import FormikControl from '../form/FormikControl'
import Button from '../form/Button'
import { createCompanyValidationSchema, editCompanyValidationSchema } from '../../misc/config'
import ModalCard from './ModalCard'

interface Props {
  company: CompanyType,
  onClose: () => void,
  setCompanies: Dispatch<SetStateAction<CompanyType[]>>,
}

const Company = ({ company, onClose, setCompanies, }: Props): React.ReactNode => {
  const isEdit = company.id !== -1

  const { t: translating } = useTranslation("global")
  const { showToast } = useAppContext()
  const mutationCreate = useMutation(createCompany, {
    onSuccess: (data) => {
      showToast({ message: translating("companies.modal.create.success"), type: "SUCCESS" })
      handleCreateFunc<CompanyType>(data.company, setCompanies)
      onClose()
    },
    onError: () => {
      showToast({ message: translating("companies.modal.create.error"), type: "ERROR" })
    },
  })
  const mutationEdit = useMutation(editCompany, {
    onSuccess: (data) => {
      showToast({ message: translating("companies.modal.edit.success"), type: "SUCCESS" })
      handleEditFunc<CompanyType>(data.company, setCompanies)
      onClose()
    },
    onError: () => {
      showToast({ message: translating("companies.modal.edit.error"), type: "ERROR" })
    },
  })

  const onCreate = async (data: CompanyType) => {
    await mutationCreate.mutateAsync({
      id: data.id,
      name: data.name,
      phone: formatMobileNumber(data.phone),
      notes: data.notes
    })
  }

  const onEdit = async (data: CompanyType) => {
    const formData = new FormData()

    if (data.name)
      formData.append("name", data.name)
    if (data.phone)
      formData.append("phone", formatMobileNumber(data.phone))
    if (data.notes)
      formData.append("notes", data.notes)

    await mutationEdit.mutateAsync({ formData, id: data.id })
  }

  const onSubmit = async (data: CompanyType, formik: FormikHelpers<CompanyType>) => {
    if (isEdit)
      await onEdit(data)
    else
      await onCreate(data)
    formik.setSubmitting(false)
  }

  return (
    <ModalCard
      onClose={onClose}
      title={isEdit
        ? translating("companies.modal.title.edit")
        : translating("companies.modal.title.create")}
    >
      <Formik
        initialValues={company}
        validationSchema={isEdit
          ? editCompanyValidationSchema(
          )
          : createCompanyValidationSchema(
            translating("companies.modal.form.name.error.required"),
            translating("companies.modal.form.phone.error.required"),
          )}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className='form d-flex flex-column gap-3 w-100'>
            <FormikControl
              control='input'
              name='name'
              label={translating("companies.modal.form.name.label")}
              type='text'
            />

            <FormikControl
              control='input'
              name='phone'
              label={translating("companies.modal.form.phone.label")}
              type='text'
            />

            <FormikControl
              control='textarea'
              name='notes'
              label={translating("companies.modal.form.notes.label")}
              type='text'
            />

            <Button
              type='submit'
              disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
            >
              {translating("companies.modal.confirm")}
            </Button>
          </Form>
        )}
      </Formik>
    </ModalCard>
  )
}


export default Company
