import FormikForm from '../FormikForm'
import * as Yup from 'yup'
import Alerts from '../Alerts'
import { useMutatePerfil, useQueryPerfilById } from '../../hooks/perfiles'
import LoaderWhen from '../LoaderWhen'
import Alert from '../Alert'
import NoAccess from '../NoAccess'
const EditPerfil = ({ id, closeModal }) => {
  const { mutate: editPerfil, isErrorMutating, isSuccess } = useMutatePerfil()
  const { data: perfil, isLoading, isError } = useQueryPerfilById({ id })
  if(!perfil){
    return (
      <>
        <NoAccess/>
        <button
        className="block px-4 py-2 mt-8 text-white bg-slate-600"
        onClick={closeModal}
        >
        Cerrar
        </button>
      </>
    )
  }
  if (isError) {
    return <Alert type="failed">Hubo un error inesperado</Alert>
  }
  const inputForms = [
    {
      label: 'Nombre',
      type: 'text',
      name: 'Nombre',
      placeholder: 'Nombre',
    },
    {
      label: 'Activo',
      type: 'select',
      name: 'Activo',
      options: [
        { value: 'SI', text: 'SI' },
        { value: 'NO', text: 'NO' },
      ],
    },
  ]
  const initialValues = {
    Nombre: perfil && perfil.data.Nombre,
    Activo: perfil && perfil.data.Activo,
  }
  const validationSchema = Yup.object().shape({
    Nombre: Yup.string().max(255).required('Debe ingresar un nombre'),
    Activo: Yup.string().required('Seleccione una opción'),
  })
  const handleSubmit = (values) => {
    editPerfil({ ...perfil.data, ...values })
  }
  return (
    <LoaderWhen isTrue={isLoading}>
      <div className="w-96">
        <FormikForm
          inputForms={inputForms}
          initialValues={initialValues}
          validationSchema={validationSchema}
          submitFunction={handleSubmit}
          btnText="Guardar"
          closeForm={closeModal}
        />
        <Alerts
          successIf={isSuccess}
          failedIf={isErrorMutating}
          succesText="Perfil editado correctamente!"
          failedText="Hubo un error inesperado"
        />
      </div>
    </LoaderWhen>
  )
}
export default EditPerfil
