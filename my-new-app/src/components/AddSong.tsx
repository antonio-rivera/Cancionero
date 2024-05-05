import { ChangeEvent, FormEvent, useState } from 'react';
import { Song } from "../models/Song";
import { UpdateProps } from "../../interface";
import { useParams } from "react-router-dom";

export function AddSong({ updateData }: UpdateProps) {

  const { id } = useParams();
  const objectTemplate: Song = {
    ID: null,
    title: '',
    artist: '',
    genre: '',
    lyrics: ''
  }

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

  return (
    <div className="container mt-5">
      <h2 className="text-center">Canción Nueva</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="artist" className="form-label">Artista</label>
          <input
            type="text"
            className="form-control"
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genre" className="form-label">Género</label>
          <input
            type="text"
            className="form-control"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lyrics" className="form-label">Letra</label>
          <textarea
            className="form-control"
            id="lyrics"
            name="lyrics"
            value={formData.lyrics}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="mb-2 btn btn-primary">Someter</button>
      </form>
    </div>
  );
};
