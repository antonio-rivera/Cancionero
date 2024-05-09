import { FormProps } from "../../interface";

export function SongForm({ handleInputChange, handleSubmit, formData }: FormProps) {

  return (
    <div className="container mt-5">
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
}