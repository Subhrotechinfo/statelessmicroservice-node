# Stateless Microservice in Nodejs

A simple stateless microservice in Nodejs, with three major functionalities -

 * Authentication
 * Authorization
 * CRUD operations


## Setup

The API requires [Node.js](https://nodejs.org/en/download/)

To get up and running: 

**1.** Clone the repo.
```
git clone https://github.com/Subhrotechinfo/statelessmicroservice-node.git
```

**2.**  ```cd``` into repo. Use the same directory name(below) if you do not change it.
```
cd statelessmicroservice
```

**3.**  Setup the application by installing its dependencies with
```
npm install
```

**4.**  The app gets up and running on port 3000 with ```npm start```.

**5.**  **Important** Create a ```.env``` file and set ```jwtSecret``` to any secret phrase you want , set ```mongoAtlas``` to any cloud mongodb server or to your localhost (```mongodb``` should be installed) and set ```JWT_REFRESH_KEY``` to any string.
 

## Testing the API routes.

Since this is mostly an API with post and patch requests, testing will be done with [Postman](https://www.getpostman.com/)

### Authentication
This is a mock authentication so you can pass in any username or password to login.
 1. Set the request to **POST** and the url to /api/login. 
 2. In the **Body** for the Postman request, select **raw** and from dropdown select type as **JSON**.
 3. You will be sending 3 keys (for username ,password, role). Set the ```username``` key to any name. Set ```password``` to any password (Minimum 8 characters, at least one uppercase letter, one lowercase letter and one number).Set the ```role``` to be either ```Admin``` or```Student``` 
 4. Hit ```Send```. You will get a result in this format:
 ```
 {
    "msg": "Login successful",
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic3ViaHJvLnJqQGdtYWlsLmNvbSIsInJvbGUiOiJTdHVkZW50IiwiaWF0IjoxNjMxMjkwNzMwLCJ
    leHAiOjE2MzE2NTA3MzB9.YIIoDeEdiU1OdIiKSUDT-HFy60kWUytwYgUwMlI26eA"
}
 ```

### Authorization
The routes are authorized so you need to send Token in headers.
 1. Set the request to **POST** /**GET**/**PUT**/**DELETE** for any URL. 
 2. In the **Headers** for the Postman request, 
 3. You will be sending 1 keys (Authorization). Set the ```Authorization``` key with value as the ```token``` received in login API.
 
### CRUD Operation 
```Only for Admin roles```
This is CRUD operation. 
##### For Create  - 
 1. Set the request to **POST** and the url to /api/postsAdd. 
 2. Set the token in the headers.
 3. In the **Body** for the Postman request, select **raw** and from dropdown select type as **JSON**.
 4. You will be sending 2 keys (postName(length  max 256 char), description). Set the ```postname``` key to any postname. Set ```description``` to any description. 
 5. Hit ```Send```. You will get a result in this format:
 ```
 {
    "msg": "Post successfully created.",
    "success": true,
    "data": {
        "_id": "613b8887e47b917560eeae37",
        "postName": "New Post",
        "description": "post descriptions",
        "__v": 0
    }
}
 ```
##### For Update   
 1. Set the request to **PUT** and the url to /api/postsUpdate. 
 2. Set the token in the headers.
 3. In the **Body** for the Postman request, select **raw** and from dropdown select type as **JSON**.
 4. You will be sending 2 keys (postName(length  max 256 char), description). Set the ```postname``` key to any postname. Set ```description``` to any description. 
 5. Hit ```Send```. You will get a result in this format:
 ```
 {
    "success": true,
    "msg": "Post data updated successfully.",
    "data": {
        "_id": "613b8887e47b917560eeae37",
        "postName": "New Post111444",
        "description": "post descriptions updated",
        "__v": 0
    }
}
 ```

##### For Listing  - 
 1. Set the request to **POST** and the url to /api/postsList. 
 2. Set the token in the headers.
 (Optional)
 3. Set the **Params** for the Postman request.
 4.  You will be sending 2 keys (page, pageSize). Set the ```page``` key to the correct pagenumber. Set ```pageSize``` to the correct pageSize. 
 5. Hit ```Send```. You will get a result in this format:
 ```
 {
    "success": true,
    "msg": "Post list Successfully fetched",
    "data": [
        {
            "pageAndPageSize": [
                {
                    "total": 4,
                    "page": 1,
                    "perPage": 10
                }
            ],
            "fetchedData": [
                {
                    "_id": "613b70d5c8f3ee36c8ce63b3",
                    "postName": "New Post",
                    "description": "post descriptions"
                },
                {
                    "_id": "613b7a81c92ac057dc4253a8",
                    "postName": "New Post111",
                    "description": "post descriptions"
                },
                {
                    "_id": "613b8887e47b917560eeae37",
                    "postName": "New Post111444",
                    "description": "post descriptions updated"
                }
            ]
        }
    ]
}
 ```


##### For Delete  - 
 1. Set the request to **DELETE** and the url to /api/postsDelete. 
 2. Set the token in the headers.
 3. In the **Body** for the Postman request, select **raw** and from dropdown select type as **JSON**.
 4. You will be sending 1 keys . Set the ```id``` key to the id for the post that you receive in listing API.
 5. Hit ```Send```. You will get a result in this format:
 ```
{
    "success": true,
    "msg": "Posts succesfully deleted",
    "data":{}
}
 ```

##### For Student - viewing
1. Use the Login API to login with the role ```Student```
2. Set the token in the headers.
3. Set the request to **POST** and the url to /api/post-list. 
(Optional)
4. Set the **Params** for the Postman request.
5.  You will be sending 2 keys (page, pageSize). Set the ```page``` key to the correct pagenumber. Set ```pageSize``` to the correct pageSize. 
6. Hit ```Send```. You will get a result in this format:
 ```
{
    "success": true,
    "msg": "Post list Successfully fetched",
    "data": [
        {
            "pageAndPageSize": [
                {
                    "total": 4,
                    "page": 1,
                    "perPage": 10
                }
            ],
            "fetchedData": [
                {
                    "_id": "613b70d5c8f3ee36c8ce63b3",
                    "postName": "New Post",
                    "description": "post descriptions"
                },
                {
                    "_id": "613b7a81c92ac057dc4253a8",
                    "postName": "New Post111",
                    "description": "post descriptions"
                },
                {
                    "_id": "613b8887e47b917560eeae37",
                    "postName": "New Post111444",
                    "description": "post descriptions updated"
                }
            ]
        }
    ]
}
 ```
## Built With

 * [Node.js](https://nodejs.org)
 * [Express](https://expressjs.com/)

### Author :bowtie:
Subhro Chatterjee | :relaxed: Licensed under [Creative Commons](https://creativecommons.org/licenses/by-sa/4.0/) | 2021 | :pray:

