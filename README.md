# Invoice Parser API

This project is an Express.js-based API for parsing PDF invoices and storing their data in MongoDB.

## Features

- Upload a PDF invoice and parse its contents
- Store parsed invoice data into a MongoDB collection
- Retrieve all parsed invoices
- Basic rate limiting & token validation middlewa

## Setup Instructions

1. **Clone the repository**

   ```
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies**

   ```
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in your project root. Add your MongoDB connection string:

   ```
   MONGO_URI=mongodb://localhost:27017/invoice-parser
   OPENAI_API_KEY=your api key
   ```

4. **Start MongoDB**

   Ensure MongoDB is running locally or your cloud MongoDB instance is accessible.

5. **Run the application**

   ```
   npm run dev
   ```

   The server will start on `http://localhost:5001`.

6. **API Endpoints**

   - `POST /invoice/parse`: Upload and parse a PDF invoice.
   - `GET /invoice/getInvoices`: Retrieve all stored invoices.
   - `GET /health`: Health check endpoint.


