**Online delivery shop API**

**Hours spent:** 12
-------------------------------------------
**API documentation**  
Authenticate&Authorization routes   

* POST /api/auth/signup   
Request body = JSON {"email": ,"password": ,"address": }  
Description = Create new user and a corresponding new cart in database. No email duplicates.  
* POST /api/auth/login  
Request body = JSON {"email": ,"password": }  
Description = Post existing credentials to receive JSON {"userId": ,"token: "} (!)  

Shop Owner routes  

* GET /api/admin/orders  
Authorization type = Bearer Token  
Description = Returns JSON array containing all submitted orders  
* POST /api/admin/product  
Authorization type = Bearer Token  
Request body = JSON {"name": ,"category": ,"price": }  
Note: category = Main Dishes/Drinks/Salads/Appetizers & price format = 0.00  
Description = Creates new product in database to be displayed for user  
* PUT /api/admin/product/:id  
Authorization type = Bearer Token  
Request param : id = product id in database  
Request body = example JSON {"name": ,"category": ,"price": }  
Note: category = Main Dishes/Drinks/Salads/Appetizers & price format = 0.00  
Description = Change elements of product in database  
* DELETE /api/admin/product/:id  
Authorization type = Bearer Token  
Request param : id = product id in database  
Description = Delete product from database  

Client routes  

* GET /api/shop/menu  
Authorization type = Bearer Token  
Request headers : [ cur = Currency] ,  
Note: Currency may be 'USD','AUD',..,empty  
Description = return json objects of all products  
* GET /api/shop/menu/:category  
Authorization type = Bearer Token  
Request headers : [ cur = Currency] ,  
Note: Currency may be 'USD','AUD',..,empty  
Request param : category = Main Dishes/Drinks/Salads/Appetizers  
Description = return json objects of products corresponding to given category  
* GET /api/shop/menu/product/:id  
Authorization type = Bearer Token  
Request headers : [ cur = Currency] ,  
Note: Currency may be 'USD','AUD',..,empty  
Request param : id = productId  
Description = return json object of product with given id  
* GET /api/shop/cart  
Authorization type = Bearer Token  
Request headers : [ id = 'userId'] & [ cur = Currency] ,  
Note: Currency may be 'USD','AUD',..,empty  
Description = return json objects of all products in given user's cart  
* PUT /api/shop/cart/:id  
Authorization type = Bearer Token  
Request headers : [ id = 'userId'] &  [ cur = Currency] ,  
Note: Currency may be 'USD','AUD',..,empty  
Request param : id = productId  
Description = put product with product id in user's cart product array  
* POST /api/shop/cart/submit  
Authorization type = Bearer Token  
Request headers : [ id = 'userId']  
Description = create new object order in database containing products from given user's cart, empty user's cart   

 -------------------------------------------

**Project Architecture**  
* General  
Server is already connected to MongoDB cluster.  
Server runs using Node.js.  
Npm packages to be installed are in package.json dependecies.  

* Database Schemas  
user {  
    email: , password: , address:  
}    
product {  
    name:,category:,price:  
}  
cart {  
    userID: , products: [ref: Product], address: , totalPrice: 
}  
order {  
    products: [ref: Product], address: , totalPrice:  
}  
* Folders  
routes: Contains the redirection od the requests to the rigth controllers  
models: Contains DB schemas  
controllers: Contains the server's buisness logic and the request handling   
sevices & middleware: Contain complementary functions  

-------------------------------------------

**How to run**  
After cloning or unzipping the project run 'node server' on your console.
You can signup with your credentials before logging in or use the existing testing user  
{   
    "email": "katerina@gmail.com",  
    "password" : "pass"  
}  
for logging in.  
*After logging in, One should note the returned token and id for using the APIs above.  






