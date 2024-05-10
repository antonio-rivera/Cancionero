import { ModalProps } from "../../interface";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";

function ConfirmDeletionModal({ song, updateData, handleClose, show }: ModalProps) {

  const navigate = useNavigate();

  async function sendDeleteRequest() {
    try {
      await window.DB.deleteSong(song.ID);
      await updateData();
      handleClose()

    } catch (error) {
      console.error("Could not send delete request", error);
    }
    navigate("/browse")

  }

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
          <Button onClick={sendDeleteRequest} variant="danger">Confirmar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ConfirmDeletionModal;