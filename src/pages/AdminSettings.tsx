import React from 'react'
import Page from '../layouts/Page'
import Header from '../layouts/Header'
import { Form, Formik, FormikHelpers } from 'formik'
import { useAppContext } from '../context/AppProvider'
import FormikControl from '../components/form/FormikControl'
import Button from '../components/form/Button'
import { editAdminFullNameSchema, editAdminPasswordSchema, editAdminPhoneSchema, initialValueEditAdminPassword, initialValueEditAdminPhone } from '../misc/config'
import { Col } from 'react-bootstrap'
import { useMutation } from 'react-query'
import { editFullName, editPassword, editPhone } from '../api-client'
import { editPasswordAdmin, editPhoneAdmin } from '../misc/types'
import Scroll from '../layouts/Scroll'
import { useTranslation } from 'react-i18next'

const AdminSettings = (): React.JSX.Element => {
  const { showToast } = useAppContext()
  const { t: translating } = useTranslation("global")
  const mutationFullName = useMutation(editFullName, {
    onSuccess: async () => {
      showToast({ message: translating("admin-settings.form.fullName.edit.success"), type: "SUCCESS" })
    },
    onError: () => {
      showToast({ message: translating("admin-settings.form.fullName.edit.error"), type: "ERROR" })
    }
  })
  const mutationPassword = useMutation(editPassword, {
    onSuccess: async () => {
      showToast({ message: translating("admin-settings.form.password.edit.success"), type: "SUCCESS" })
    },
    onError: () => {
      showToast({ message: translating("admin-settings.form.password.edit.error"), type: "ERROR" })
    }
  })
  const mutationPhone = useMutation(editPhone, {
    onSuccess: async () => {
      showToast({ message: translating("admin-settings.form.phone.edit.success"), type: "SUCCESS" })
    },
    onError: () => {
      showToast({ message: translating("admin-settings.form.phone.edit.error"), type: "ERROR" })
    }
  })

  const onEditFullNameSubmit = async (data: { newFullName: string }, formik: FormikHelpers<{ newFullName: string }>) => {
    await mutationFullName.mutateAsync(data)
    formik.setSubmitting(false)
    formik.resetForm()
  }

  const onEditPasswordSubmit = async (data: editPasswordAdmin, formik: FormikHelpers<editPasswordAdmin>) => {
    await mutationPassword.mutateAsync(data)
    formik.setSubmitting(false)
    formik.resetForm()
  }

  const onEditPhoneSubmit = async (data: editPhoneAdmin, formik: FormikHelpers<editPhoneAdmin>) => {
    await mutationPhone.mutateAsync(data)
    formik.setSubmitting(false)
    formik.resetForm()
  }

  return (
    <Page id='admin-settings'>
      <Header name={translating("admin-settings.title")} />

      <Scroll>
        <div className="flex-center flex-column px-2 pt-3 g-3">
          <Formik
            initialValues={{ newFullName: "" }}
            validationSchema={editAdminFullNameSchema(
              translating("admin-settings.form.fullName.fields.fullName.error.required"))}
            onSubmit={onEditFullNameSubmit}
          >
            {(formik) => (
              <Form className='form align-items-end row g-1 w-100 border pt-2 pb-4 border-top-0 border-end-0 border-start-0'>
                <h3 className='fw-semibold text-center'>{translating("admin-settings.form.fullName.title")}</h3>

                <Col xs={8}>
                  <FormikControl
                    formGroupClassName='flex-1'
                    control='input'
                    name='newFullName'
                    label={translating("admin-settings.form.fullName.fields.fullName.label")}
                    type='text'
                  />
                </Col>

                <Col xs={4}>
                  <Button
                    type='submit'
                    disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
                  >
                    {translating("admin-settings.edit-button")}
                  </Button>
                </Col>
              </Form>
            )}
          </Formik>

          <Formik
            initialValues={initialValueEditAdminPassword}
            validationSchema={editAdminPasswordSchema(
              translating("admin-settings.form.password.fields.password.error.required"),
              translating("admin-settings.form.password.fields.newPassword.error.required")
            )}
            onSubmit={onEditPasswordSubmit}
          >
            {(formik) => (
              <Form className='form flex-center flex-column g-1 w-100 border pt-2 pb-4 border-top-0 border-end-0 border-start-0 gap-2'>
                <h3 className='fw-semibold text-center'>{translating("admin-settings.form.password.title")}</h3>

                <FormikControl
                  formGroupClassName='w-100'
                  control='input'
                  name='password'
                  label={translating("admin-settings.form.password.fields.password.label")}
                  type='password'
                />

                <FormikControl
                  formGroupClassName='w-100'
                  control='input'
                  name='newPassword'
                  label={translating("admin-settings.form.password.fields.newPassword.label")}
                  type='password'
                />

                <Button
                  type='submit'
                  disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
                >
                  {translating("admin-settings.edit-button")}
                </Button>
              </Form>
            )}
          </Formik>

          <Formik
            initialValues={initialValueEditAdminPhone}
            validationSchema={editAdminPhoneSchema(
              translating("admin-settings.form.phone.fields.password.error.required"),
              translating("admin-settings.form.phone.fields.newPhone.error.required"),
            )}
            onSubmit={onEditPhoneSubmit}
          >
            {(formik) => (
              <Form className='form flex-center flex-column g-1 w-100 pt-2 pb-4 gap-2'>
                <h3 className='fw-semibold text-center'>{translating("admin-settings.form.phone.title")}</h3>

                <FormikControl
                  formGroupClassName='w-100'
                  control='input'
                  name='password'
                  label={translating("admin-settings.form.phone.fields.password.label")}
                  type='password'
                />

                <FormikControl
                  formGroupClassName='w-100'
                  control='input'
                  name='newPhone'
                  label={translating("admin-settings.form.phone.fields.newPhone.label")}
                  type='text'
                  inputMode='numeric'
                  pattern='[0-9]*'
                />
                <input type="text" inputMode='numeric' />

                <Button
                  type='submit'
                  disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
                >
                  {translating("admin-settings.edit-button")}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Scroll>
    </Page>
  )
}

export default AdminSettings
