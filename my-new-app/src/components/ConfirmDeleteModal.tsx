import { ModalProps } from "../../interface";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmDeletionModal({ song, handleClose, show }: ModalProps) {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>¿Borrar Canción?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>¿Seguro quiere borrar la canción {song.title}?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleClose} variant="secondary">Cancelar</Button>
          <Button variant="danger">Confirmar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ConfirmDeletionModal;