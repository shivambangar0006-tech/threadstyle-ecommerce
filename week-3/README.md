# ThreadStyle - Week 3 Backend

Backend implementation for the ThreadStyle apparel and fashion e-commerce project.

## Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- Postman

## Folder structure
- `config/` - database connection
- `models/` - MongoDB schemas
- `controllers/` - backend logic
- `routes/` - API endpoints
- `middleware/` - error handling
- `postman/` - API testing collection
- `docs/` - Week 3 report

## Setup
1. Install Node.js.
2. Install MongoDB locally or create a MongoDB Atlas database.
3. Copy `.env.example` to `.env`.
4. Put your MongoDB connection string in `.env`.
5. Open a terminal in this folder.
6. Run `npm install`.
7. Run `npm start`.
8. Test `http://localhost:5000/`.

## API endpoints
### Products
- GET `/api/products`
- GET `/api/products/:id`
- POST `/api/products`
- PUT `/api/products/:id`
- DELETE `/api/products/:id`

### Categories
- GET `/api/categories`
- POST `/api/categories`

### Orders
- GET `/api/orders`
- GET `/api/orders/:id`
- POST `/api/orders`
- PUT `/api/orders/:id/status`

## Filtering
Products can be filtered with:
`GET /api/products?category=CATEGORY_ID&minPrice=500&maxPrice=2000`

## Security
Do not upload `.env`, passwords, database credentials, or payment secrets to GitHub.

## Internship note
This Week 3 code implements the planned core API foundation. Payment gateway, warehouse synchronization, authentication and production deployment are intentionally prepared as future integration stages rather than using real secret credentials.
