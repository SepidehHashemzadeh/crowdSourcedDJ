CREATE TABLE Users (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Events (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    startTime TIMESTAMP NOT NULL,
    description VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    userId INTEGER NOT NULL,
    isEnded BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Event_User (
    eventId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    FOREIGN KEY (eventId) REFERENCES Events(id),
    FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE Invites (
    fromId INTEGER NOT NULL,
    toId INTEGER NOT NULL,
    eventId INTEGER NOT NULL,
    isRequest BOOLEAN NOT NULL,
    isPending BOOLEAN NOT NULL,
    FOREIGN KEY (fromId) REFERENCES Users(id),
    FOREIGN KEY (toId) REFERENCES Users(id),
    FOREIGN KEY (eventId) REFERENCES Events(id)
);

CREATE TABLE Event_Song (
    eventId INTEGER NOT NULL,
    songUrl VARCHAR(255) NOT NULL,
    provider VARCHAR(255) NOT NULL,
    sequence INTEGER NOT NULL,
    FOREIGN KEY (eventId) REFERENCES Events(id)
);
