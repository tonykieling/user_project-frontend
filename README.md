**About:**  
 This is the frontend part of the system.  
 Backend is located at https://github.com/tonykieling/user_project-backend.  

 User project will handle with actions related to the user, such as:

### Normal User  
 1. Register
 2. Login
 3. Logout
 4. Data user change
 
 * Steps 1 and 2 will deal with sending email (future)

### Admin User
 1. Register
 2. Login
 3. Logout
 4. Data user change
 5. Grant Admin permission
 6. Check logs created by the users actions

  
 **ToDo:**
 1. Check User deleted and apply the behaviour for the rest of the application (create, delete, update)
 2. Develop Sending email for specific actions (create user, update, changing password, etc)
 3. 

 **How to use:**
 1. npm i
 2. run `npm start`
 3. it will open the browser at the address: http://0.0.0.0:3000  
 
 *p.s.*:  
 Right now the persistency is being done in memory and there is some hard coded users.  
 Next steps:  
 - use Redux to manage state
 - persist the user info to keep them connected
 - features and users actions
 - some UI
 - connect with the server