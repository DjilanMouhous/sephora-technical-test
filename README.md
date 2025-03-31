# Next.js Project - Sephora Technical Test

This project is a Next.js application that fetches and displays a list of items from an API, featuring a search functionality and a detailed view for each item. It also includes unit tests to ensure code reliability.

## 🚀 Installation & Setup

### Prerequisites

- Node.js (>= 18)
- npm or yarn

### Install dependencies

```sh
npm install  # or yarn install
```

### Start the development server

```sh
npm run dev  # or yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 📂 Project Structure

```
src/
│── app/
│   ├── features/
│   │   ├── repositories/  # Repository management (adapters, hooks, services...)
│   │   ├── users/         # User management
│   ├── layout.tsx        # Main layout of the application
│   ├── globals.css       # Global styles
```

## ⚙️ Features

- Fetch and display a list of repositories
- Search functionality to filter results
- Detailed repository view
- API data handling with adapters and services
- Custom hooks for better state management
- Unit tests with Jest and Testing Library

## 🧪 Testing

Unit tests are written using Jest and Testing Library.

### Run tests

```sh
npm run test  # or yarn test
```

## 🚀 Deployment

To build and deploy the application:

```sh
npm run build  # or yarn build
```

The build output will be in the `./.next` directory, ready for deployment.
