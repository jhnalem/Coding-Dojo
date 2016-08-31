USE sakila;

-- 1)
SELECT cu.first_name, cu.last_name, cu.email, a.address FROM customer cu
JOIN address a ON a.address_id = cu.address_id
JOIN city ci ON ci.city_id = a.city_id
WHERE ci.city_id = 312

-- 2)
SELECT f.title, f.description, f.release_year, f.rating, f.special_features, c.name FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
WHERE c.name = 'Comedy'

-- 3)
SELECT f.title, f.description, f.release_year FROM film f
JOIN film_actor fa ON fa.film_id = f.film_id
WHERE fa.actor_id = 5

-- 4)
SELECT c.first_name, c.last_name, c.email, a.address FROM customer c
JOIN address a ON a.address_id = c.address_id
JOIN store s ON s.store_id = c.store_id
WHERE a.city_id IN (1, 42, 312, 459) AND s.store_id = 1

-- 5)
SELECT f.title, f.description, f.release_year, f.rating, f.special_features FROM film f
JOIN film_actor fa ON fa.film_id = f.film_id
WHERE f.rating = 'G' AND f.special_features LIKE '%behind the scenes%' AND fa.actor_id = 15

-- 6)
SELECT f.film_id, f.title, a.actor_id, CONCAT(a.first_name, ' ', a.last_name) as actor_name FROM film f
JOIN film_actor fa ON fa.film_id = f.film_id
JOIN actor a ON a.actor_id = fa.actor_id
WHERE f.film_id = 369

-- 7)
SELECT f.title, f.description, f.release_year, f.rating, f.special_features, c.name FROM film f
JOIN film_category fc ON fc.film_id = f.film_id
JOIN category c ON c.category_id = fc.category_id
WHERE f.rental_rate = 2.99 AND c.name = 'Drama'

-- 8)
SELECT f.title, f.description, f.release_year, f.rating, f.special_features, c.name, CONCAT(a.first_name, ' ', a.last_name) as actor_name FROM film f
JOIN film_actor fa ON fa.film_id = f.film_id
JOIN actor a ON a.actor_id = fa.actor_id
JOIN film_category fc ON fc.film_id = f.film_id
JOIN category c ON c.category_id = fc.category_id
WHERE a.first_name = 'SANDRA' AND a.last_name = 'KILMER' AND c.name = 'Action'
