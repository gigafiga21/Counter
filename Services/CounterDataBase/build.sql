CREATE DATABASE IF NOT EXISTS counter;
USE counter;
CREATE TABLE IF NOT EXISTS Counter (value INT);
INSERT INTO Counter(value)
SELECT 0
WHERE NOT EXISTS (SELECT * FROM Counter);
