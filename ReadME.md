**Online delivery shop API**

**Hours spent:** 12

**API documentation**
Authenticate&Authorization routes

* POST /api/auth/signup   
Request body = JSON{"email":,"password":,"address":}
Description = Create new user and a corresponding new cart in database. No email duplicates.
* POST /api/auth/login
Request body = JSON{"email":,"password":}
Description = Post existing credentials to receive JSON {"userId":,"token:"} 

Shop Owner routes

* GET /api/admin/orders
Authorization type = Bearer Token
Description = Returns JSON array containing all submitted orders
* POST /api/admin/product
Authorization type = Bearer Token
Request body = JSON{"name":,"category":,"price":} Note: category = Main Dishes/Drinks/Salads/Appetizers & price format = 0.00
Description = Creates new product in database to be displayed for user
* PUT /api/admin/product/:id
Authorization type = Bearer Token
Request param : id = product id in database
Request body = example JSON{"name":,"category":,"price":} Note: category = Main Dishes/Drinks/Salads/Appetizers & price format = 0.00
Description = Change elements of product in database
* DELETE /api/admin/product/:id
Authorization type = Bearer Token
Request param : id = product id in database
Description = Delete product from database

Client routes

* GET /api/shop/menu
Authorization type = Bearer Token
Request headers : [ cur = Currency] , Note: Currency may be 'USD','AUD',..,empty
Description = return json objects of all products
* GET /api/shop/menu/:category
Authorization type = Bearer Token
Request headers : [ cur = Currency] , Note: Currency may be 'USD','AUD',..,empty
Request param : category = Main Dishes/Drinks/Salads/Appetizers
Description = return json objects of products corresponding to given category
* GET /api/shop/menu/product/:id
Authorization type = Bearer Token
Request headers : [ cur = Currency] , Note: Currency may be 'USD','AUD',..,empty
Request param : id = productId
Description = return json object of product with given id
* GET /api/shop/cart
Authorization type = Bearer Token
Request headers : [ id = 'userId'] & [ cur = Currency] , Note: Currency may be 'USD','AUD',..,empty
Description = return json objects of all products in given user's cart 
* PUT /api/shop/cart/:id
Authorization type = Bearer Token
Request headers : [ id = 'userId'] & [ cur = Currency] , Note: Currency may be 'USD','AUD',..,empty
Request param : id = productId
Description = put product with producy id in user's cart product array
* POST /api/shop/cart/submit
Authorization type = Bearer Token
Request headers : [ id = 'userId']
Description = create new object order in database containing products from given user's cart, empty user's cart 


