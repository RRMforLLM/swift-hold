export const createTables = [
  // UNIFORMS table
  `CREATE TABLE IF NOT EXISTS UNIFORMS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    size TEXT NOT NULL
  );`,

  // OPERATIONS table
  `CREATE TABLE IF NOT EXISTS OPERATIONS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    operation INTEGER NOT NULL, -- 1 for entry, 0 for exit
    uniform INTEGER NOT NULL,
    store TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    date TEXT NOT NULL,
    FOREIGN KEY(uniform) REFERENCES UNIFORMS(id)
  );`,

  // OPERATOR table
  `CREATE TABLE IF NOT EXISTS OPERATOR (
    name TEXT,
    stores TEXT -- Store list as a JSON string
  );`
];