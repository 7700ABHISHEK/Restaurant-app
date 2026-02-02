# Food Delivery Application

A full-stack food delivery platform built with Next.js, featuring customer ordering, restaurant management, and delivery partner coordination.

## Features

### For Customers
- Browse restaurants and menus
- Add items to cart and place orders
- Track order status in real-time
- View order history

### For Restaurants
- Manage menu items (add, edit, delete)
- View and process incoming orders
- Update order preparation status
- Track sales and orders

### For Delivery Partners
- Register and manage profile
- View available delivery orders
- Accept and complete deliveries
- Track earnings and statistics
- Toggle availability status

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: bcrypt password hashing

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB database

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```env
MONGODB_URI=your_mongodb_connection_string
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── _components/          # Reusable UI components
├── api/                  # API routes
│   ├── customer/        # Customer endpoints
│   ├── delivery/        # Delivery partner endpoints
│   ├── order/           # Order management
│   ├── restaurant/      # Restaurant endpoints
│   └── user/            # User authentication
├── cart/                # Shopping cart page
├── delivery/            # Delivery partner dashboard
├── delivery-auth/       # Delivery partner auth pages
├── explore/             # Restaurant menu pages
├── lib/                 # Database models and config
├── orders/              # Order history page
├── restaurant/          # Restaurant dashboard
└── user-auth/           # Customer auth pages
```

## Key Features

### Auto-Assignment System
Orders are automatically assigned to available delivery partners based on current workload, ensuring fair distribution and efficient delivery.

### Order Status Flow
```
confirm → preparing → picked_up → delivered
```

### Database Models
- **Customer**: Customer accounts and profiles
- **User**: Restaurant accounts
- **DeliveryPartner**: Delivery partner profiles
- **Food**: Menu items
- **Order**: Order records with relationships

## API Routes

### Customer
- `POST /api/user/signup` - Register customer
- `POST /api/user/login` - Login customer
- `GET /api/customer/[id]` - Get customer details

### Restaurant
- `POST /api/restaurant/signup` - Register restaurant
- `POST /api/restaurant/login` - Login restaurant
- `POST /api/restaurant/food` - Add menu item
- `GET /api/restaurant/food/[id]` - Get menu items

### Delivery Partner
- `POST /api/delivery/signup` - Register delivery partner
- `POST /api/delivery/login` - Login delivery partner
- `GET /api/delivery/assign` - Auto-assign available partner
- `GET /api/delivery/orders` - Get orders for partner
- `PUT /api/delivery/orders` - Update order status

### Orders
- `POST /api/order` - Create order
- `GET /api/order/getOrder` - Get order details

## Security

- Password hashing with bcrypt (10 rounds)
- Email uniqueness validation
- Session management via localStorage
- Protected routes with authentication checks

## Deployment

### Build for production:
```bash
npm run build
```

### Start production server:
```bash
npm start
```

## License

This project is built with Next.js. Check out the [Next.js documentation](https://nextjs.org/docs) for more information.
