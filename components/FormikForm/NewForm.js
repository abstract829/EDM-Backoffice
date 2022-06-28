import { Form, Formik, Field } from 'formik'
import FormGroup from './FormGroup'
import * as Yup from 'yup'
import LoadIndicatorIf from '../LoadIndicatorIf'
import RenderIf from '../RenderIf'

const NewForm = ({
  style,
  className,
  form,
  submitFunction,
  btnText,
  closeForm,
  scroll = true,
  disabled = false,
  extra,
}) => {
  const initialValues = {}
  const validations = {}

  for (const input of form) {
    initialValues[input.name] = input.value

    if (!input.validations) continue
    let schema = Yup.string()
    for (const rule of input.validations) {
      if (rule.type === 'required') {
        schema = schema.required('El campo es obligatorio')
      }
      if (rule.type === 'email') {
        schema = schema.email('Ingrese un email valido')
      }
    }
    validations[input.name] = schema
  }
  return (
    <div style={style} className={className}>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(validations)}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await submitFunction(values)
          } catch (error) {
            const message = error.message || 'Hubo un error inesperado'
            setStatus({ success: false })
            setErrors({ submit: message })
            setSubmitting(false)
          }
        }}
      >
        {({ errors, handleSubmit, isSubmitting }) => (
          <Form className="max-w-3xl mx-auto">
            <RenderIf isTrue={errors.submit}>
              <span className="p-2 text-white bg-red-400">{errors.submit}</span>
            </RenderIf>
            <div
              className={
                scroll ? 'mt-4 max-h-[450px]  overflow-y-auto' : 'mt-4'
              }
            >
              <div className={`grid grid-cols-12 gap-x-8 gap-y-4 px-4`}>
                {form.map((input, index) => (
                  <div
                    key={input.name}
                    className={`${
                      input.type === 'textarea' ? 'col-span-4' : 'col-span-4'
                    }`}
                  >
                    <FormGroup
                      key={index}
                      label={input.label}
                      type={input.type}
                      name={input.name}
                      placeholder={input.placeholder}
                      options={input.options}
                      disabled={disabled || input.disabled}
                    />
                  </div>
                ))}
              </div>
              {extra}
            </div>
            <div className="grid grid-cols-12">
              {!disabled && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center w-full col-span-6 mt-8 font-bold uppercase button-secondary"
                >
                  <LoadIndicatorIf isTrue={isSubmitting} />
                  {btnText}
                </button>
              )}

              <button
                type="button"
                onClick={closeForm}
                className="flex items-center justify-center col-span-4 col-start-9 mt-8 font-bold uppercase button-cancel"
              >
                Cerrar
              </button>
            </div>
            {/* <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center w-full mt-8 font-bold uppercase button"
            >
              <LoadIndicatorIf isTrue={isSubmitting} />
              Guardar
            </button> */}
          </Form>
        )}
      </Formik>
    </div>
  )
}
export default NewForm
