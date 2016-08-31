SELECT CONCAT(u1.first_name, ' ', u1.last_name) AS student, CONCAT(u2.first_name, ' ', u2.last_name) AS friend FROM users u1
LEFT JOIN friendships f ON f.user_id = u1.id
LEFT JOIN users u2 ON u2.id = f.friend_id
