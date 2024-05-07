import { ChangeEvent, FormEvent, useState } from 'react';
import { Song } from "../models/Song";
import { EditProps, UpdateProps } from "../../interface";
import { useParams } from "react-router-dom";
import { SongForm } from "./SongForm";

export function EditSong({ updateData, songs }: EditProps) {

  const { id } = useParams();
  let editSong: Song = null;
  if (id) {
    editSong = songs.find(song => song.ID === id)
  }

  //TODO: Add a condition to check the ID, 
  // search for the song with the corresponding ID
  // If that song is not found, use the empty object template

  const [formData, setFormData] = useState<Song>(editSong);

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
      //await window.DB.addSong(formData);
      updateData();

    } catch (error) {
      console.error(error);
    }

    // Reset form fields after submission
    setFormData({
      ID: null,
      title: '',
      artist: '',
      genre: '',
      lyrics: ''
    });
  };

  return <SongForm formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />

};
