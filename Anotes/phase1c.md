Now well do form validation 

Form validation can done at the client side and server side

1. Client Side Validation

Form Validation:
Correct format , within the constraint(no negative price)

first thing to do set every model required .The message is created is depended on the browser

Well use bootstrap to message invalid validation. Add novalidate to remove the default message

Logic is in public/js/script.js by bootstrap

2. Success and failure text :
kya likh kar ayega jab hum constraint pass nhi karenge
change in the bootstrap logic

change in edit.js

Now we do the server side validation because if someone is directly send the request to get route(by postman and hoppscoth) it will get accept

3. Custom Error handler

Create a middleware for create route

4. Custom WrapAsync

create a utils/wrapAsync.js

5. Custom express.error

in util ExpressError.js

class ExpressError extends Error {
    constructor(statusCode , message){
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

6. Error.js

in error.js
res.render in the middelware


7. Schema validation

well use joi which is use for schema validation for server side validation
in schema.js

validation for schema 
through middleware