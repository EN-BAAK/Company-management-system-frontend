import React, { Dispatch, SetStateAction } from 'react'
import { Worker as WorkerType } from '../../misc/types'
import { Card } from 'react-bootstrap'
import { Form, Formik, FormikHelpers } from 'formik'
import FormikControl from '../form/FormikControl'
import Button from '../form/Button'
import { useTranslation } from 'react-i18next'
import { createWorkerValidationSchema, editWorkerValidationSchema } from '../../misc/config'
import { useMutation } from 'react-query'
import { createWorker, editWorker } from '../../api-client'
import { useAppContext } from '../../context/AppProvider'
import { handleWorkerCreate, handleWorkerEdit } from '../../misc/helpers'
import { FaX } from "react-icons/fa6";


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
      handleWorkerCreate(data.user, setWorkers)
      onClose()
    },
    onError: () => {
      showToast({ message: translating("workers.modal.create.error"), type: "ERROR" })
    },
  })
  const mutationEdit = useMutation(editWorker, {
    onSuccess: (data) => {
      showToast({ message: translating("workers.modal.edit.success"), type: "SUCCESS" })
      handleWorkerEdit(data.user, setWorkers)
      onClose()
    },
    onError: () => {
      showToast({ message: translating("workers.modal.edit.error"), type: "ERROR" })
    },
  })

  const onCreate = async (data: WorkerType) => {
    await mutationCreate.mutateAsync(data)
  }

  const onEdit = async (data: WorkerType) => {
    const formData = new FormData()

    if (data.fullName)
      formData.append("fullName", data.fullName)
    if (data.phone)
      formData.append("phone", data.phone)
    if (data.personal_id)
      formData.append("personal_id", data.personal_id)
    if (data.work_type)
      formData.append("work_type", data.work_type)
    if (data.password)
      formData.append("password", data.password)

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
    <div id='worker-modal' className='position-fixed flex-center'>
      <Card className='w-100 mx-2 shadow position-relative'>
        <button
          onClick={onClose}
          className="close-icon bg-transparent position-absolute rounded-circle flex-center">
          <FaX size={20} />
        </button>

        <Card.Body>
          <Card.Title className='text-center fw-semibold'>
            {isEdit
              ? translating("workers.modal.title.edit")
              : translating("workers.modal.title.create")}
          </Card.Title>

          <Formik
            initialValues={worker}
            validationSchema={isEdit
              ? editWorkerValidationSchema(
                translating("workers.modal.form.phone.error.pattern"),
                translating("workers.modal.form.personal_id.error.pattern")
              )
              : createWorkerValidationSchema(
                translating("workers.modal.form.fullName.error.pattern"),
                translating("workers.modal.form.phone.error.required"),
                translating("workers.modal.form.phone.error.pattern"),
                translating("workers.modal.form.password.error.required"),
                translating("workers.modal.form.personal_id.error.pattern")
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
                  type='text'
                />

                <FormikControl
                  control='input'
                  name='work_type'
                  label={translating("workers.modal.form.work_type.label")}
                  type='text'
                />

                <FormikControl
                  control='input'
                  name='personal_id'
                  label={translating("workers.modal.form.personal_id.label")}
                  type='text'
                />

                <FormikControl
                  control='input'
                  name='password'
                  label={translating("workers.modal.form.password.label")}
                  type='password'
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
        </Card.Body>
      </Card>
    </div>
  )
}

export default Worker
