# Todo List API

A simple RESTful API for managing a todo list. This project is built with Node.js and Express.

## Features

- Create, Read, Update, and Delete (CRUD) operations for todos.
- In-memory data storage.
- Comprehensive test suite using Jest and Supertest.

## Getting Started

### Prerequisites

- Node.js (v12 or higher recommended)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/posteritapos/test-jules.git
   ```
2. Navigate to the project directory:
   ```bash
   cd test-jules
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the server, run the following command:

```bash
npm start
```

The server will start on `http://localhost:3000`.

### Running the Tests

To run the automated tests, use:

```bash
npm test
```

## API Endpoints

The API provides the following endpoints:

### Create a Todo

- **POST** `/todos`
- Creates a new todo item.

**Request Body:**

```json
{
  "task": "My new todo task"
}
```

**Example Response:**

```json
{
  "id": 1,
  "task": "My new todo task"
}
```

### Get All Todos

- **GET** `/todos`
- Retrieves all todo items.

**Example Response:**

```json
[
  {
    "id": 1,
    "task": "My first todo"
  },
  {
    "id": 2,
    "task": "My second todo"
  }
]
```

### Get a Specific Todo

- **GET** `/todos/:id`
- Retrieves a single todo item by its ID.

**Example Response:**

```json
{
  "id": 1,
  "task": "My first todo"
}
```

### Update a Todo

- **PUT** `/todos/:id`
- Updates an existing todo item.

**Request Body:**

```json
{
  "task": "My updated todo task"
}
```

**Example Response:**

```json
{
  "id": 1,
  "task": "My updated todo task"
}
```

### Delete a Todo

- **DELETE** `/todos/:id`
- Deletes a todo item by its ID.

**Example Response:**

```json
{
  "message": "Todo deleted successfully",
  "todo": {
    "id": 1,
    "task": "My updated todo task"
  }
}
```
