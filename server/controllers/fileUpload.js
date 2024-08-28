const csv = require('csv-parser');
const xlsx = require('xlsx');
const fs = require('fs');

// Route to upload CSV or Excel files
export const uploadTransactions = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileBuffer = req.file.buffer; // File buffer from multer's memory storage
  const fileType = req.file.mimetype;

  try {
    let transactions = [];

    if (fileType === 'text/csv') {
      // Handle CSV files
      const csvData = fileBuffer.toString();
      transactions = await parseCSV(csvData);
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      // Handle Excel files
      transactions = parseExcel(fileBuffer);
    } else {
      return res.status(400).json({ error: 'Unsupported file type' });
    }

    // Save the parsed transactions to MongoDB
    await Transaction.insertMany(transactions);

    return res.status(201).json({ message: 'Transactions uploaded successfully', transactions });
  } catch (error) {
    console.error('Error uploading transactions:', error);
    return res.status(500).json({ error: 'Failed to upload transactions' });
  }
};

// Helper function to parse CSV files
const parseCSV = async (csvData) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const stream = require('stream');
    const readableStream = new stream.Readable();
    readableStream._read = () => {}; // no-op
    readableStream.push(csvData);
    readableStream.push(null);

    readableStream
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

// Helper function to parse Excel files
const parseExcel = (fileBuffer) => {
  const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0]; // Assume data is in the first sheet
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet);
};
