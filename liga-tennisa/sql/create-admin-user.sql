CREATE USER 'admin'@'127.0.0.1' IDENTIFIED BY 'admin_515';
     GRANT ALL PRIVILEGES ON db.* TO 'admin'@'127.0.0.1';
     FLUSH PRIVILEGES;