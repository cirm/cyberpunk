CREATE TABLE decker.chat_history (
message     VARCHAR(255),
timestamp   TIMESTAMPTZ NOT NULL,
decker_id   INTEGER NOT NULL,
PRIMARY KEY (timestamp, decker_id),
FOREIGN KEY (decker_id) REFERENCES decker.players (id)
);

CREATE OR REPLACE FUNCTION decker.get_chat_history()
RETURNS JSON AS
$BODY$
SELECT
    array_to_json(array_agg(row_to_json(p)))
FROM
    (SELECT
        ch.timestamp,
        (SELECT username FROM decker.players WHERE id = ch.decker_id) as decker,
        ch.message as text
    FROM decker.chat_history ch) p;
$BODY$
LANGUAGE SQL;

CREATE OR REPLACE FUNCTION decker.get_skiddle_id()
RETURNS INTEGER AS
$BODY$
SELECT id FROM decker.players dp WHERE username ='skiddle';
$BODY$
LANGUAGE SQL;

CREATE OR REPLACE FUNCTION decker.insert_chat_message(
    IN i_message VARCHAR(255),
    IN i_timestamp TIMESTAMPTZ,
    IN i_decker_id INTEGER DEFAULT decker.get_skiddle_id()
) RETURNS JSON AS
$BODY$
BEGIN
INSERT INTO decker.chat_history (
    message,
    timestamp,
    decker_id)
VALUES
    (i_message,
    i_timestamp,
    i_decker_id);
RETURN (SELECT
            row_to_json(t)
          FROM (
                 SELECT
                   message,
                   timestamp,
                   decker_id
                 FROM
                   decker.chat_history
                 WHERE
                   message = i_message AND timestamp = i_timestamp) t);
END;
$BODY$
LANGUAGE plpgsql;