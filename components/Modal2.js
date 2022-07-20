import { useState } from 'react'
import Modal from 'react-modal'
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}
Modal.setAppElement('#modal-root')
const Modal2 = ({
  setOpen,
  title,
  children,
  onClose = () => null,
  showCancel = true,
}) => {
  const [isOpen, setIsOpen] = useState(setOpen)
  const closeModal = () => {
    onClose()
    setIsOpen(false)
  }
  return (
    <Modal isOpen={isOpen} style={customStyles}>
      <h3 className="mb-8 bg-[#908161] p-2 text-center text-white ">{title}</h3>
      <div className="px-4 py-2">
        <div>{children(closeModal)}</div>
        {showCancel && (
          <div className="flex justify-end mt-8">
            <button
              className="px-4 py-2 text-white bg-slate-600"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}
export default Modal2
