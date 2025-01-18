/* Initial Data of Items*/

CREATE DATABASE IF NOT EXISTS `inventory-management-system`;
USE `inventory-management-system`;

CREATE TABLE IF NOT EXISTS items (
    item_id VARCHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    quantity INT NOT NULL,
    borrowedQuantity INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO items (item_id, name, description, quantity, borrowedQuantity)
VALUES
    ('123e4567-e89b-12d3-a456-426614174000', 'Monitor', 'A 27-inch 4K monitor', 7, 0),
    ('550e8400-e29b-41d4-a716-446655440000', 'Mouse', 'A wireless mouse', 5, 1),
    ('9f8c4e3a-b2df-4c1e-9a33-dfb3e1b2c5f0', 'Microphone', 'A high-quality condenser microphone', 6, 3),
    ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Laptop', 'A gaming laptop', 10, 2); 
