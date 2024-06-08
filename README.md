# pets-n-pals
This is a self educational project utilizing popular dependencies such as: 

Redux-ToolKit
• Express
• Next.js
• Formik
• React-Router-Dom
• axios
• Tailwind CSS

and more 
 
## Getting Started

```bash
cd client 
npm install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```
## Web API

| Methods        | Urls           | Actions  |
| -------------- |----------------| -------------
| User
| GET       | /api/user/          | Find all users |
| GET       | /api/user/:id       | Find single user by ID |
| PUT       | /api/user/:id       | Edit user by ID |
| DELETE    | /api/user/:id       | Delete user by ID |
| Pet
| POST      | /api/pets/add-pet   | Create pet |
| POST      | /api/pets/find     | Find single pet |
| PUT       | /api/pets/edit       | Edit pet |
| DELETE    | /api/pets/:id       | Delete pet |
| Cart        
| GET       | /api/cart/          | Find All Carts |
| GET       | /api/cart/fetchCart          | Find a single user's cart by ID |
| POST      | /api/cart/create-cart | Create shopping cart |
| Auth        
| POST       | /api/users/signup          | Register user account |
| POST       | /api/users/signin          | Login a user |
| Article        
| POST       | /api/article/all       | Find all articles |
| POST       | /api/article/findById/:id          | Find a single article by ID |
| Product        
| POST       | /api/product/       | Find all products |
| POST       | /api/product/:sku          | Find a single product by sku |

## Application Screenshots

### Landing Page
- Display latest news articles
- Feature latest and trending products 

[![pets n pals](https://github.com/Isaiahsylnol/pets-n-pals/blob/main/screenshots/landing-page.png)](#features)

-----------

### Shop Page
- Display all products 

[![pets n pals](https://github.com/Isaiahsylnol/pets-n-pals/blob/main/screenshots/shop-page.png)](#features)

-----------

### Product Details 

[![pets n pals](https://github.com/Isaiahsylnol/pets-n-pals/blob/main/screenshots/product.png)](#features)

-----------

### Cart Page
- Display cart's products
- Product quantities 
- clear item button
- Stripe integrated checkout
- Add more items button
- Detailed cost breakdown 

[![pets n pals](https://github.com/Isaiahsylnol/pets-n-pals/blob/main/screenshots/cart-page.png)](#features)

-----------

### Subscription Page
- Display subscription offers 
- Display link to subscription terms & conditions 

[![pets n pals](https://github.com/Isaiahsylnol/pets-n-pals/blob/main/screenshots/subscription-page.png)](#features)

-----------

### Manage Pets
- Manage pets  

[![pets n pals](https://github.com/Isaiahsylnol/pets-n-pals/blob/main/screenshots/manage-pets.png)](#features)

-----------

### Create Pet
- Create pet profile form modal  

[![pets n pals](https://github.com/Isaiahsylnol/pets-n-pals/blob/main/screenshots/create-pet.png)](#features)

-----------

### Edit Pet
- Pet profile edit form modal  

[![pets n pals](https://github.com/Isaiahsylnol/pets-n-pals/blob/main/screenshots/edit-pet.png)](#features)

-----------

### Login/Register Page
- Display two buttons for login and register 

[![pets n pals](https://github.com/Isaiahsylnol/pets-n-pals/blob/main/screenshots/login-register.png)](#features)

-----------

### Login Page

[![pets n pals](https://github.com/Isaiahsylnol/pets-n-pals/blob/main/screenshots/login.png)](#features)

-----------

### Profile Page
- Display user's pets
- Display user's information
- Create pet Button
- Various user action buttons

[![pets n pals](https://github.com/Isaiahsylnol/pets-n-pals/blob/main/screenshots/profile.png)](#features)

