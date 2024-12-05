CREATE TABLE events (
	id INT AUTO_INCREMENT PRIMARY KEY,
	phone VARCHAR(15) NOT NULL,
	email VARCHAR(255) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    date DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    tournament_name VARCHAR(255) NOT NULL,
    tournament_level ENUM('Новичок', 'Любитель', 'Профессионал', 'Мастер') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );
 