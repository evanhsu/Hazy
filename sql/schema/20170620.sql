ALTER TABLE byop ADD COLUMN "removedFromEvent" BOOLEAN DEFAULT FALSE;
ALTER TABLE byop ADD COLUMN "refunded" BOOLEAN DEFAULT FALSE;
ALTER TABLE byop ADD COLUMN "stripeRefundId" TEXT;