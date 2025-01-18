# Inventory Management System

## Getting Started

### Installation

To install project:

```
git clone https://github.com/KornkanCHA/inventory-management-system.git
cd inventory-management-system
```

### Start
To start the project with initial data by using Docker:

```
docker compose up --build
```

The API documentation from Swagger is available at [http://localhost:3000/api](http://localhost:3000/api).

The MySQL database can be accessed via phpMyAdmin at [http://localhost:8080](http://localhost:8080) with the username and password `root`.

To adjust the preferred port, go to the `.env` file.

Alternatively, you can run the project without Docker by starting the web server on your local machine and run the following commands:

```
npm install
npm run start
```

### Testing

To execute tests, run the following command:

```
npm test
```

## Project Overview

### Objective

Develop Back End system by using NestJS framework for borrowing and returning inventory within the university to reduce errors and increase convenience for admin.

### Scope

- Develop only the Back End system.
- Use Swagger as Front End to display the API endpoints.

### Technologies & Tools

- NestJS: Back End System.
- MySQL: Database.
- Swagger: API Documentation.
- Jest: Testing.

### Database Design

The system use a **MySQL** database to store data.

#### Items Table Structure

##### `item_id` (Primary Key)
- **Type**: UUID
- **Description**: A unique identifier for each item in the inventory. This field is automatically generated and ensures that each item is distinct.
- **Example**: `d9b1e2ab-9f45-45b1-89b5-820f7243002b`

##### `name`
- **Type**: String (up to 100 characters)
- **Description**: The name of the item in the inventory. This field is required and should describe the item clearly, such as "Laptop," "Printer," etc.
- **Example**: `Laptop`

##### `description` (Optional)
- **Type**: Text (nullable)
- **Description**: A brief description of the item. This field provides additional details about the item, such as its features or specifications. It is optional and can be left empty if not necessary.
- **Example**: `A powerful gaming laptop with high-end specs.`

##### `quantity`
- **Type**: Integer
- **Description**: The total quantity of the item available in stock. This field represents how many units of the item are available for borrowing or sale.
- **Example**: `10`

##### `borrowedQuantity`
- **Type**: Integer (default value 0)
- **Description**: The number of items that have been borrowed out from the inventory. This value is automatically initialized to 0, and it updates when items are borrowed or returned.
- **Example**: `3`

##### `createdAt`
- **Type**: Timestamp (auto-generated)
- **Description**: The timestamp representing when the item was created. This field is automatically set when the item is first added to the database and cannot be manually modified.
- **Example**: `2025-01-10T12:34:56Z`

##### `updatedAt`
- **Type**: Timestamp (auto-updated)
- **Description**: The timestamp representing when the item was last updated. This field is automatically updated every time the item is modified, ensuring that the database reflects the most recent change.
- **Example**: `2025-01-10T12:34:56Z`

#### API Endpoints
You can access the API endpoints for items operations at the base URL: [http://localhost:3000](http://localhost:3000). 

For detailed API documentation, please refer to the Swagger at [http://localhost:3000/api](http://localhost:3000/api).

| Method | Endpoint                   | Description                                                              |
|--------|----------------------------|--------------------------------------------------------------------------|
| GET    | /items/search              | Search for items by query with optional sorting and ordering.            |
| GET    | /items                     | Fetch a list of all available items.                                     |
| GET    | /items/:id                 | Fetch a specific item by ID.                                             |
| POST   | /items                     | Create a new item in the inventory.                                      |
| PATCH  | /items/:id                 | Update an existing item by ID.                                           |
| DELETE | /items/:id                 | Delete an item by ID.                                                    |
| PATCH  | /items/:id/borrow          | Borrow an item from the inventory by ID and quantity.                    |
| PATCH  | /items/:id/return          | Return an item to the inventory by ID and quantity.                      |



