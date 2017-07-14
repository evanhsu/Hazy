UPDATE "byopSponsor" SET year = 2016;

INSERT INTO organization ( name, label, uri ) VALUES ( 'sprint', 'Sprint', 'https://www.sprint.com/' );

INSERT INTO "byopSponsor" ( "organizationId", year ) VALUES ( ( SELECT id FROM organization WHERE name = 'sprint' ), 2017 );
