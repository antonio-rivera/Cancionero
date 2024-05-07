import { ChangeEvent, FormEvent, useState } from 'react';
import { Song } from "../models/Song";
import { UpdateProps } from "../../interface";
import { useParams } from "react-router-dom";
import { SongForm } from "./SongForm";

export function AddSong({ updateData }: UpdateProps) {

  // const { id } = useParams();
  // const objectTemplate: Song = {
  //   ID: null,
  //   title: '',
  //   artist: '',
  //   genre: '',
  //   lyrics: ''
  // }

  //TODO: Add a condition to check the ID, 
  // search for the song with the corresponding ID
  // If that song is not found, use the empty object template

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
