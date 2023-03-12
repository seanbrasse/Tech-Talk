// This is a class that interacts with a database through a data access object.
class Comment {
  constructor(dataAccessObject) {
    // The constructor takes a data access object as an argument and saves it to a class property.
    this.dataAccessObject = dataAccessObject;
  }

  // This method creates a comments table in the database if it doesn't already exist.
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

  // This method deletes a single comment from the database using its UUID.
  deleteComment(uuid) {
    return this.dataAccessObject.run(
      'DELETE FROM comments WHERE uuid = ?',
      [uuid]
    ).then(result => {
      // The method returns an object with a success property indicating whether the comment was deleted or not.
      const success = result.changes > 0;
      return { success };
    }).catch(error => {
      // If an error occurs, the method returns an object with a success property of false and an error property containing the error.
      return { success: false, error };
    });
  }  

  // This method deletes all comments from the database.
  deleteComments() {
    const sql = 'DELETE FROM comments';
    return this.dataAccessObject.run(sql);
  }

  // This method creates a new comment in the database.
  createComment({ uuid, name, title, message }) {
    return this.dataAccessObject.run(
      'INSERT INTO comments (uuid, name, title, message) VALUES (?, ?, ?, ?)',
      [uuid, name, title, message]
    );
  }

  // This method retrieves a single comment from the database using its UUID.
  getComment(uuid) {
    return this.dataAccessObject.get(
      'SELECT * FROM comments WHERE uuid = ?',
      [uuid]
    );
  }

  // This method retrieves all comments from the database in descending order of creation date.
  getComments() {
    return this.dataAccessObject.all('SELECT * FROM comments ORDER BY created DESC');
  }
}

// Export the Comment class so that it can be used in other parts of the application.
module.exports = Comment;
