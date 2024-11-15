CREATE TABLE events (
 id INT AUTO_INCREMENT PRIMARY KEY, 
 email VARCHAR(255) NOT NULL,
 name VARCHAR(255) NOT NULL,
 surname VARCHAR(255) NOT NULL,
 fathername varchar(255),
 eventdate Date NOT NULL,
 hour varchar(10) NOT NULL,
 place VARCHAR(255) NOT NULL,
 tournament VARCHAR(255) NOT NULL
 );
 