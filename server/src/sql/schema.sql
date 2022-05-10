

CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	notes varchar NOT NULL
);

INSERT INTO songs (id, song_title, notes) 
VALUES (1, 'Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4');
INSERT INTO songs (id, song_title, notes) 
VALUES (2, 'Jingle Bells', 'E5 E5 E5 E5 E5 E5 E5 G5 C5 D5 E5 F5 F5 F5 F5 F5 E5 E5 E5 E5 E5 D5 D5 E5 D5 G5 E5 E5 E5 E5 E5 E5 E5 G5 C5 D5 E5 F5 F5 F5 F5 F5 E5 E5 E5 E5 G5 G5 F5 D5 C5');
