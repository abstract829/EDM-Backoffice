import { useMutateSala, useQuerySalaById } from '../../hooks/salas'
import FormikForm from '../FormikForm'
import * as Yup from 'yup'
import Alerts from '../Alerts'
import LoaderWhen from '../LoaderWhen'
import Alert from '../Alert'
const EditSala = ({ id, closeModal }) => {
  const { mutate: editSala, isErrorMutating, isSuccess } = useMutateSala()
  const { data: sala, isError, isLoading } = useQuerySalaById({ id })
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
    // {
    //   label: 'Disponible Online',
    //   type: 'select',
    //   name: 'DisponibleOnLine',
    //   options: [
    //     { value: 'SI', text: 'SI' },
    //     { value: 'NO', text: 'NO' },
    //   ],
    // },
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
    Nombre: sala && sala.data.Nombre,
    // DisponibleOnLine: sala && sala.data.DisponibleOnLine,
    Activo: sala && sala.data.Activo,
  }
  const validationSchema = Yup.object().shape({
    Nombre: Yup.string().max(255).required('Debe ingresar un nombre'),
    Activo: Yup.string().required('Seleccione una opción'),
    // DisponibleOnLine: Yup.string().required('Seleccione una opción'),
  })
  const handleSubmit = (values) => {
    let request
    // if (!sala.DisponibleOnLine && values.DisponibleOnLine === 'SI') {
    //   request = {
    //     ...sala.data,
    //     DiasBloqueados: {
    //       Lunes: 'NO',
    //       Martes: 'NO',
    //       Miercoles: 'NO',
    //       Jueves: 'NO',
    //       Viernes: 'NO',
    //       Sabado: 'NO',
    //       Domingo: 'NO',
    //       Sala: 'NO',
    //     },
    //     ...values,
    //   }
    // } else {
    //   request = {
    //     ...sala.data,
    //     ...values,
    //   }
    // }
    request = {
      ...sala.data,
      ...values,
    }
    editSala(request)
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
          succesText="Sala editada correctamente!"
          failedText="Hubo un error inesperado"
        />
      </div>
    </LoaderWhen>
  )
}
export default EditSala
