DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          name VARCHAR(255) NOT NULL
);

CREATE TABLE products (
                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         name VARCHAR(255) NOT NULL,
                         price DOUBLE,
                         image VARCHAR(500),
                         short_description VARCHAR(255),
                         long_description VARCHAR(2000),
                         category_id BIGINT,
                         CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Categories
INSERT INTO categories (name) VALUES ('Electronics');
INSERT INTO categories (name) VALUES ('Books');
INSERT INTO categories (name) VALUES ('Clothing');

-- 10 Products
INSERT INTO products (name, price, image, short_description, long_description, category_id)
VALUES
    ('Laptop', 1200.00, 'https://www.macworld.com/wp-content/uploads/2025/10/Apple-MacBook-Air-Sky-Blue.jpg?quality=50&strip=all',
     'High-performance laptop',
     'A high-performance laptop suitable for gaming, development, and productivity.',
     1),

    ('Smartphone', 900.00, 'https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc4/Apple-iPhone-16-Pro-Max-Nachfolger-komplett-mit-drei-48-Megapixel-Kameras.jpg',
     'Latest smartphone',
     'A premium smartphone with excellent camera performance and long battery life.',
     1),

    ('Wireless Mouse', 25.00, 'https://www.macworld.com/wp-content/uploads/2025/10/Apple-MacBook-Air-Sky-Blue.jpg?quality=50&strip=all',
     'Ergonomic mouse',
     'An ergonomic wireless mouse providing smooth tracking and long battery performance.',
     1),

    ('Java Programming Book', 45.00, 'https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc4/Apple-iPhone-16-Pro-Max-Nachfolger-komplett-mit-drei-48-Megapixel-Kameras.jpg',
     'Learn Java',
     'Comprehensive Java guide suitable for beginners and experienced developers.',
     2),

    ('Spring Boot Book', 39.00, 'https://www.macworld.com/wp-content/uploads/2025/10/Apple-MacBook-Air-Sky-Blue.jpg?quality=50&strip=all',
     'Master Spring Boot',
     'Step-by-step guide to building microservices using Spring Boot and Spring Cloud.',
     2),

    ('T-Shirt', 19.99, 'https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc4/Apple-iPhone-16-Pro-Max-Nachfolger-komplett-mit-drei-48-Megapixel-Kameras.jpg',
     'Comfortable shirt',
     'A high-quality cotton T-shirt designed for everyday comfort.',
     3),

    ('Jeans', 49.99, 'https://www.macworld.com/wp-content/uploads/2025/10/Apple-MacBook-Air-Sky-Blue.jpg?quality=50&strip=all',
     'Stylish jeans',
     'Durable, stylish denim jeans designed with a comfortable fit.',
     3),

    ('Headphones', 59.99, 'https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc4/Apple-iPhone-16-Pro-Max-Nachfolger-komplett-mit-drei-48-Megapixel-Kameras.jpg',
     'Noise-cancelling headphones',
     'Comfortable over-ear headphones with excellent sound isolation.',
     1),

    ('Keyboard', 29.99, 'https://www.macworld.com/wp-content/uploads/2025/10/Apple-MacBook-Air-Sky-Blue.jpg?quality=50&strip=all',
     'Mechanical keyboard',
     'Mechanical keyboard with tactile feedback suitable for gaming and typing.',
     1),

    ('Notebook', 5.99, 'https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc4/Apple-iPhone-16-Pro-Max-Nachfolger-komplett-mit-drei-48-Megapixel-Kameras.jpg',
     'Lined notebook',
     'Medium-sized notebook ideal for notes, journaling, and planning.',
     2);
