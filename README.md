# Next.js Application

This README provides essential information about setting up, running, and deploying your Next.js application.

---

## Prerequisites

Before getting started, ensure the following are installed:

1. **Node.js**: Install Node.js (v18.x or higher).
2. **Package Manager**: Use either `npm` or `yarn`.

---

## Getting Started

### 1. Clone the Repository

Clone the repository from your version control system:
```bash
git clone https://github.com/MechaMahmud71/as_sunnah_front_end.git
```

### 2. Install Dependencies

Install the necessary dependencies:
```bash
npm install 
```

### 3. Run the Development Server

Start the development server:
```bash
npm run dev 
```


Open [http://localhost:4000](http://localhost:4000) in your browser to see the application.

---

### Key Directories

- **pages/**: Contains all the page components.
- **public/**: Stores static files like images.
- **styles/**: Stores global and modular CSS files.
- **components/**: Contains reusable components.

---

## Scripts

### Development

Run the development server:
```bash
npm run dev
```

### Build

Build the application for production:
```bash
npm run build
```

### Start

Start the production server after building:
```bash
npm start
```

### Linting

Run the linter to check for code issues:
```bash
npm run lint
```

---

## Environment Variables

Use a `.env.local` file to manage environment-specific variables. Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api #use backend port
PORT=4000
```

> **Note**: Preface public variables with `NEXT_PUBLIC_` to expose them to the browser.

---

## Admin and User Credentials

Below are the default credentials for accessing the application:

### Admin Account
- **Email**: `admin@admin.com`
- **Password**: `12345678`

### User Account
- **Email**: `faruk@test.com`
- **Password**: `12345678`


---



