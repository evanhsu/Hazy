CREATE TABLE "byopFriday" (
   id               SERIAL PRIMARY KEY,
   name             VARCHAR(100),
   "shirtSize"      VARCHAR(100),
   email            VARCHAR(200),
   phone            VARCHAR(20),
   total            DECIMAL,
   "waitList"       BOOLEAN,
   "hasPaid"        BOOLEAN DEFAULT FALSE,
   "stripeChargeId" TEXT,
   "belmontDonation" DECIMAL,
   "paidCash"        BOOLEAN DEFAULT FALSE,
   "created" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
