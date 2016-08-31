USE world;

-- 1)
SELECT c.name, l.language, l.percentage FROM languages l
JOIN countries c ON c.id = l.country_id
WHERE language='Slovene'
ORDER BY l.percentage DESC;

-- 2)
SELECT co.name, COUNT(*) as cities FROM cities ci
JOIN countries co ON co.id = ci.country_id
GROUP BY ci.country_id
ORDER BY cities DESC

-- 3)
SELECT ci.name, ci.population FROM cities ci
JOIN countries co ON co.id = ci.country_id
WHERE co.name = 'Mexico' AND ci.population > 500000
ORDER BY ci.population DESC

-- 4)
SELECT c.name, l.language, l.percentage FROM languages l
JOIN countries c ON c.id = l.country_id
WHERE l.percentage > 89
ORDER BY l.percentage DESC;

-- 5)
SELECT name, surface_area, population FROM countries
WHERE surface_area < 501 AND population > 100000

-- 6)
SELECT name, government_form, capital, life_expectancy FROM countries
WHERE government_form = 'Constitutional Monarchy' AND capital > 200 AND life_expectancy > 75

-- 7)
SELECT co.name, ci.name, ci.district, ci.population FROM countries co
JOIN cities ci ON co.id = ci.country_id
WHERE ci.district = 'Buenos Aires' AND ci.population > 500000

-- 8)
SELECT co.region, COUNT(*) as countries FROM countries co
GROUP BY co.region
ORDER BY countries DESC
