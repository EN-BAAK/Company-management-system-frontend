import React, { Dispatch, SetStateAction } from 'react'
import { Company as CompanyType } from '../../misc/types'
import { useTranslation } from 'react-i18next'
import { useAppContext } from '../../context/AppProvider'
import { useMutation } from 'react-query'
import { createCompany, editCompany } from '../../api-client'
import { handleCompanyCreate, handleCompanyEdit } from '../../misc/helpers'
import { Form, Formik, FormikHelpers } from 'formik'
import { FaX } from "react-icons/fa6";
import FormikControl from '../form/FormikControl'
import Button from '../form/Button'
import { Card } from 'react-bootstrap'
import { createCompanyValidationSchema, editCompanyValidationSchema } from '../../misc/config'

interface Props {
  company: CompanyType,
  onClose: () => void,
  setCompanies: Dispatch<SetStateAction<CompanyType[]>>
}

const Company = ({ company, onClose, setCompanies }: Props): React.ReactNode => {
  const isEdit = company.id !== -1

  const { t: translating } = useTranslation("global")
  const { showToast } = useAppContext()
  const mutationCreate = useMutation(createCompany, {
    onSuccess: (data) => {
      showToast({ message: translating("companies.modal.create.success"), type: "SUCCESS" })
      handleCompanyCreate(data.company, setCompanies)
      onClose()
    },
    onError: () => {
      showToast({ message: translating("companies.modal.create.error"), type: "ERROR" })
    },
  })
  const mutationEdit = useMutation(editCompany, {
    onSuccess: (data) => {
      showToast({ message: translating("companies.modal.edit.success"), type: "SUCCESS" })
      handleCompanyEdit(data.company, setCompanies)
      onClose()
    },
    onError: () => {
      showToast({ message: translating("companies.modal.edit.error"), type: "ERROR" })
    },
  })

  const onCreate = async (data: CompanyType) => {
    await mutationCreate.mutateAsync(data)
  }

  const onEdit = async (data: CompanyType) => {
    const formData = new FormData()

    if (data.name)
      formData.append("name", data.name)
    if (data.phone)
      formData.append("phone", data.phone)
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
    <div id='company-modal' className='position-fixed flex-center'>
      <Card className='w-100 mx-2 shadow position-relative'>
        <button
          onClick={onClose}
          className="close-icon bg-transparent position-absolute rounded-circle flex-center">
          <FaX size={20} />
        </button>

        <Card.Body>
          <Card.Title className='text-center fw-semibold'>
            {isEdit
              ? translating("companies.modal.title.edit")
              : translating("companies.modal.title.create")}
          </Card.Title>

          <Formik
            initialValues={company}
            validationSchema={isEdit
              ? editCompanyValidationSchema(
                translating("companies.modal.form.phone.error.pattern"),
              )
              : createCompanyValidationSchema(
                translating("companies.modal.form.name.error.pattern"),
                translating("companies.modal.form.phone.error.required"),
                translating("companies.modal.form.phone.error.pattern"),
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
        </Card.Body>
      </Card>
    </div>
  )
}


export default Company
