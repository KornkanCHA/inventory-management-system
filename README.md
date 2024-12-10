# Inventory Management System
This project is currently in development at Sprint 1.
## Table of Content
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
The API documentation from Swagger can be found at http://localhost:3000/api.

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
- The system allows users to borrow items and all loan transactions are recorded and admin can review the borrowing history, including the item, the user, the borrow date, and the return date

### Scope

- Develop only the Back End system.
- Use Swagger as Front End to display the user interface.

### Technologies & Tools

- NestJS: Back End System.
- MySQL: Database.
- Swagger: API Documentation.
- Jest: Testing.

### Architecture Design

I use the Clean Architecture in my design to separate the system functions, which helps the system to be organized, easy to understand and develop.

Here is project source directory:

```
src
├── domain -  Layer 1 (inner layer): Contains the data structure of the data in this system
│   └── entities
├── application - Layer 2: What we can do in this system Ex. CRUD
│   └── items
│       ├── dto
│       └── use-cases
├── interface-adapters - Layer 3: Communicate with internal and external layers
│   └── controllers
└── infrastructure - Layer 4: Interact with database
    ├── data
    └── repositories
```

### Database Design

The system use a **MySQL** database to store data. Below is the database schema:

Tables:
- Items
   - `id`: Primary Key (Unique identifier for each item)
   - `name`: String (Name of the item)
   - `description`: String (Description of the item, nullable)
   - `status`: Enum ('Available', 'Unavailable') (Status of the item)
   - `created_at`: DateTime (Date and time when the record was created)
   - `updated_at`: DateTime (Date and time when the record was last updated)
- Users
   - `id`: Primary Key (Unique identifier for each user)
   - `username`: String (User's unique username)
   - `email`: String (User's email address)
   - `password`: String (User's password, hashed)
   - `role`: Enum ('User', 'Admin) (User role)
   - `created_at`: DateTime (Date and time when the record was created)
   - `updated_at`: DateTime (Date and time when the record was last updated)
- Loans
   - `id`: Primary Key (Unique identifier for each loan)
   - `user_id`: Foreign Key (References `Users.id`)
   - `item_id`: Foreign Key (References `Items.id`)
   - `borrowed_date`: DateTime (The date the item was borrowed)
   - `return_date`: DateTime (The date the item was returned, nullable)

## Sprint Planning

Sprint | Week | Deliverables
--- | :---: | ---
Sprint 1 | 1 | CRUD for Items + Unit Test + Swagger
Sprint 2 | 2 | CRUD for Users + Unit Test + Swagger
Sprint 3 | 3 | CRUD for Loans + Unit Test + Swagger
Sprint 4 | 4 | Integration Tests + End-to-End Test + Final Documentation

### Sprint 1

On sprint 1, I focused on items table and used in-memory database instead of MySQL to preview the project and make it easier to setup.

#### Deliverables

- Implemented the ability to create, read, update, and delete (CRUD) Items through API endpoints.
- Developed unit tests to verify the correctness of the system logic and functionality.
- Integrated Swagger for interactive interface where developers can view the available Items API, parameters, and responses.

#### API Endpoints

Base URL: http://localhost:3000/items


| Method | Endpoint         | Description                             |
|--------|------------------|-----------------------------------------|
| GET    | `/`              | Get all items                           |
| GET    | `/:id`           | Get a specific item by ID               |
| POST   | `/`              | Create a new item                       |
| PATCH  | `/:id`           | Update an existing item                 |
| DELETE | `/:id`           | Delete an item by ID                    |



