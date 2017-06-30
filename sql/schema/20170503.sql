CREATE TABLE organization (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(50),
    label       VARCHAR(75),
    uri         VARCHAR(200)
);

CREATE TABLE "byopSponsor" (
    id          SERIAL PRIMARY KEY,
    "organizationId" INTEGER REFERENCES organization
);

INSERT INTO organization ( name, label, uri ) VALUES ( 'innova', 'Innova', 'http://www.innovadiscs.com' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'boom', 'Boom', 'http://www.booomdg.com' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'dga', 'Disc Golf Association', 'https://www.discgolf.com' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'disc-mania', 'Discmania', 'http://www.discmania.net' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'discraft', 'Discraft', 'http://www.discraft.com' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'dynamic', 'Dynamic Discs', 'https://www.dynamicdiscs.com' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'latitude', 'Latitude 64', 'http://www.latitude64.se' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'legacy', 'Legacy Discs', 'https://www.legacydiscs.com' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'millenium', 'Millenium Golf Discs', 'https://www.golfdisc.com' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'westside', 'Westside Discs', 'http://www.westsidediscs.com' );

INSERT INTO organization ( name, label, uri ) VALUES ( 'angies', 'Angie''s Firehouse Tavern', 'https://www.angiesfirehousetavern.com' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'barker', 'Barker Heating & Air Conditioning', 'http://www.barkerhvac.com' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'belmont-catering', 'Belmont Catering', 'http://www.belmontcatering.com' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'benchmark-contracting', 'Benchmark General Contracting', 'https://www.facebook.com/Benchmark-General-Contracting-LLC-1767424850167182' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'century-bourbon', 'Century Bourbon', 'http://www.centurybourbon.com' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'ddga', 'Dayton Disc Golf Association', 'http://www.daytondiscgolf.org' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'do-rite', 'Do Rite Carpet Cleaning', 'https://www.facebook.com/doritecarpetcleaning' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'edward-jones', 'Edward Jones', 'https://www.edwardjones.com/zachary-steinmetz' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'fite-concrete', 'Fite Concrete', 'https://www.facebook.com/Fite-Concrete-Construction-LLC-1288911421176212' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'gateway-disc-sports', 'Gateway Disc Sports', 'http://www.gdstour.com' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'huntington-bank', 'Huntington Bank', 'https://www.huntington.com' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'kincaid-forsthoefel', 'Kincaid & Forsthoefel CPAs', 'http://www.kfcpas.com' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'levally-realty', 'LeValley Realty', 'http://www.levalleyrealty.com' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'predator-disc-sports', 'Predator Disc Sports', 'https://www.facebook.com/greatwhitebasket' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'richs-pawn-shop', 'Rich''s Pawn Shop', 'http://www.richspawnshopdayton.com' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'slyders-tavern', 'Slyders Tavern', 'http://www.slyderstavern.com' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'springfield-disc-golf-crew', 'Springfield Disc Golf Crew', 'https://www.facebook.com/thespringfielddiscgolfcrew' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'yoga-loft-dayton', 'The Yoga Loft Dayton', 'http://www.yogaloftdayton.com' );
INSERT INTO organization ( name, label, uri ) VALUES ( 'zuca-bags', 'Zuca Bags', 'http://www.zuca.com' );

INSERT INTO "byopSponsor" ( "organizationId" ) VALUES ( ( SELECT id FROM organization WHERE name = 'angies' ) );
INSERT INTO "byopSponsor" ( "organizationId" ) VALUES ( ( SELECT id FROM organization WHERE name = 'barker' ) );
INSERT INTO "byopSponsor" ( "organizationId" ) VALUES ( ( SELECT id FROM organization WHERE name = 'belmont-catering' ) );
INSERT INTO "byopSponsor" ( "organizationId" ) VALUES ( ( SELECT id FROM organization WHERE name = 'benchmark-contracting' ) );
INSERT INTO "byopSponsor" ( "organizationId" ) VALUES ( ( SELECT id FROM organization WHERE name = 'century-bourbon' ) );
INSERT INTO "byopSponsor" ( "organizationId" ) VALUES ( ( SELECT id FROM organization WHERE name = 'ddga' ) );
INSERT INTO "byopSponsor" ( "organizationId" ) VALUES ( ( SELECT id FROM organization WHERE name = 'do-rite' ) );
INSERT INTO "byopSponsor" ( "organizationId" ) VALUES ( ( SELECT id FROM organization WHERE name = 'edward-jones' ) );
INSERT INTO "byopSponsor" ( "organizationId" ) VALUES ( ( SELECT id FROM organization WHERE name = 'fite-concrete' ) );
INSERT INTO "byopSponsor" ( "organizationId" ) VALUES ( ( SELECT id FROM organization WHERE name = 'gateway-disc-sports' ) );
INSERT INTO "byopSponsor" ( "organizationId" ) VALUES ( ( SELECT id FROM organization WHERE name = 'huntington-bank' ) );
INSERT INTO "byopSponsor" ( "organizationId" ) VALUES ( ( SELECT id FROM organization WHERE name = 'kincaid-forsthoefel' ) );
INSERT INTO "byopSponsor" ( "organizationId" ) VALUES ( ( SELECT id FROM organization WHERE name = 'levally-realty' ) );
INSERT INTO "byopSponsor" ( "organizationId" ) VALUES ( ( SELECT id FROM organization WHERE name = 'predator-disc-sports' ) );
INSERT INTO "byopSponsor" ( "organizationId" ) VALUES ( ( SELECT id FROM organization WHERE name = 'richs-pawn-shop' ) );
INSERT INTO "byopSponsor" ( "organizationId" ) VALUES ( ( SELECT id FROM organization WHERE name = 'slyders-tavern' ) );
INSERT INTO "byopSponsor" ( "organizationId" ) VALUES ( ( SELECT id FROM organization WHERE name = 'springfield-disc-golf-crew' ) );
INSERT INTO "byopSponsor" ( "organizationId" ) VALUES ( ( SELECT id FROM organization WHERE name = 'yoga-loft-dayton' ) );
INSERT INTO "byopSponsor" ( "organizationId" ) VALUES ( ( SELECT id FROM organization WHERE name = 'zuca-bags' ) );
INSERT INTO "byopSponsor" ( "organizationId" ) VALUES ( ( SELECT id FROM organization WHERE name = 'boom' ) );
INSERT INTO "byopSponsor" ( "organizationId" ) VALUES ( ( SELECT id FROM organization WHERE name = 'innova' ) );
INSERT INTO "byopSponsor" ( "organizationId" ) VALUES ( ( SELECT id FROM organization WHERE name = 'discraft' ) );
INSERT INTO "byopSponsor" ( "organizationId" ) VALUES ( ( SELECT id FROM organization WHERE name = 'dynamic' ) );

