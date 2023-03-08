class Comment {
  constructor(dataAccessObject) {
    this.dataAccessObject = dataAccessObject;
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT UNIQUE,
      name TEXT,
      title TEXT,
      message TEXT,
      created DATETIME DEFAULT CURRENT_TIMESTAMP)`;
    return this.dataAccessObject.run(sql);
  }

  deleteComment(uuid) {
    return this.dataAccessObject.run(
      'DELETE FROM comments WHERE uuid = ?',
      [uuid]
    ).then(result => {
      const success = result.changes > 0;
      return { success };
    }).catch(error => {
      return { success: false, error };
    });
  }  

  deleteComments() {
    const sql = 'DELETE FROM comments';
    return this.dataAccessObject.run(sql);
  }

  createComment({ uuid, name, title, message }) {
    return this.dataAccessObject.run(
      'INSERT INTO comments (uuid, name, title, message) VALUES (?, ?, ?, ?)',
      [uuid, name, title, message]
    );
  }

  getComment(uuid) {
    return this.dataAccessObject.get(
      'SELECT * FROM comments WHERE uuid = ?',
      [uuid]
    );
  }

  getComments() {
    return this.dataAccessObject.all('SELECT * FROM comments ORDER BY created DESC');
  }
}

module.exports = Comment;
