# Simple Node.js App

This is a basic Node.js application using the Express framework.

## Prerequisites

- Node.js (version X.X.X or higher recommended)
- npm (usually comes with Node.js)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project_directory>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Open your browser and go to `http://localhost:3000` to see the "Hello World!" message.

## Available Scripts

- `npm start`: Starts the application.
- `npm test`: Runs the automated tests (currently facing environment issues with module resolution).

## Project Structure

- `index.js`: The main entry point of the application.
- `package.json`: Contains project metadata and dependencies.
- `package-lock.json`: Records the exact versions of dependencies.
- `node_modules/`: Directory where dependencies are installed (should be in `.gitignore`).
- `tests/api.test.js`: Contains API tests.
- `jest.config.js`: Configuration file for Jest.

## API Endpoints

All request and response bodies are in JSON format.

### `POST /todos`
- **Description:** Creates a new todo item.
- **Request Body:**
  ```json
  {
    "task": "Your new todo description"
  }
  ```
- **Success Response:**
  - **Code:** 201 Created
  - **Content:** The created todo object with an `id` and `task`.
    ```json
    {
      "id": 1,
      "task": "Your new todo description"
    }
    ```
- **Error Response:**
  - **Code:** 400 Bad Request
  - **Content:** If `task` is missing in the request body.
    ```json
    {
      "message": "Task is required"
    }
    ```

### `GET /todos`
- **Description:** Retrieves a list of all todo items.
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** An array of todo objects.
    ```json
    [
      {
        "id": 1,
        "task": "First todo"
      },
      {
        "id": 2,
        "task": "Second todo"
      }
    ]
    ```
    (The array will be empty `[]` if no todos exist.)

### `GET /todos/:id`
- **Description:** Retrieves a specific todo item by its unique ID.
- **URL Parameters:**
  - `id` (integer, required): The ID of the todo to retrieve.
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** The todo object.
    ```json
    {
      "id": 1,
      "task": "Specific todo"
    }
    ```
- **Error Response:**
  - **Code:** 404 Not Found
  - **Content:** If no todo with the specified ID exists.
    ```json
    {
      "message": "Todo not found"
    }
    ```

### `PUT /todos/:id`
- **Description:** Updates an existing todo item by its ID.
- **URL Parameters:**
  - `id` (integer, required): The ID of the todo to update.
- **Request Body:**
  ```json
  {
    "task": "Updated todo description"
  }
  ```
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** The updated todo object.
    ```json
    {
      "id": 1,
      "task": "Updated todo description"
    }
    ```
- **Error Response:**
  - **Code:** 400 Bad Request
  - **Content:** If `task` is missing in the request body.
    ```json
    {
      "message": "Task is required"
    }
    ```
  - **Code:** 404 Not Found
  - **Content:** If no todo with the specified ID exists.
    ```json
    {
      "message": "Todo not found"
    }
    ```

### `DELETE /todos/:id`
- **Description:** Deletes a specific todo item by its ID.
- **URL Parameters:**
  - `id` (integer, required): The ID of the todo to delete.
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** A confirmation message and the deleted todo.
    ```json
    {
      "message": "Todo deleted successfully",
      "todo": {
        "id": 1,
        "task": "Task to be deleted"
      }
    }
    ```
- **Error Response:**
  - **Code:** 404 Not Found
  - **Content:** If no todo with the specified ID exists.
    ```json
    {
      "message": "Todo not found"
    }
    ```
