import Database from "better-sqlite3";
import { Song } from "../models/Song";
import stringUtilsModule from "../utils/stringUtils";
import { app } from "electron";

const dbPath = app.getPath("desktop") + "/songs.db";

// Create ONE connection (important)
const db = new Database(dbPath);

export class SongRepository {

    static GetAllData() {
        const stmt = db.prepare("SELECT * FROM song;");
        return stmt.all();
    }

    static GetAllGenres() {
        const stmt = db.prepare("SELECT DISTINCT genre FROM song;");
        return stmt.all();
    }

    static AddSong(songToAdd: Song) {
        songToAdd.artist = stringUtilsModule.normalizeName(songToAdd.artist);
        songToAdd.title = songToAdd.title.toUpperCase();

        const stmt = db.prepare(
            "INSERT INTO song (title, lyrics, genre, artist) VALUES (?, ?, ?, ?)"
        );

        const result = stmt.run(
            songToAdd.title,
            songToAdd.lyrics,
            songToAdd.genre,
            songToAdd.artist
        );

        console.log(`Inserted row with id ${result.lastInsertRowid}`);
        return { id: result.lastInsertRowid };
    }

    static EditSong(songToEdit: Song) {
        songToEdit.artist = stringUtilsModule.normalizeName(songToEdit.artist);
        songToEdit.title = songToEdit.title.toUpperCase();

        const stmt = db.prepare(`
            UPDATE song 
            SET title = ?, lyrics = ?, genre = ?, artist = ?
            WHERE id = ?
        `);

        stmt.run(
            songToEdit.title,
            songToEdit.lyrics,
            songToEdit.genre,
            songToEdit.artist,
            songToEdit.ID
        );
    }

    static DeleteSong(id: number) {
        const stmt = db.prepare("DELETE FROM song WHERE id = ?");
        stmt.run(id);
    }
}