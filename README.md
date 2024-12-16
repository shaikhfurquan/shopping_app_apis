# API Documentation

This repository contains the API documentation for a User, Product, Category, and Order management system.

## Table of Contents

- [Users APIs](#users-apis)
  - [Create User](#create-user)
  - [Login User](#login-user)
  - [Login User Profile](#login-user-profile)
  - [Logout User Profile](#logout-user-profile)
  - [Update User Profile](#update-user-profile)
  - [Update Password](#update-password)
  - [Update Profile Picture](#update-profile-picture)

- [Products APIs](#products-apis)
  - [Get All Products](#get-all-products)
  - [Get Top Three Products](#get-top-three-products)
  - [Get Single Product](#get-single-product)
  - [Create Product](#create-product)
  - [Update Product by ID](#update-product-by-id)
  - [Update Product Image](#update-product-image)
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

- [Reset Password](#reset-password)
- [Add Product Review](#add-product-review)

---

## Users APIs

### Create User
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
**POST** `http://localhost:6060/api/users/login`
```json
{
  "email": "johndoe@example.com",
  "password": "123456"
}
```

### Login User Profile
**GET** `http://localhost:6060/api/users/profile`

### Logout User Profile
**GET** `http://localhost:6060/api/users/logout`

### Update User Profile
**PUT** `http://localhost:6060/api/users/update-profile`
```json
{
  "name": "John Doe",
  "address": "456 Elm Street"
}
```

### Update Password
**PUT** `http://localhost:6060/api/users/update-password`
```json
{
  "oldPassword": "123456",
  "newPassword": "654321"
}
```

### Update Profile Picture
**PUT** `http://localhost:6060/api/users/update-picture`

In Postman: Set **Key** to `file` and **Value** to select the file, then hit the API.

---

## Products APIs

### Get All Products
**GET** `http://localhost:6060/api/products/get-all`
```plaintext
http://localhost:6060/api/products/get-all?keyword=laptop
http://localhost:6060/api/products/get-all?keyword=mobile
```

### Get Top Three Products
**GET** `http://localhost:6060/api/products/get-top`

### Get Single Product
**GET** `http://localhost:6060/api/products/get/{productId}`

### Create Product
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
**PUT** `http://localhost:6060/api/products/update/{productId}`
```json
{
  "name": "Samsung Galaxy",
  "description": "Updated description"
}
```

### Update Product Image
**PUT** `http://localhost:6060/api/products/update/pic/{productId}`
```plaintext
curl --location --request PUT 'http://localhost:6060/api/products/update/pic/{productId}' \
--form 'file=@"/path/to/image.jpg"'
```

### Delete Product Image
**DELETE** `http://localhost:6060/api/products/delete/pic/{productId}?imageId={imageId}`

### Delete Product
**DELETE** `http://localhost:6060/api/products/delete/{productId}`

---

## Category APIs

### Create Category
**POST** `http://localhost:6060/api/category/create`
```json
{
  "category": "Electronics"
}
```

### Get All Categories
**GET** `http://localhost:6060/api/category/get-all`

### Delete Category
**DELETE** `http://localhost:6060/api/category/delete/{categoryId}`

### Update Category
**PUT** `http://localhost:6060/api/category/update/{categoryId}`
```json
{
  "updatedCategory": "Smart Devices"
}
```

---

## Orders APIs

### Create Order
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
**GET** `http://localhost:6060/api/order/my-orders`

### Get Order by ID
**GET** `http://localhost:6060/api/order/my-orders/{orderId}`

### Admin: Get All Orders
**GET** `http://localhost:6060/api/order/admin/get-all-orders`

### Admin: Change Order Status
**PUT** `http://localhost:6060/api/order/admin/change-status/{orderId}`

---

## Reset Password
**POST** `http://localhost:6060/api/users/reset-password`
```json
{
  "email": "user@example.com",
  "answer": "YourAnswer",
  "newPassword": "newpassword123"
}
```

---

## Add Product Review
**POST** `http://localhost:6060/api/products/{productId}/review`
```json
{
  "comment": "Great product!",
  "rating": 5
}
```

---

### Notes
Replace placeholders like `{productId}`, `{categoryId}`, and `{orderId}` with actual IDs when making API requests.
