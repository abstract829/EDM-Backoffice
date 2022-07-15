import FormikForm from '../FormikForm'
import * as Yup from 'yup'
import Alerts from '../Alerts'
import { useMutateEmpresa, useQueryEmpresaById } from '../../hooks/empresas'
import { checkRut } from '../../utils/utils'
import NoAccess from '../NoAccess'
const EditEmpresa = ({ empresa, closeModal }) => {
  const {data} = useQueryEmpresaById({id:empresa.EmpresaId})
  const {
    mutate: editEmpresa,
    isError: isErrorMutating,
    isSuccess,
  } = useMutateEmpresa()
  if(!data){
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
    Nombre: empresa.Nombre,
    Rut: empresa.Rut,
    Activo: empresa.Activo,
    CodigoSAP: empresa.CodigoSAP,
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
        ...empresa,
        ...values,
        Rut,
      }
      editEmpresa(request)
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
        succesText="Empresa editada correctamente!"
        failedText="Hubo un error inesperado"
      />
    </>
  )
}
export default EditEmpresa
