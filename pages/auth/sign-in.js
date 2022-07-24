import { useEffect } from 'react'
import * as Yup from 'yup'
import AuthNavigate from '../../components/AuthNavigate'
import ResetPassword from '../../components/ChangePassword/ResetPassword'
import FormikForm from '../../components/FormikForm'
import ModalRP from '../../components/ModalRP'
import useAuth from '../../hooks/useAuth'
const SignInPage = () => {
  const { signIn } = useAuth()

  useEffect(() => {
    localStorage.clear()
  }, [])

  const inputForms = [
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      placeholder: 'example@email.com',
    },
    {
      label: 'Password',
      type: 'password',
      name: 'password',
      placeholder: '******',
    },
  ]
  const initialValues = {
    email: 'ignacio.alvarez@desintegra.com',
    password: '81dc9bdb52d04dc20036dbd8313ed055',
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Debe ingresar un email valido')
      .max(255)
      .required('Debe ingresar un email'),
    password: Yup.string().max(255).required('Debe ingresar la contraseña'),
  })

  return (
    <div className="absolute h-screen w-full bg-[url('../public/imgs/loginimage.jpg')]">
      <div className="h-full bg-black bg-opacity-60">
        <div className="relative max-w-lg px-4 pb-24 mx-auto top-1/4 bg-neutral-900 ">
          <h2 className="py-8 font-bold text-center uppercase text-primary">
            Iniciar sesión
          </h2>
          <FormikForm
            inputForms={inputForms}
            initialValues={initialValues}
            validationSchema={validationSchema}
            submitFunction={signIn}
            btnText="Ingresar"
            enableCerrar={false}
          />
          <div className="flex justify-center mt-4">
            <ModalRP
              title="Recuperar contraseña"
              btn={
                <p className="text-white cursor-pointer hover:text-gray-600">
                  ¿Has olvidado tu contraseña?
                </p>
              }
            >
              {(close) => <ResetPassword closeForm={close} />}
            </ModalRP>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignInPage
