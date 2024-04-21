import sqlite3 from "sqlite3"

export class SongRepository
{
static GetAllData() {
// Open SQLite database
const db = new sqlite3.Database('songs.db');

const query = 'SELECT * FROM song;';

// Execute the query
db.all(query, (err, rows) => {
    if (err) {
        console.error(err.message);
        return;
    }


    // Close the database connection
    db.close(err => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Database connection closed.');
        return rows
    });
});
}  

}

