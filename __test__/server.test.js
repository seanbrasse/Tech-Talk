const request = require('supertest');
const { app } = require('../server/index');

describe('GET /getComments', () => {
  it('responds with status 200', async () => {
    const response = await request(app).get('/getComments');
    expect(response.status).toBe(200);
  });
});

describe('POST /createComment', () => {
    it('responds with status 200', async () => {
      const response = await request(app)
        .post('/createComment')
        .send({ name: 'John Doe', title: 'Test Comment', message: 'This is a test comment' });
  
      expect(response.status).toBe(200);
    });
  });


  //This test may be failing because of my caching attempt making deleting from the local state not delete from the db
  describe('DELETE /deleteComment/:id', () => {
    it('responds with status 200 and deletes the comment', async () => {
      // First it creates a comment to delete
      const createResponse = await request(app)
        .post('/createComment')
        .send({
          name: 'Ash Ketchum',
          title: 'Test Comment',
          message: 'This is a test comment.'
        });
      expect(createResponse.status).toBe(200);
  
      // Then it attempts to delete the comment and check the response
      const deleteResponse = await request(app)
        .delete(`/deleteComment/${createResponse.body.id}`);
      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.body.success).toBe(true);
  
      // Finally try to get the deleted comment and make sure it doesn't exist
      const getResponse = await request(app)
        .get(`/getComment/${createResponse.body.id}`);
      expect(getResponse.status).toBe(404);
    });
  });