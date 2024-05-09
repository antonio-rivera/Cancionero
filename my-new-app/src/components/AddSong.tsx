import { ChangeEvent, FormEvent, useState } from 'react';
import { Song } from "../models/Song";
import { UpdateProps } from "../../interface";
import { SongForm } from "./SongForm";

export function AddSong({ updateData }: UpdateProps) {

  const [formData, setFormData] = useState<Song>({
    ID: null,
    title: '',
    artist: '',
    genre: '',
    lyrics: ''
  });

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
      await window.DB.addSong(formData);
      await updateData();

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

  return <>
    <h2 className="my-2 text-center">Canción Nueva</h2>
    <SongForm formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
  </>

};
