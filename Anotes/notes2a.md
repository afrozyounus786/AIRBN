1. Creating a new model for reviews

and listing in listing.js as schema as one to many storing the review by storing the objectId

Create in show.ejs the frontend of the review
create a route to handle the review request

2. Validation of the review
Client side and server side

client side by boostrap

Server side :-
We have created a joi schema validator
Create a function for validator and pass as middleware in the review route

3. Preview of the Review 
first we display the review listing in the show.ejs but there is only onjectid printing . To print the whole object we use the populate method 
And then print one by one by using for loop in the form of list

4. Delete review

To delete a review we should make a route /listings/id:/review/review:id
And we use a special mongose operator pull operator
$pull It removes all instances of a value (or values matching a condition) from an array field in MongoDB.

Issue is when we deleting it doesnt delete from backend
For doing this well make a middleware for findByIdAndDelete wheneverver this method will called it will extract the listing detail and delete from the database in listing.js