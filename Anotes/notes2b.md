Express Router

Instead of keeping all your routes in one giant app.js file, you can group them into separate router files (like userRoutes.js, productRoutes.js, etc.) and then plug them into your main app.

First we make a new folder to store the route of same type then by making a router object we determine the route 
And then in app.js we declare as
app.use("/user",router)
/user the common path for the route present in router file and router redirect the path to define path 

2. web cookies

Cookies are small pieces of data that a web server stores in a user’s browser.
They are sent along with HTTP requests/responses and help websites "remember" information about the user.

Think of cookies like a short-term memory card for websites.

Session management

Logins, shopping carts, user IDs.

Example: If you log in to Amazon, cookies help Amazon know it’s still you on every page.

Personalization

User preferences, themes, language settings.

Tracking & Analytics

Used for targeted ads, analyzing site visits.

3. Cookie Parser

To send and use the cookie