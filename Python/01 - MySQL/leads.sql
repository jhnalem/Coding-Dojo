USE lead_gen_business;

-- 1)
SELECT MONTHNAME(charged_datetime) as month, SUM(amount) as revenue FROM billing
WHERE YEAR(charged_datetime) = 2012 AND MONTH(charged_datetime) = 3
GROUP BY YEAR(charged_datetime), MONTH(charged_datetime);

-- 2)
SELECT client_id, SUM(amount) FROM billing
WHERE client_id = 2;

-- 3)
SELECT * FROM sites
WHERE client_id=10;

-- 4)
SELECT  COUNT(*) as 'sites', MONTHNAME(created_datetime) as 'month', YEAR(created_datetime) as 'year' FROM sites
WHERE client_id = 1
GROUP BY MONTH(created_datetime), YEAR(created_datetime)

SELECT  COUNT(*) as 'sites', MONTHNAME(created_datetime) as 'month', YEAR(created_datetime) as 'year' FROM sites
WHERE client_id = 20
GROUP BY MONTH(created_datetime), YEAR(created_datetime)

-- 5)
SELECT s.domain_name, COUNT(*) as leads
FROM leads AS l
JOIN sites AS s
ON s.site_id = l.site_id
WHERE MONTH(l.registered_datetime) >= 1
  AND MONTH(l.registered_datetime) <= 2
  AND YEAR(l.registered_datetime) = 2011
GROUP BY l.site_id

-- 6)
SELECT CONCAT(c.first_name, ' ', c.last_name) AS client,
       COUNT(*) AS leads
  FROM leads AS l
       JOIN sites AS s
         ON s.site_id = l.site_id
       JOIN clients AS c
         ON c.client_id = s.client_id
 WHERE YEAR(l.registered_datetime) = 2011
   AND MONTH(l.registered_datetime) >= 1
   AND MONTH(l.registered_datetime) <= 12
GROUP BY s.client_id

-- 7)
SELECT CONCAT(c.first_name, ' ', c.last_name) AS client,
       COUNT(*) AS leads,
       MONTHNAME(l.registered_datetime) AS month
  FROM leads AS l
       JOIN sites AS s
         ON s.site_id = l.site_id
       JOIN clients AS c
         ON c.client_id = s.client_id
 WHERE YEAR(l.registered_datetime) = 2011
   AND MONTH(l.registered_datetime) >= 1
   AND MONTH(l.registered_datetime) <= 6
GROUP BY c.client_id, MONTH(l.registered_datetime)
ORDER BY MONTH(l.registered_datetime) ASC

-- 8)
SELECT CONCAT(c.first_name, ' ', c.last_name) AS client,
       s.domain_name AS domain,
       COUNT(*) AS leads
  FROM leads AS l
       JOIN sites AS s
         ON s.site_id = l.site_id
       JOIN clients AS c
         ON c.client_id = s.client_id
 WHERE YEAR(l.registered_datetime) = 2011
   AND MONTH(l.registered_datetime) >= 1
   AND MONTH(l.registered_datetime) <= 12
GROUP BY s.site_id
ORDER BY c.client_id, s.created_datetime ASC

SELECT CONCAT(c.first_name, ' ', c.last_name) AS client,
       s.domain_name AS domain,
       COUNT(*) AS leads
  FROM leads AS l
       JOIN sites AS s
         ON s.site_id = l.site_id
       JOIN clients AS c
         ON c.client_id = s.client_id
GROUP BY s.site_id
ORDER BY c.client_id, s.created_datetime ASC

-- 9)
SELECT CONCAT(c.first_name, ' ', c.last_name) AS client,
       SUM(b.amount) AS 'Revenue',
       MONTHNAME(b.charged_datetime) AS 'Charged Month',
       YEAR(b.charged_datetime) AS 'Charged Year'
  FROM clients AS c
  JOIN billing AS b
    ON b.client_id = c.client_id
GROUP BY c.client_id, YEAR(b.charged_datetime), MONTH(b.charged_datetime)
ORDER BY c.client_id, b.charged_datetime

-- 10)
SELECT CONCAT(c.first_name, ' ', c.last_name) AS client,
       GROUP_CONCAT(s.domain_name SEPARATOR ' / ') AS 'Domains'
  FROM clients AS c
  LEFT JOIN sites AS s
    ON s.client_id = c.client_id
GROUP BY c.client_id
ORDER BY c.client_id ASC
