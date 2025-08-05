const request = require('supertest');
const app = require('../index'); // Assuming your Express app is exported from index.js

describe('Todo API', () => {
  // Before each test, reset the todos data
  beforeEach(async () => {
    // NODE_ENV is not being set by default when running tests via npm test.
    // For the /testing/reset endpoint to work, we need to ensure it's set.
    // This can be done by modifying the test script in package.json to:
    // "test": "NODE_ENV=test jest"
    // For now, we'll assume the endpoint is available or handle reset manually if needed.
    // Alternatively, if the app instance 'app' allows direct manipulation or has a reset method:
    // For this example, we rely on the /testing/reset endpoint.
    await request(app).post('/testing/reset').send();
  });

  // Test for POST /todos
  describe('POST /todos', () => {
    it('should create a new todo and return it with status 201', async () => {
      const newTodo = { task: 'Test Todo' };
      const response = await request(app)
        .post('/todos')
        .send(newTodo)
        .expect(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.task).toBe(newTodo.task);
    });

    it('should return status 400 if task is missing', async () => {
      await request(app).post('/todos').send({}).expect(400);
    });
  });

  // Test for GET /todos
  describe('GET /todos', () => {
    it('should return an empty array when no todos exist', async () => {
      const response = await request(app).get('/todos').expect(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(0);
    });

    it('should return all todos', async () => {
      // Add a todo first
      await request(app).post('/todos').send({ task: 'Todo 1' });
      await request(app).post('/todos').send({ task: 'Todo 2' });

      const response = await request(app).get('/todos').expect(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(2);
      expect(response.body[0].task).toBe('Todo 1');
      expect(response.body[1].task).toBe('Todo 2');
    });
  });

  // Test for GET /todos/:id
  describe('GET /todos/:id', () => {
    it('should return a specific todo if found', async () => {
      const newTodoRes = await request(app).post('/todos').send({ task: 'Specific Todo' });
      const todoId = newTodoRes.body.id;

      const response = await request(app).get(`/todos/${todoId}`).expect(200);
      expect(response.body.id).toBe(todoId);
      expect(response.body.task).toBe('Specific Todo');
    });

    it('should return status 404 if todo not found', async () => {
      await request(app).get('/todos/999').expect(404);
    });
  });

  // Test for PUT /todos/:id
  describe('PUT /todos/:id', () => {
    it('should update an existing todo and return it', async () => {
      const newTodoRes = await request(app).post('/todos').send({ task: 'Original Task' });
      const todoId = newTodoRes.body.id;
      const updatedTask = { task: 'Updated Task' };

      const response = await request(app)
        .put(`/todos/${todoId}`)
        .send(updatedTask)
        .expect(200);
      expect(response.body.id).toBe(todoId);
      expect(response.body.task).toBe(updatedTask.task);

      // Verify the update by fetching the todo again
      const verifyResponse = await request(app).get(`/todos/${todoId}`);
      expect(verifyResponse.body.task).toBe(updatedTask.task);
    });

    it('should return status 404 if todo to update is not found', async () => {
      await request(app).put('/todos/999').send({ task: 'Non-existent' }).expect(404);
    });

    it('should return status 400 if task is missing during update', async () => {
       const newTodoRes = await request(app).post('/todos').send({ task: 'Task to update' });
      const todoId = newTodoRes.body.id;
      await request(app).put(`/todos/${todoId}`).send({}).expect(400);
    });
  });

  // Test for DELETE /todos/:id
  describe('DELETE /todos/:id', () => {
    it('should delete an existing todo and return a success message', async () => {
      const newTodoRes = await request(app).post('/todos').send({ task: 'Task to Delete' });
      const todoId = newTodoRes.body.id;

      const response = await request(app).delete(`/todos/${todoId}`).expect(200);
      expect(response.body.message).toBe('Todo deleted successfully');
      expect(response.body.todo.id).toBe(todoId);

      // Verify the deletion by trying to fetch the todo
      await request(app).get(`/todos/${todoId}`).expect(404);
    });

    it('should return status 404 if todo to delete is not found', async () => {
      await request(app).delete('/todos/999').expect(404);
    });
  });
});
