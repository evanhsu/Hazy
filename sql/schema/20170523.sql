CREATE TABLE person (
   id             SERIAL PRIMARY KEY,
   name           VARCHAR(50),
   email          VARCHAR(100),
   password       TEXT,
   created        TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE role (
   id             SERIAL PRIMARY KEY,
   name           VARCHAR(50)
);

CREATE TABLE membership (
   id             SERIAL PRIMARY KEY,
   "personId"     INTEGER REFERENCES person (id),
   "roleId"       INTEGER REFERENCES role (id)
);

CREATE TABLE division (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(25),
    label       VARCHAR(100)
);

CREATE TABLE byop (
   id             SERIAL PRIMARY KEY,
   "divisionId"   INTEGER REFERENCES division (id),
   name1          VARCHAR(100),
   name2          VARCHAR(100),
   "shirtSize1"   VARCHAR(100),
   "shirtSize2"   VARCHAR(100),
   ace1           BOOLEAN,
   ace2           BOOLEAN,
   disc1          VARCHAR(150),
   disc2          VARCHAR(150),
   weight1        VARCHAR(50),
   weight2        VARCHAR(50),
   email          VARCHAR(200),
   phone          VARCHAR(20),
   total          DECIMAL
);

ALTER TABLE byop ADD COLUMN "waitList" BOOLEAN;
ALTER TABLE byop ADD COLUMN "hasPaid" BOOLEAN DEFAULT FALSE;
ALTER TABLE byop ADD COLUMN "stripeChargeId" TEXT;
ALTER TABLE byop ADD COLUMN "belmontDonation" DECIMAL;
ALTER TABLE byop ADD COLUMN "paidCash" BOOLEAN DEFAULT FALSE;
ALTER TABLE byop ADD COLUMN "created" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE person ADD CONSTRAINT constraint_email_unique UNIQUE (email);
