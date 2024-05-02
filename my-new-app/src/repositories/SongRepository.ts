import sqlite3 from "sqlite3"

export class SongRepository
{
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
    
}
