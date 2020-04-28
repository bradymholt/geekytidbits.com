---
title: Postgres composite type IS NULL
---

This is a new post.
https://www.postgresql.org/docs/11/rowtypes.html
```
CREATE OR REPLACE FUNCTION my_function ()
  RETURNS void
  AS $$
DECLARE
  v_transaction "entities_transactions";
BEGIN
  SELECT
    entities_transactions.* INTO v_transaction
  FROM
    entities_transactions
  WHERE
    -- Will not return anything
    1 = 2;
  RAISE INFO 'SELECT WHERE 1 = 2: %', v_transaction;
  RAISE NOTICE 'IS NULL %', v_transaction IS NULL;
  RAISE NOTICE 'IS NOT NULL %', v_transaction IS NOT NULL;
  v_transaction = NULL;
  RAISE INFO 'v_transaction = NULL: %', v_transaction;
  RAISE NOTICE 'IS NULL %', v_transaction IS NULL;
  RAISE NOTICE 'IS NOT NULL %', v_transaction IS NOT NULL;
  SELECT
    entities_transactions.* INTO v_transaction
  FROM
    entities_transactions
  LIMIT 1;
  RAISE INFO 'v_transaction = NULL: %', v_transaction;
  RAISE NOTICE 'IS NULL %', v_transaction IS NULL;
  RAISE NOTICE 'IS NOT NULL %', v_transaction IS NOT NULL;
  RAISE NOTICE 'v_transaction.id IS NOT NULL %', v_transaction.id IS NOT NULL;
END;
$$
LANGUAGE plpgsql;

SELECT
  my_function ();
```
