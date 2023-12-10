CREATE TABLE User (
  id VARCHAR(36) PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role ENUM('ADMIN', 'USER', 'PENGEPUL'),
  points INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Item (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  points VARCHAR(255),
  total INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Event (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  path_image VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  user_id VARCHAR(36),
  FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE ExchangeTransaction (
  id INT AUTO_INCREMENT PRIMARY KEY,
  items_id INT,
  user_id VARCHAR(36),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (items_id) REFERENCES Item(id),
  FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE RefreshToken (
  user_id VARCHAR(36) PRIMARY KEY,
  token VARCHAR(255) UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE Report (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255),
  subject VARCHAR(255),
  location VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  user_id VARCHAR(36),
  FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE PaymentMethod (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(36),
  method_type ENUM('CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'QRIS', 'OTHER'),
  card_number VARCHAR(16),
  expiration_date DATE,
  cvv VARCHAR(4),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE TransactionPayment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  transaction_id INT,
  payment_method_id INT,
  amount DECIMAL(10, 2),
  status ENUM('PENDING', 'COMPLETED', 'FAILED'),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (transaction_id) REFERENCES ExchangeTransaction(id),
  FOREIGN KEY (payment_method_id) REFERENCES PaymentMethod(id)
);
