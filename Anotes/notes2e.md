1. req.isAuthenticated()

When you use Passport.js for authentication in Express, it automatically adds a method called req.isAuthenticated() to every request object.
This method helps you check whether the current user has successfully logged in or not.

req.isAuthenticated()

Returns true → if the user is logged in
Returns false → if the user is not logged in

⚙️ How It Works:

When a user logs in successfully, Passport creates a session and stores the user’s ID in it.
From that point on, for every request, Passport automatically checks and restores the user from the session.
So whenever you call req.isAuthenticated(), it tells you if that session-based login still exists.

2. req.logout()

When using Passport.js, the method req.logout() is used to log out the currently authenticated user.
It basically removes the user’s session, ensuring that they are no longer considered “logged in”.

req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
});

⚙️ How It Works:

When a user logs in, Passport creates a session to keep them authenticated.
Calling req.logout() removes that session data.
After logout, req.isAuthenticated() will return false.

3. req.login()

In Passport.js, the method req.login() is used to manually log in a user and establish a login session.
It serializes the user information into the session — meaning the user stays logged in until they log out or the session expires.

req.login(user, function(err) {
    if (err) { return next(err); }
    return res.redirect('/dashboard');
});


user → the user object you want to log in (usually from database).
Callback → handles errors (if any) after trying to log in.

⚙️ When It’s Used:

Automatically called by Passport after successful authentication (e.g., during login).
Can also be used manually, for example:
After signup, to log the user in immediately(we use for the this case).
After OAuth or custom authentication logic.

4. req.session.redirectUrl = req.originalUrl


This line is used in Express.js with sessions to remember the page a user wanted to visit before logging in,
so after a successful login, you can redirect them back to that original page instead of always sending them to the homepage.