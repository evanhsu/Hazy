CREATE TABLE organization (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(50),
    label       VARCHAR(75)
);

INSERT INTO organization ( name, label ) VALUES ( 'innova', 'Innova' );
INSERT INTO organization ( name, label ) VALUES ( 'boom', 'Boom' );
INSERT INTO organization ( name, label ) VALUES ( 'dga', 'Disc Golf Association' );
INSERT INTO organization ( name, label ) VALUES ( 'dga', 'Disc Golf Association' );

data: [
        'boom',
        'dga',
        'disc-mania',
        'discraft',
        'dynamic',
        'innova',
        'latitude',
        'legacy',
        'millenium',
        'westside'
    ]
