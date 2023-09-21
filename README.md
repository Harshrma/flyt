# steps 

###  1. to use this app first you need to clone this repository


###  2. after cloning this repository make sure you have node installed  in your system


###  3. create a .env file and give the port and database url 

``` 
PORT=4000
DATABASE_URI=mongodb+srv://**************************.mongodb.net/

```

###   4. run this command

```

npm install

```

 * if you want to run this application using docker then make soure docker is installed in your system 

 *  first you need to run the following command

 1. docker built 
 2. run the container 

 * now you can call the apis 

 * if you are facing any problems with docker and you can not able to run the  api using docker the you can run the application using the following command 

 ## run 
 ```
 npm start 
 ```

 * first you need to register yourself then you can run the api you need following data to register

   ```
   {
    "email":"harsh@****.com",
    "password":"123@123",
    "rePassword":"123@123",
    "phone":"******"
    }

   ```

* after register you need to login with same email and password and this apis give an access token that is valid only for 60 minute if token expire you need to login with the same email and password again and this apis give an access token again.

```
{
    "email":"harsh@123.com",
    "password":"123@123"
}
```

* token in response 
```

{
    "success": true,
    "data": {
        "message": "login success",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhcnNoQDEyMy5jb20iLCJ1c2VySWQiOiJza1BUY091NE1vYkdZM0YiLCJpYXQiOjE2OTUyNjAzNDgsImV4cCI6MTY5NTQ3NjM0OH0.QeOlMp1q_5htHDSfGzTPF9q8kac2p06QmET_7AeAtDQ"
    }
}

```

### for more information use this link 

* API documentation

```
https://documenter.getpostman.com/view/22474210/2s9YCARWAh

```