ALTER TABLE events ADD numOfPlayers int;
ALTER TABLE events MODIFY COLUMN numOfPlayers int AFTER tournament_level;