import React, { Dispatch, SetStateAction } from 'react'
import { Worker as WorkerType } from '../../misc/types'
import { Form, Formik, FormikHelpers } from 'formik'
import FormikControl from '../form/FormikControl'
import Button from '../form/Button'
import { useTranslation } from 'react-i18next'
import { createWorkerValidationSchema, editWorkerValidationSchema } from '../../misc/config'
import { useMutation } from 'react-query'
import { createWorker, editWorker } from '../../api-client'
import { useAppContext } from '../../context/AppProvider'
import { formatMobileNumber, handleCreate as handleCreateFunc, handleEdit as handleEditFunc } from '../../misc/helpers'
import ModalCard from './ModalCard'


interface Props {
  worker: WorkerType,
  onClose: () => void,
  setWorkers: Dispatch<SetStateAction<WorkerType[]>>,
}

const Worker = ({ worker, setWorkers, onClose }: Props): React.ReactNode => {
  const isEdit = worker.id !== -1;

  const { t: translating } = useTranslation("global")
  const { showToast } = useAppContext()
  const mutationCreate = useMutation(createWorker, {
    onSuccess: (data) => {
      showToast({ message: translating("workers.modal.create.success"), type: "SUCCESS" })
      handleCreateFunc<WorkerType>(data.user, setWorkers)
      onClose()
    },
    onError: () => {
      showToast({ message: translating("workers.modal.create.error"), type: "ERROR" })
    },
  })
  const mutationEdit = useMutation(editWorker, {
    onSuccess: (data) => {
      showToast({ message: translating("workers.modal.edit.success"), type: "SUCCESS" })
      handleEditFunc<WorkerType>(data.user, setWorkers)
      onClose()
    },
    onError: () => {
      showToast({ message: translating("workers.modal.edit.error"), type: "ERROR" })
    },
  })

  const onCreate = async (data: WorkerType) => {
    await mutationCreate.mutateAsync({
      id: data.id,
      fullName: data.fullName,
      personal_id: data.personal_id,
      phone: formatMobileNumber(data.phone),
      notes: data.notes,
      password: data.password
    })
  }

  const onEdit = async (data: WorkerType) => {
    const formData = new FormData()
    if (data.fullName)
      formData.append("fullName", data.fullName)
    if (data.phone)
      formData.append("phone", formatMobileNumber(data.phone))
    if (data.personal_id)
      formData.append("personal_id", String(data.personal_id))
    if (data.password)
      formData.append("password", data.password)
    if (data.notes)
      formData.append("notes", data.notes)
    await mutationEdit.mutateAsync({ formData, id: data.id })
  }

  const onSubmit = async (data: WorkerType, formik: FormikHelpers<WorkerType>) => {
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
        ? translating("workers.modal.title.edit")
        : translating("workers.modal.title.create")}>
      <Formik
        initialValues={worker}
        validationSchema={isEdit
          ? editWorkerValidationSchema()
          : createWorkerValidationSchema(
            translating("workers.modal.form.fullName.error.required"),
            translating("workers.modal.form.phone.error.required"),
            translating("workers.modal.form.password.error.required"),
          )}
        onSubmit={onSubmit}
      >
        {formik => (
          <Form className='form d-flex flex-column gap-3 w-100'>
            <FormikControl
              control='input'
              name='fullName'
              label={translating("workers.modal.form.fullName.label")}
              type='text'
            />

            <FormikControl
              control='input'
              name='phone'
              label={translating("workers.modal.form.phone.label")}
              type='number'
            />

            <FormikControl
              control='input'
              name='personal_id'
              label={translating("workers.modal.form.personal_id.label")}
              type='number'
            />

            <FormikControl
              control='input'
              name='password'
              label={translating("workers.modal.form.password.label")}
              type='password'
            />

            <FormikControl
              control='textarea'
              name='notes'
              label={translating("workers.modal.form.notes.label")}
              type='text'
            />

            <Button
              type='submit'
              disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
            >
              {translating("workers.modal.confirm")}
            </Button>
          </Form>
        )}
      </Formik>
    </ModalCard >
  )
}

export default Worker
