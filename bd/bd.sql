CREATE DATABASE ProjectManagementDB;
GO

USE ProjectManagementDB;

CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(100) NOT NULL,
    email NVARCHAR(255) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE documents (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(255) NOT NULL,
    version NVARCHAR(50),
    user_id INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE endpoints (
    id INT IDENTITY(1,1) PRIMARY KEY,
    endpoint NVARCHAR(255) NOT NULL,
    method NVARCHAR(10) NOT NULL,
    entries NVARCHAR(MAX),
    title NVARCHAR(255) NOT NULL,
    description NVARCHAR(MAX),
    results NVARCHAR(MAX),
    token NVARCHAR(MAX),
    observation NVARCHAR(MAX),
    document_id INT NOT NULL,
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
);

