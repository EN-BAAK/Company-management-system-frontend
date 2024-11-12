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

const AdminSettings = (): React.JSX.Element => {
  const { showToast } = useAppContext()
  const mutationFullName = useMutation(editFullName, {
    onSuccess: async () => {
      showToast({ message: "", type: "SUCCESS" })
    },
    onError: () => {
      showToast({ message: "", type: "ERROR" })
    }
  })
  const mutationPassword = useMutation(editPassword, {
    onSuccess: async () => {
      showToast({ message: "", type: "SUCCESS" })
    },
    onError: () => {
      showToast({ message: "", type: "ERROR" })
    }
  })
  const mutationPhone = useMutation(editPhone, {
    onSuccess: async () => {
      showToast({ message: "", type: "SUCCESS" })
    },
    onError: () => {
      showToast({ message: "", type: "ERROR" })
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
    <Page id='admin-settings' className='d-flex flex-column align-items-start overflow-hidden max-h-90vh'>
      <Header name='Admin Settings' />

      <Scroll>
        <div className="flex-center flex-column px-2 pt-3 g-3">
          <Formik
            initialValues={{ newFullName: "" }}
            validationSchema={editAdminFullNameSchema("f")}
            onSubmit={onEditFullNameSubmit}
          >
            {(formik) => (
              <Form className='form align-items-end row g-1 w-100 border pt-2 pb-4 border-top-0 border-end-0 border-start-0'>
                <h3 className='fw-semibold text-center'>Edit FullName</h3>

                <Col xs={8}>
                  <FormikControl
                    formGroupClassName='flex-1'
                    control='input'
                    name='newFullName'
                    label='Full name'
                    type='text'
                  />
                </Col>

                <Col xs={4}>
                  <Button
                    type='submit'
                    disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
                  >
                    Edit
                  </Button>
                </Col>
              </Form>
            )}
          </Formik>

          <Formik
            initialValues={initialValueEditAdminPassword}
            validationSchema={editAdminPasswordSchema("", "")}
            onSubmit={onEditPasswordSubmit}
          >
            {(formik) => (
              <Form className='form flex-center flex-column g-1 w-100 border pt-2 pb-4 border-top-0 border-end-0 border-start-0 gap-2'>
                <h3 className='fw-semibold text-center'>Edit Password</h3>

                <FormikControl
                  formGroupClassName='w-100'
                  control='input'
                  name='password'
                  label='Password'
                  type='password'
                />

                <FormikControl
                  formGroupClassName='w-100'
                  control='input'
                  name='newPassword'
                  label='new Password'
                  type='password'
                />

                <Button
                  type='submit'
                  disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
                >
                  Edit
                </Button>
              </Form>
            )}
          </Formik>

          <Formik
            initialValues={initialValueEditAdminPhone}
            validationSchema={editAdminPhoneSchema("", "", "")}
            onSubmit={onEditPhoneSubmit}
          >
            {(formik) => (
              <Form className='form flex-center flex-column g-1 w-100 pt-2 pb-4 gap-2'>
                <h3 className='fw-semibold text-center'>Edit Phone</h3>

                <FormikControl
                  formGroupClassName='w-100'
                  control='input'
                  name='password'
                  label='Password'
                  type='password'
                />

                <FormikControl
                  formGroupClassName='w-100'
                  control='input'
                  name='newPhone'
                  label='new phone'
                  type='text'
                />

                <Button
                  type='submit'
                  disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
                >
                  Edit
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
