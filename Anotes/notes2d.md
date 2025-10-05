🔐 Authentication vs Authorization

Authentication → “Who are you?”
Authorization → “What are you allowed to do?”

🔑 What is Hashing?

Hashing is a process of converting any input data (like a password, file, or text) into a fixed-length string of characters, called a hash value or digest, using a hash function.

Input	    Hash (using SHA-256)
"hello"   	2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
"hello!"	334d0c7e... (completely different)

🧮 Properties of a Good Hash Function

Deterministic → Same input always gives the same hash.
Fast Computation → Can be computed quickly.
Irreversible (One-way) → You cannot get the original data back from the hash.
Collision Resistant → No two inputs should produce the same hash.
Uniform Distribution → Hashes should be evenly spread to avoid clustering.

MD5 → older, not secure now
SHA-1 → also weak today
SHA-256 / SHA-512 → widely used and secure
bcrypt / scrypt / Argon2 → special hash functions used for passwords


🔐 Why Use a Slow Password Hashing Function?

A slow password generator usually means a slow hash function like bcrypt, scrypt, or Argon2. The slowness is intentional, not a flaw.

1️⃣ Prevent Brute Force Attacks

Attackers try passwords rapidly using automated scripts — called brute force attacks.
If your hash function is fast (like MD5 or SHA-256), an attacker can try billions of passwords per second.
A slow hash function drastically reduces this speed, making brute force attacks computationally expensive and time-consuming.

3. What is Salting?

Salting is the process of adding a random string (called a salt) to a password before hashing it.
Purpose: To make each password hash unique, even if two users have the same password.
Stored in the database along with the hash so it can be used during verification.

⚙️ How It Works

User chooses a password: "mypassword123"
Generate a random salt: "Xy7!2"
Combine password + salt → "mypassword123Xy7!2"
Hash the combined string → store hash + salt in database
Now, even if another user has "mypassword123", a different random salt will produce a completely different hash.


🔑 What is Passport.js?

Passport.js is a middleware for Node.js/Express that makes it easy to add authentication to your app.
It’s modular, meaning you can plug in different strategies (local login, Google, Facebook, JWT, etc.)
Works well with Express sessions.
Handles authentication logic so you don’t have to write it from scratch.


4. Create a model in the user.js by using passport-local-mongoose go and check it out

Go and Read passport.