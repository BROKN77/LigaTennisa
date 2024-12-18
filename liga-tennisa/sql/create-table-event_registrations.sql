CREATE TABLE event_registrations (
       event_id INT,
       player_id INT,
       PRIMARY KEY (event_id, player_id),
       FOREIGN KEY (event_id) REFERENCES events(id),
       FOREIGN KEY (player_id) REFERENCES users(id)
   );