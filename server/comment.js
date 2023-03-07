class Comment {
  constructor(dataAccessObject) {
    this.dataAccessObject = dataAccessObject;
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      title TEXT,
      message TEXT,
      created DATETIME DEFAULT CURRENT_TIMESTAMP)`;
    return this.dataAccessObject.run(sql);
  }

  deleteComment(id) {
    return this.dataAccessObject.run(
      'DELETE FROM comments WHERE id = ?',
      [id]
    );
  }  

  deleteComments() {
    const sql = 'DELETE FROM comments';
    return this.dataAccessObject.run(sql);
  }

  createComment({ name, title, message }) {
    return this.dataAccessObject.run(
      'INSERT INTO comments (name, title, message) VALUES (?, ?, ?)',
      [name, title, message]
    );
  }

  getComment(id) {
    return this.dataAccessObject.get(
      'SELECT * FROM comments WHERE id = ?',
      [id]
    );
  }

  getComments() {
    return this.dataAccessObject.all('SELECT * FROM comments ORDER BY created DESC');
  }
}

module.exports = Comment;
