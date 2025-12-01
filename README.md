# Invoice Parser API

An Express.js API that allows you to upload, parse, and store invoice data (from PDF, PNG, or JPG files) into MongoDB with the help of OpenAI and LangChain.

---

## Tech Stack

- **Node.js & Express.js**: Handles API routing and web server logic
- **MongoDB**: Stores structured invoice data
- **Mongoose**: ODM for MongoDB schemas/models
- **OpenAI API** (via **LangChain**): Performs AI-based invoice data extraction
- **Multer**: Manages file uploads (PDF, PNG, JPG)
- **pdf-parse**: Extracts text from PDFs
- **tesseract.js**: Performs OCR on images (PNG, JPG)
- **dotenv**: Manages environment variables
- **CORS**: Enables cross-origin requests
- **@langchain/core & @langchain/openai**: For LLM message passing and OpenAI integration

---

## Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/pratikshelar546/invoice-parser-server.git
   cd invoice-parser-server
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the root of the project:
     ```
     MONGO_URI=mongodb://localhost:27017/invoice-parser
     OPENAI_API_KEY=your-openai-api-key
     ```

4. **Start MongoDB:**
   - Ensure a local or accessible MongoDB instance is running.

5. **Run the application:**
   ```sh
   npm run dev
   ```
   - By default, the server listens on [http://localhost:5001](http://localhost:5001).

---

## API Endpoints

- `POST /invoice/parse`
  - Upload a PDF, PNG, or JPG invoice. The API extracts and parses invoice data with AI, then stores it.
- `GET /invoice/getInvoices`
  - Fetch all parsed invoices from MongoDB.
- `GET /health`
  - Simple health check endpoint; returns "OK" if server is up.

---

## Extraction Process

1. **File Upload & Text Extraction**
   - Multer middleware accepts the incoming file (PDF, JPG, or PNG).
   - For PDFs: Uses `pdf-parse` for text extraction.
   - For images: Uses `tesseract.js` for OCR text extraction.

2. **AI Invoice Data Extraction**
   - Extracted text is sent to the OpenAI API (via LangChain) with a carefully crafted prompt.
   - The model returns extracted invoice fields in a well-structured JSON, with a confidence score and field tag.

3. **Validation & Storage**
   - The API validates the structured JSON data.
   - Stores the validated invoice document in MongoDB for future access.

4. **Fetching Stored Invoices**
   - `GET /invoice/getInvoices` retrieves all stored invoice documents as JSON.

---

## Limitations

- **File Limit:** Maximum upload size is 10MB.
- **Format:** Best results with clear, standard, English-language invoices. Scanned images or irregular layouts may reduce accuracy.
- **OpenAI Reliance:** Quality of extraction depends on LLM accuracy and may vary as OpenAI changes.
- **Authentication:** Minimal auth included; for production, implement robust authentication.
- **Rate Limiting:** Basic, not suited for high-security or public APIs.

---


