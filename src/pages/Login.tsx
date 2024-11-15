import React from 'react'
import Logo from "../assets/images/logo.jpg"
import { Form, Formik, FormikHelpers } from 'formik'
import { initialLoginValues, loginValidationSchema } from '../misc/config'
import FormikControl from '../components/form/FormikControl'
import Button from '../components/form/Button'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { useAppContext } from '../context/AppProvider'
import { login } from '../api-client'
import { LoginForm } from '../misc/types'
import { FiPhone } from "react-icons/fi";
import { IoLockOpenOutline } from "react-icons/io5";

const Login = (): React.JSX.Element => {
  const { showToast } = useAppContext()

  const { t: translating } = useTranslation("global")
  const queryClient = useQueryClient()
  const mutationLogin = useMutation(login, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken")
      showToast({ message: translating("login.success"), type: "SUCCESS" })
    },
    onError: () => {
      showToast({ message: translating("login.error"), type: "ERROR" })
    },
  })

  const onSubmit = async (data: LoginForm, formik: FormikHelpers<LoginForm>) => {
    await mutationLogin.mutateAsync(data)
    formik.setSubmitting(false)
  }

  return (
    <div id="login" className='h-100vh flex-center flex-column gap-3 bg-white px-3'>
      <img src={Logo} alt='logo' loading='lazy' className='img-fluid mb-5' width={340} height={140} />

      <Formik
        initialValues={initialLoginValues}
        validationSchema={loginValidationSchema(
          translating("login.phone-number.error.required"),
          translating("login.password.error"))}
        onSubmit={onSubmit}
      >
        {formik => (
          <Form className='form d-flex flex-column gap-3 w-100'>
            <FormikControl
              control='input'
              name='phone'
              label={translating("login.phone-number.label")}
              type="text"
              pattern='[0-9]*'
              inputMode='numeric'
              Icon={<FiPhone />}
            />

            <FormikControl
              control='input'
              name='password'
              label={translating("login.password.label")}
              type="password"
              Icon={<IoLockOpenOutline />}
            />
            <Button
              type='submit'
              disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
            >
              {translating("login.submit")}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login
