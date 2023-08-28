# Authorization

### Features

* Log In
* Sign Up

### Libraries Used

* express
* mongoose
* bcrypt
* json web token

### Sign Up Process

* Fetch user details from request body
* Check if user already exists in database
  * If user  already registered -> return response
* Hash the password
  * if unsuccessful -> return response
* Insert new user in database
* return response

### Log In Process

* Fetch user details from request body
* Check if fields are blank.
  * If YES, return response (Fill all required fields)
* Validate if email is registered
  * If NO, return respone (User not found)
* Check if password is correct using bcrypt
  * If NO, return response (Incorrect Password)
* Create JWT
  * Include payload, jwt-secret and expire time
  * Add token to user object
  * Remove password from user object
  * Create cookie and send response

### Middleware

* It has three parameters
  * request, response next (next middleware to call after this)
* Extract JWT token from req.body
  * if token missing -> return response (token missing)
* Verify token
  * req.user = decodedToken
* Make a call to next middleware ( next() )

> isStudent and isAdmin can extract details from "req.user.role" to verify is the user is student or admin and can handle accordingly.
