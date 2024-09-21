import * as SQLite from 'expo-sqlite';

 export const db = SQLite.openDatabaseSync('bracketz.db');

const pragma_foreign_keys = 'PRAGMA foreign_keys = ON;';

const tournaments_table = 
`CREATE TABLE IF NOT EXISTS tournaments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        format INTEGER NOT NULL,
        UNIQUE(name)
      );`;

const users_table =
`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        UNIQUE(name)
      );`;

const rounds_table =
`CREATE TABLE IF NOT EXISTS rounds (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tournaments_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        round_number INTEGER NOT NULL,
        FOREIGN KEY (tournaments_id) REFERENCES tournaments(id) ON DELETE CASCADE
      );`;

const matches_table =
`CREATE TABLE IF NOT EXISTS matches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        round_id INTEGER NOT NULL,
        status INTEGER NOT NULL,
        FOREIGN KEY (round_id) REFERENCES rounds(id) ON DELETE CASCADE
      );`;

const tournament_participants_table =   
`CREATE TABLE IF NOT EXISTS tournament_participants (
        tournaments_id INTEGER NOT NULL,
        users_id INTEGER NOT NULL,
        PRIMARY KEY (tournaments_id, users_id),
        FOREIGN KEY (tournaments_id) REFERENCES tournaments(id) ON DELETE CASCADE,
        FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE
      );`;

const match_participants_table =    
`CREATE TABLE IF NOT EXISTS match_participants (
        matches_id INTEGER NOT NULL,
        users_id INTEGER NOT NULL,
        score INTEGER DEFAULT 0,
        PRIMARY KEY (matches_id, users_id),
        FOREIGN KEY (matches_id) REFERENCES matches(id) ON DELETE CASCADE,
        FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE
      );`;


// Indexes
const indexes = [
  // Index on round_id in the matches table
  `CREATE INDEX IF NOT EXISTS idx_round_id ON matches (round_id);`,
  
  // Composite index on tournaments_id and users_id in tournament_participants
  `CREATE INDEX IF NOT EXISTS idx_tournament_participants ON tournament_participants (tournaments_id, users_id);`,
  
  // Composite index on matches_id and users_id in match_participants
  `CREATE INDEX IF NOT EXISTS idx_match_participants ON match_participants (matches_id, users_id);`
];

export const createSchema = async () => {
    try {
        await db.execAsync(pragma_foreign_keys
            + tournaments_table
            + users_table
            + rounds_table
            + matches_table
            + tournament_participants_table
            + match_participants_table
            + indexes.join(''));
        
        console.log('Schema created successfully');
    } catch (error) {
        console.log('Error creating schema', error);
    }
};







