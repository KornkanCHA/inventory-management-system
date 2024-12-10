# Inventory Management System
This project is currently in development at [Sprint 1](#sprint-1).
## Table of Contents
- [Getting Started](#getting-started)
   - [Installation](#installation)
   - [Run Server](#run-server)
   - [Testing](#testing)
- [Project Overview](#project-overview)
   - [Objective](#objective)
   - [Minimum Viable Product (MVP)](#minimum-viable-product-mvp)
   - [Scope](#scope)
   - [Technologies & Tools](#technologies-tools)
   - [Architecture Design](#architecture-design)
   - [Database Design](#database-design)
- [Sprint Planning](#sprint-planning)
    - [Sprint 1](#sprint-1)
        - [Deliverables](#deliverables)
        - [API Endpoints](#api-endpoints)

## Getting Started

### Installation

Install Inventory Management System with npm.

```
git clone https://github.com/KornkanCHA/inventory-management-system.git
cd inventory-management-system
npm install
```

### Run Server
Run the following command to start server.
```
npm run start
```

### Testing
Run the following command to execute unit tests.
```
npm test
```

## Project Overview

### Objective

Develop Back End system by using NestJS framework for borrowing and returning inventory within the university to reduce errors and increase convenience for users.

### Minimum Viable Product (MVP)

- The system supports Create, Read, Update, and Delete (CRUD) operations for Items, Users, and Loans via API endpoints.
- The system allows users to borrow items and all loan transactions are recorded, so admin can review the borrowing history, including the item, the user, the borrow date, and the return date

### Scope

- Develop only the Back End system.
- Use Swagger as Front End to display the API endpoints.

### Technologies & Tools

- NestJS: Back End System.
- MySQL: Database.
- Swagger: API Documentation.
- Jest: Testing.

### Architecture Design

I use the Clean Architecture in my design, which helps the system to be organized, easy to understand and develop.

Here is project source directory:

```
src
├── domain -  Layer 1 (inner layer): Contains the data structure of the data in this system
│   └── entities
├── application - Layer 2: What we can do in this system Ex. CRUD
│   └── items
│       ├── dto
│       └── use-cases
├── interface-adapters - Layer 3: Communicate with internal and external layers (handle requests & responses)
│   └── controllers
└── infrastructure - Layer 4: Interact with database
    ├── data
    └── repositories
```

### Database Design

The system use a **MySQL** database to store data. Below is the database schema:

Tables:
- Items
   - `id`: Primary Key (Unique identifier for each item, stored as UUID)
   - `name`: String (Name of the item)
   - `description`: String (Description of the item, nullable)
   - `status`: Enum ('Available', 'Unavailable') (Status of the item)
   - `created_at`: DateTime (Date and time when the record was created)
   - `updated_at`: DateTime (Date and time when the record was last updated)
- Users
   - `id`: Primary Key (Unique identifier for each user, stored as UUID)
   - `username`: String (User's unique username)
   - `email`: String (User's email address)
   - `password`: String (User's password, hashed)
   - `role`: Enum ('User', 'Admin) (User role)
   - `created_at`: DateTime (Date and time when the record was created)
   - `updated_at`: DateTime (Date and time when the record was last updated)
- Loans
   - `id`: Primary Key (Unique identifier for each loan, stored as UUID)
   - `user_id`: Foreign Key (References `Users.id`)
   - `item_id`: Foreign Key (References `Items.id`)
   - `borrowed_date`: DateTime (The date the item was borrowed)
   - `return_date`: DateTime (The date the item was returned, nullable)

## Sprint Planning

Sprint | Week | Deliverables
--- | :---: | ---
1 | 1 | CRUD for Items + Unit Test + Swagger
2 | 2 | CRUD for Users + Unit Test + Swagger
3 | 3 | CRUD for Loans + Unit Test + Swagger
4 | 4 | Integration Tests + End-to-End Test + Final Documentation

### Sprint 1

In sprint 1, I focused on items table and used in-memory database instead of MySQL to preview the project and make it easier to setup.

Start project by following [getting started section](#getting-started). You will found API documentation from Swagger at http://localhost:3000/api.

#### Deliverables

- Implemented the ability to create, read, update, and delete (CRUD) Items through API endpoints.
- Developed unit tests to verify the correctness of the item repository and item use cases.
- Integrated Swagger for interactive interface where developers can view the available Items API, parameters, and responses.

#### API Endpoints
This is API Endpoints for CRUD item, with a base URL at http://localhost:3000/items.

| Method | Endpoint         | Description                             |
|--------|------------------|-----------------------------------------|
| GET    | `/`              | Get all items                           |
| GET    | `/:id`           | Get a specific item by ID               |
| POST   | `/`              | Create a new item                       |
| PATCH  | `/:id`           | Update an existing item                 |
| DELETE | `/:id`           | Delete an item by ID                    |



