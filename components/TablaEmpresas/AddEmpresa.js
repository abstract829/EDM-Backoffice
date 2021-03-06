import FormikForm from '../FormikForm'
import * as Yup from 'yup'
import Alerts from '../Alerts'
import { useMutateEmpresa } from '../../hooks/empresas'
import { checkRut } from '../../utils/utils'
const AddEmpresa = ({ closeModal }) => {
  const {
    mutate: addEmpresa,
    isError: isErrorMutating,
    isSuccess,
  } = useMutateEmpresa()
  const inputForms = [
    {
      label: 'Nombre',
      type: 'text',
      name: 'Nombre',
      placeholder: 'Nombre Empresa',
    },
    {
      label: 'RUT',
      type: 'text',
      name: 'Rut',
      placeholder: '11.111.111-1',
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
    {
      label: 'Codigo SAP',
      type: 'text',
      name: 'CodigoSAP',
      placeholder: '',
    },
  ]
  const initialValues = {
    Nombre: '',
    Rut: '',
    Activo: 'SI',
    CodigoSAP: '',
  }
  const validationSchema = Yup.object().shape({
    Rut: Yup.string().required('Debe ingresar un RUT'),
    Nombre: Yup.string().max(255).required('Debe ingresar un nombre'),
    Activo: Yup.string().required('Seleccione una opción'),
    CodigoSAP: Yup.string().required('El campo es obligatorio'),
  })
  const handleSubmit = async (values) => {
    const [isValidRut, Rut] = checkRut(values.Rut)
    if (isValidRut) {
      const request = {
        EmpresaId: 0,
        ...values,
        Rut,
      }
      addEmpresa(request)
    } else {
      throw new Error('RUT Invalido')
    }
  }
  return (
    <>
      <div className="w-96">
        <FormikForm
          inputForms={inputForms}
          initialValues={initialValues}
          validationSchema={validationSchema}
          submitFunction={handleSubmit}
          btnText="Guardar"
          closeForm={closeModal}
        />
      </div>
      <Alerts
        successIf={isSuccess}
        failedIf={isErrorMutating}
        succesText="Empresa creada correctamente!"
        failedText="Hubo un error inesperado"
      />
    </>
  )
}
export default AddEmpresa
