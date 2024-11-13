import React, { Dispatch, SetStateAction } from 'react'
import ModalCard from '../ModalCard'
import { CompanyIdentity, Shift as ShiftType, ShiftControl, WorkerIdentity } from '../../../misc/types'
import { useMutation } from 'react-query'
import { Form, Formik, FormikHelpers } from 'formik'
import FormikControl from '../../form/FormikControl'
import Button from '../../form/Button'
import { useTranslation } from 'react-i18next'
import { useAppContext } from '../../../context/AppProvider'
import { createShift, editShift } from '../../../api-client'
import { handleShiftCreate, handleShiftEdit } from '../../../misc/helpers'

interface Props {
  onClose: () => void,
  shift: ShiftControl,
  setShifts: Dispatch<SetStateAction<ShiftType[]>>
  companies: CompanyIdentity[],
  workers: WorkerIdentity[]
}

const Control = ({ onClose, shift, companies, workers, setShifts }: Props): React.JSX.Element => {
  const isEdit = shift.id !== -1
  const { t: translating } = useTranslation("global")
  const { showToast } = useAppContext()

  const mutationCreate = useMutation(createShift, {
    onSuccess: (data) => {
      showToast({ message: translating("shifts.form.create.success"), type: "SUCCESS" })
      handleShiftCreate(data.shift, setShifts)
      onClose()
    },
    onError: () => {
      showToast({ message: translating("shifts.form.create.error"), type: "ERROR" })
    },
  })
  const mutationEdit = useMutation(editShift, {
    onSuccess: (data: { shift: ShiftType }) => {
      showToast({ message: translating("shifts.form.edit.success"), type: "SUCCESS" })
      handleShiftEdit(data.shift, setShifts)
      onClose()
    },
    onError: () => {
      showToast({ message: translating("shifts.form.edit.error"), type: "ERROR" })
    },
  })

  const onCreate = async (formData: FormData) => {
    await mutationCreate.mutateAsync(formData)
  }

  const onEdit = async (data: { formData: FormData, id: number }) => {
    await mutationEdit.mutateAsync({ formData: data.formData, id: data.id })
  }

  const onSubmit = async (data: ShiftControl, formik: FormikHelpers<ShiftControl>) => {
    const formData = new FormData()

    formData.append("companyId", String(data.companyId))
    formData.append("date", data.date)
    formData.append("location", data.location)

    if (data.workType)
      formData.append("workType", data.workType)
    if (data.startHour)
      formData.append("startHour", data.startHour)
    if (data.endHour)
      formData.append("endHour", data.endHour)
    if (data.workerId)
      formData.append("workerId", String(data.workerId))
    if (data.notes)
      formData.append("notes", data.notes)

    if (isEdit)
      await onEdit({ formData, id: data.id })
    else
      await onCreate(formData)
    formik.setSubmitting(false)
  }


  return (
    <ModalCard
      onClose={onClose}
      title={isEdit
        ? translating("shifts.form.title.edit")
        : translating("shifts.form.title.create")
      }
      id='shift-modal-control'>
      <Formik
        initialValues={shift}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className='form d-flex flex-column gap-3 w-100'>
            <FormikControl
              control='select'
              name='workerId'
              placeholder={translating("shifts.form.fields.workerName")}
              options={workers.map(worker => {
                return {
                  id: worker.id,
                  value: worker.fullName
                }
              })}
            />

            <FormikControl
              control='select'
              name='companyId'
              placeholder={translating("shifts.form.fields.companyName")}
              options={companies.map(company => {
                return {
                  id: company.id,
                  value: company.name
                }
              })}
            />

            <FormikControl
              control='date'
              name='date'
              label={translating("shifts.form.fields.date")}
              type='text'
            />

            <div className="flex-center-y justify-content-between">
              <FormikControl
                control='time'
                name='startHour'
                label={translating("shifts.form.fields.start")}
              />

              <FormikControl
                control='time'
                name='endHour'
                label={translating("shifts.form.fields.end")}
              />
            </div>

            <FormikControl
              control='input'
              name='location'
              label={translating("shifts.form.fields.location")}
              type='text'
            />

            <FormikControl
              control='input'
              name='workType'
              type='text'
              label={translating("shifts.form.fields.workType")}
            />

            <FormikControl
              control='textarea'
              name='notes'
              label={translating("shifts.form.fields.notes")}
              type='text'
            />

            <Button
              type='submit'
              disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
            >
              {translating("shifts.form.confirm")}
            </Button>
          </Form>
        )}
      </Formik>
    </ModalCard>
  )
}

export default Control
