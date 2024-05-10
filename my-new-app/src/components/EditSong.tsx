import { ChangeEvent, FormEvent, useState } from 'react';
import { Song } from "../models/Song";
import { EditProps } from "../../interface";
import { useParams } from "react-router-dom";
import { SongForm } from "./SongForm";
import { useNavigate } from "react-router-dom";
import ConfirmDeletionModal from "./ConfirmDeleteModal";

export function EditSong({ updateData, songs }: EditProps) {

  const { id } = useParams();
  let editSong: Song = null;
  if (id) {
    editSong = songs.find(song => song.ID === Number(id))
  }

  // States to handle modal display ///////
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /////////////////////////////////////////

  const [formData, setFormData] = useState<Song>(editSong);
  const navigate = useNavigate();


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await window.DB.editSong(formData);
      await updateData();
      navigate("/browse")

    } catch (error) {
      console.error(error);
    }



  };

  return <><div className="d-flex flex-column justify-content-center">
    <h2 className="my-2 text-center">Editar Canción</h2>
    <SongForm formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
    <button id="delete-song-btn" onClick={handleShow} className="btn btn-danger">Borrar Canción</button>
  </div>
    <ConfirmDeletionModal updateData={updateData} song={formData} show={show} handleClose={handleClose} />
  </>

};