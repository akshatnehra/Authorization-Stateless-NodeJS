# Authorization

### Features

* Log In
* Sign Up

### Libraries Used

* express
* mongoose
* bcrypt
* jwt web token

### Sign Up Process

* Fetch user details from request body
* Check if user already exists in database
  * If user  already registered -> return response
* Hash the password
  * if unsuccessful -> return response
* Insert new user in database
* return response
