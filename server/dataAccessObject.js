const sqlite3 = require('sqlite3');
const fs = require('fs');

class DataAccessObject {
  constructor(dbPath) {
    if (!fs.existsSync(dbPath)) {
      fs.closeSync(fs.openSync(dbPath, 'w'));
    }
    this.db = new sqlite3.Database(dbPath, error => {
      if (error) {
        console.log('Could not connect to database', error);
      } else {
        console.log('Connected to database');
      }
    });
  }

  // Helper function to log errors when executing SQL commands
  printError(sql, error) {
    console.log(`Error running sql ${sql}\n${error}`);
  }

  // Function that executes a single SQL command that doesn't return data
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      // Execute the SQL command and pass the result to the promise's resolve or reject function depending on whether there was an error
      this.db.run(sql, params, function(error) {
        if (error) {
          this.printError(sql, error);
          reject(error);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  // Function that executes a single SQL command that returns a single row of data
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, function(error, result) {
        if (error) {
          this.printError(sql, error);
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Function that executes a single SQL command that returns multiple rows of data
  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, function(error, rows) {
        if (error) {
          this.printError(sql, error);
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = DataAccessObject;
