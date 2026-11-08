BEGIN;
CREATE TEMP TABLE customers (id text PRIMARY KEY, name text NOT NULL);
CREATE TEMP TABLE products (id text PRIMARY KEY, name text NOT NULL, price_minor integer NOT NULL CHECK (price_minor >= 0));
CREATE TEMP TABLE orders (id text PRIMARY KEY, customer_id text NOT NULL REFERENCES customers(id));
CREATE TEMP TABLE order_items (
  order_id text REFERENCES orders(id), product_id text REFERENCES products(id),
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price_minor integer NOT NULL CHECK (unit_price_minor >= 0),
  PRIMARY KEY (order_id, product_id)
);
INSERT INTO customers VALUES ('C-1', 'Alex Carter');
INSERT INTO products VALUES ('P-101', 'Studio Desk Lamp', 8900), ('P-103', 'Terracotta Travel Mug', 2800);
INSERT INTO orders VALUES ('O-1001', 'C-1');
INSERT INTO order_items VALUES ('O-1001', 'P-101', 1, 8900), ('O-1001', 'P-103', 2, 2800);
SELECT c.name AS customer, p.name AS product, i.quantity,
       i.quantity * i.unit_price_minor AS line_total_minor
FROM orders o JOIN customers c ON c.id = o.customer_id
JOIN order_items i ON i.order_id = o.id
JOIN products p ON p.id = i.product_id
WHERE o.id = 'O-1001';
ROLLBACK;
