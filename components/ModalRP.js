import React, { Children } from 'react'
import ReactDOM from 'react-dom'
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

export default function ModalRP({
  btn = 'Open Modal',
  title = 'Modal title',
  onOpen = () => null,
  onClose = () => null,
  children,
  className,
}) {
  const [modalIsOpen, setIsOpen] = React.useState(false)
  function openModal() {
    onOpen()
    setIsOpen(true)
  }
  function closeModal() {
    onClose()
    setIsOpen(false)
  }
  return (
    <div className={className}>
      <button onClick={openModal}>{btn}</button>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <h3 className="mb-8 bg-[#908161] p-2 text-center text-white ">
          {title}
        </h3>
        <div className="px-4 ">
          <div>{children(closeModal)}</div>
        </div>
      </Modal>
    </div>
  )
}
