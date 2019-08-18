---
title: UPDATE table with JOIN
permalink: /update-table-with-join/
---

For some reason I sometimes get the syntax mixed up for UPDATEs with a JOIN.  Here is an example of the correct syntax.

```sql
UPDATE ct
SET ct.Is_VIP = 1
FROM Contacts as ct
INNER JOIN State as st on ct.State_ID = st.State_ID
WHERE st.State_Name = 'Texas'
```
