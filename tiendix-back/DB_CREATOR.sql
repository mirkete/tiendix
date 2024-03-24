CREATE DATABASE tiendix;
use tiendix;

CREATE TABLE shops(
	id BINARY(16) PRIMARY KEY NOT NULL DEFAULT(UUID_TO_BIN(UUID())),
    name VARCHAR(64) NOT NULL
);

CREATE TABLE users (
	id BINARY(16) PRIMARY KEY NOT NULL DEFAULT(UUID_TO_BIN(UUID())),
    email VARCHAR(255) NOT NULL, 
    password VARCHAR(128) NOT NULL,
    shop_id BINARY(16) NOT NULL,
    FOREIGN KEY (shop_id) REFERENCES shops(id)
);

CREATE TABLE products (
	id BINARY(16) PRIMARY KEY NOT NULL DEFAULT(UUID_TO_BIN(UUID())),
    name VARCHAR(128) NOT NULL,
    price INTEGER CHECK (price >= 0 AND price <= 10000000),
    quantity INTEGER CHECK (quantity >= 0 AND quantity <= 999),
    shop_id BINARY(16) NOT NULL,
    FOREIGN KEY (shop_id) REFERENCES shops(id)
);

CREATE TABLE clients (
	id BINARY(16) PRIMARY KEY NOT NULL DEFAULT(UUID_TO_BIN(UUID())),
    name VARCHAR(128) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
	id BINARY(16) PRIMARY KEY NOT NULL DEFAULT(UUID_TO_BIN(UUID())),
	product_id BINARY(16) NOT NULL,
    shop_id BINARY(16) NOT NULL,
    client_id BINARY(16) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (shop_id) REFERENCES shops(id),
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

SELECT BIN_TO_UUID(users.id) AS id, email, BIN_TO_UUID(shop_id) AS shop_id, shops.name AS name FROM users
LEFT JOIN shops ON users.shop_id = shops(id)
WHERE email = "test@test.com" AND password = "test123";

SELECT * FROM products;

/* Shop id: '8f8199e5-e7a6-11ee-a3a8-4cedfb468ce2' */
/* User id: 'd7025236-e7a6-11ee-a3a8-4cedfb468ce2' */
/* Product id: 'e193cd37-e7a6-11ee-a3a8-4cedfb468ce2' */
/* Client id: 'e76d3b88-e7a6-11ee-a3a8-4cedfb468ce2' */
/* Order id: 'eba179f2-e7a6-11ee-a3a8-4cedfb468ce2' */

/*
INSERT INTO shops (name, id) 
VALUES ("Test shop", UUID_TO_BIN('8f8199e5-e7a6-11ee-a3a8-4cedfb468ce2'));

SELECT BIN_TO_UUID(id) FROM shops;
*/

/*
INSERT INTO users (id, email, password, shop_id)
VALUES (
UUID_TO_BIN('d7025236-e7a6-11ee-a3a8-4cedfb468ce2'), 
"test@test.com", "test123", 
UUID_TO_BIN('8f8199e5-e7a6-11ee-a3a8-4cedfb468ce2')
);
*/

/*
INSERT INTO products (id, name, price, quantity, shop_id)
VALUES (
	UUID_TO_BIN('e193cd37-e7a6-11ee-a3a8-4cedfb468ce2'),
    "Test product",
    128,
    8,
    UUID_TO_BIN('8f8199e5-e7a6-11ee-a3a8-4cedfb468ce2')
);
*/

/*
INSERT INTO clients (id, name, email)
VALUES (
	UUID_TO_BIN('e76d3b88-e7a6-11ee-a3a8-4cedfb468ce2'),
    "Test client",
    "client@test.com"
);
*/

/*
INSERT INTO orders (id, product_id, shop_id, client_id)
VALUES (
	UUID_TO_BIN('eba179f2-e7a6-11ee-a3a8-4cedfb468ce2'),
	UUID_TO_BIN('e193cd37-e7a6-11ee-a3a8-4cedfb468ce2'),
    UUID_TO_BIN('8f8199e5-e7a6-11ee-a3a8-4cedfb468ce2'),
    UUID_TO_BIN('e76d3b88-e7a6-11ee-a3a8-4cedfb468ce2')
);
*/

