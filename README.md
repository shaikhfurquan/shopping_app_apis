# API Documentation

This repository contains the API documentation for a User, Product, Category, and Order management system. Developers can refer to this document to understand the purpose and usage of each API endpoint.

## Table of Contents

- [Users APIs](#users-apis)
  - [Create User](#create-user)
  - [Login User](#login-user)
  - [Login User Profile](#login-user-profile)
  - [Logout User Profile](#logout-user-profile)
  - [Update User Profile](#update-user-profile)
  - [Update Password](#update-password)
  - [Reset Password](#reset-password)
  - [Update Profile Picture](#update-profile-picture)

- [Products APIs](#products-apis)
  - [Get All Products](#get-all-products)
  - [Get Top Three Products](#get-top-three-products)
  - [Get Single Product](#get-single-product)
  - [Create Product](#create-product)
  - [Update Product by ID](#update-product-by-id)
  - [Update Product Image](#update-product-image)
  - [Add Product Review](#add-product-review)
  - [Delete Product Image](#delete-product-image)
  - [Delete Product](#delete-product)

- [Category APIs](#category-apis)
  - [Create Category](#create-category)
  - [Get All Categories](#get-all-categories)
  - [Delete Category](#delete-category)
  - [Update Category](#update-category)

- [Orders APIs](#orders-apis)
  - [Create Order](#create-order)
  - [Get My Orders](#get-my-orders)
  - [Get Order by ID](#get-order-by-id)
  - [Admin: Get All Orders](#admin-get-all-orders)
  - [Admin: Change Order Status](#admin-change-order-status)

---

## Users APIs

### Create User
**Purpose:** Register a new user.  
**POST** `http://localhost:6060/api/users/register`
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "123456",
  "city": "New York",
  "address": "123 Main Street",
  "country": "USA",
  "phone": "9876543210"
}
```

### Login User
**Purpose:** Authenticate a user and generate a session token.  
**POST** `http://localhost:6060/api/users/login`
```json
{
  "email": "johndoe@example.com",
  "password": "123456"
}
```

### Login User Profile
**Purpose:** Retrieve the currently logged-in user's profile details.  
**GET** `http://localhost:6060/api/users/profile`

### Logout User Profile
**Purpose:** Logout the currently logged-in user.  
**GET** `http://localhost:6060/api/users/logout`

### Update User Profile
**Purpose:** Update the profile details of the logged-in user.  
**PUT** `http://localhost:6060/api/users/update-profile`
```json
{
  "name": "John Doe",
  "address": "456 Elm Street"
}
```

### Update Password
**Purpose:** Change the password of the logged-in user.  
**PUT** `http://localhost:6060/api/users/update-password`
```json
{
  "oldPassword": "123456",
  "newPassword": "654321"
}
```

### Reset Password
**Purpose:** Reset the user's password using security answers.  
**POST** `http://localhost:6060/api/users/reset-password`
```json
{
  "email": "user@example.com",
  "answer": "YourAnswer",
  "newPassword": "newpassword123"
}
```

### Update Profile Picture
**Purpose:** Update the profile picture of the logged-in user.  
**PUT** `http://localhost:6060/api/users/update-picture`

In Postman: Set **Key** to `file` and **Value** to select the file, then hit the API.

---

## Products APIs

### Get All Products
**Purpose:** Retrieve all products with optional search functionality.  
**GET** `http://localhost:6060/api/products/get-all`
```plaintext
http://localhost:6060/api/products/get-all?keyword=laptop
http://localhost:6060/api/products/get-all?keyword=mobile
```

### Get Top Three Products
**Purpose:** Retrieve the top three products based on ratings.  
**GET** `http://localhost:6060/api/products/get-top`

### Get Single Product
**Purpose:** Retrieve details of a specific product.  
**GET** `http://localhost:6060/api/products/get/{productId}`

### Create Product
**Purpose:** Add a new product to the inventory.  
**POST** `http://localhost:6060/api/products/create`
```plaintext
curl --location 'http://localhost:6060/api/products/create' \
--header 'Cookie: token={your_token}' \
--form 'name="iPhone"' \
--form 'description="Latest model"' \
--form 'price="999"' \
--form 'stock="10"' \
--form 'category="{categoryId}"' \
--form 'file=@"/path/to/image.png"'
```

### Update Product by ID
**Purpose:** Update details of a specific product.  
**PUT** `http://localhost:6060/api/products/update/{productId}`
```json
{
  "name": "Samsung Galaxy",
  "description": "Updated description"
}
```

### Update Product Image
**Purpose:** Update the image of a specific product.  
**PUT** `http://localhost:6060/api/products/update/pic/{productId}`
```plaintext
curl --location --request PUT 'http://localhost:6060/api/products/update/pic/{productId}' \
--form 'file=@"/path/to/image.jpg"'
```

### Delete Product Image
**Purpose:** Remove an image of a specific product.  
**DELETE** `http://localhost:6060/api/products/delete/pic/{productId}?imageId={imageId}`

### Add Product Review
**Purpose:** Submit a review for a product.  
**POST** `http://localhost:6060/api/products/{productId}/review`
```json
{
  "comment": "Great product!",
  "rating": 5
}
```

### Delete Product
**Purpose:** Remove a product from the inventory.  
**DELETE** `http://localhost:6060/api/products/delete/{productId}`

---

## Category APIs

### Create Category
**Purpose:** Add a new category to the system.  
**POST** `http://localhost:6060/api/category/create`
```json
{
  "category": "Electronics"
}
```

### Get All Categories
**Purpose:** Retrieve a list of all categories.  
**GET** `http://localhost:6060/api/category/get-all`

### Delete Category
**Purpose:** Remove a specific category from the system.  
**DELETE** `http://localhost:6060/api/category/delete/{categoryId}`

### Update Category
**Purpose:** Update the name of a specific category.  
**PUT** `http://localhost:6060/api/category/update/{categoryId}`
```json
{
  "updatedCategory": "Smart Devices"
}
```

---

## Orders APIs

### Create Order
**Purpose:** Place a new order for products.  
**POST** `http://localhost:6060/api/order/create`
```json
{
  "shippingInfo": {
    "address": "123 Main Street",
    "city": "Example City",
    "country": "Example Country"
  },
  "orderItems": [
    {
      "name": "Product 1",
      "price": 100.00,
      "quantity": 1,
      "image": "https://example.com/image.jpg",
      "product": "{productId}"
    }
  ],
  "itemPrice": 100.00,
  "tax": 10.00,
  "shippingCharges": 5.00,
  "totalAmount": 115.00
}
```

### Get My Orders
**Purpose:** Retrieve all orders placed by the logged-in user.  
**GET** `http://localhost:6060/api/order/my-orders`

### Get Order by ID
**Purpose:** Retrieve details of a specific order.  
**GET** `http://localhost:6060/api/order/my-orders/{orderId}`

### Admin: Get All Orders
**Purpose:** Retrieve all orders in the system (admin-only).  
**GET** `http://localhost:6060/api/order/admin/get-all-orders`

### Admin: Change Order Status
**Purpose:** Update the status of a specific order (admin-only).  
**PUT** `http://localhost:6060/api/order/admin/change-status/{orderId}`

---

### Notes
Replace placeholders like `{productId}`, `{categoryId}`, and `{orderId}` with actual IDs when making API requests.
