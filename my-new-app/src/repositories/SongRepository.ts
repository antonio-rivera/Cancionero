import sqlite3 from "sqlite3"
import { Song } from "../models/Song";
import stringUtilsModule from "../utils/stringUtils";

type InsertResult = {
    id: number
}

export class SongRepository {
    static async GetAllData() {
        try {
            // Open SQLite database
            const db = new sqlite3.Database('songs.db');

            const query = 'SELECT * FROM song;';

            // Wrap the db.all() call with a Promise
            const rows = await new Promise((resolve, reject) => {
                db.all(query, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });

            // Close the database connection
            db.close((err) => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log('Database connection closed.');
                }
            });
            return rows; // Return the retrieved rows
        } catch (err) {
            console.error(err.message);
            throw err; // Re-throw the error for handling higher up
        }
    }

    static async GetAllGenres() {
        try {
            // Open SQLite database
            const db = new sqlite3.Database('songs.db');

            const query = 'SELECT DISTINCT song.genre FROM song;';

            // Wrap the db.all() call with a Promise
            const rows = await new Promise((resolve, reject) => {
                db.all(query, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });

            // Close the database connection
            db.close((err) => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log('Database connection closed.');
                }
            });
            return rows; // Return the retrieved rows
        } catch (err) {
            console.error(err.message);
            throw err; // Re-throw the error for handling higher up
        }
    }

    static async AddSong(songToAdd: Song) {

        const db = new sqlite3.Database('songs.db');

        const query = 'INSERT INTO song (title, lyrics, genre, artist) VALUES (?, ?, ?, ?)';

        // Normalize artist name and title before inserting
        songToAdd.artist = stringUtilsModule.normalizeName(songToAdd.artist);
        songToAdd.title = songToAdd.title.toUpperCase();

        const runAsync = (statement: string, values: string[]) => {
            return new Promise<InsertResult>((resolve, reject) => {
                db.run(statement, values, function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ id: this.lastID });
                    }
                });
            });
        };
        try {
            const result: InsertResult = await runAsync(query, [songToAdd.title, songToAdd.lyrics, songToAdd.genre, songToAdd.artist]);
            console.log(`A row has been inserted with rowid ${result.id}`);
        } catch (error) {
            console.error('Error inserting data:', error);
        } finally {
            db.close();
        }
    }

}