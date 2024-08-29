const csv = require('csv-parser');
const xlsx = require('xlsx');
const fs = require('fs');
const Transaction = require('../models/Transaction');
const { verifyToken } = require('../utils/jwt');
const Budget = require('../models/Budget');

// Route to upload CSV or Excel files
 const uploadTransactions = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileBuffer = req.file.buffer; // File buffer from multer's memory storage
  const fileType = req.file.mimetype;

  try {
    const decoded = verifyToken(token);
    const user_id = decoded.userId;
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
    transactions.map(t=> t.user_id = user_id)
    // Save the parsed transactions to MongoDB
    await Transaction.insertMany(transactions);

    return res.status(201).json({ message: 'Transactions uploaded successfully', transactions });
  } catch (error) {
    console.error('Error uploading transactions:', error);
    return res.status(500).json({ error: 'Failed to upload transactions' });
  }
};

const uploadBudgets = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileBuffer = req.file.buffer; // File buffer from multer's memory storage
  const fileType = req.file.mimetype;

  try {
    const decoded = verifyToken(token);
    const user_id = decoded.userId;
    let budgets = [];

    if (fileType === 'text/csv') {
      // Handle CSV files
      const csvData = fileBuffer.toString();
      budgets = await parseCSV(csvData);
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      // Handle Excel files
      budgets = parseExcel(fileBuffer);
    } else {
      return res.status(400).json({ error: 'Unsupported file type' });
    }
    budgets.map(t=> t.user_id = user_id)
    console.log(budgets)
    // Save the parsed budgets to MongoDB
    await Budget.insertMany(budgets);

    return res.status(201).json({ message: 'Budgets uploaded successfully', budgets });
  } catch (error) {
    console.error('Error uploading budget:', error);
    return res.status(500).json({ error: 'Failed to upload budget' });
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


module.exports = {
  uploadTransactions,
  uploadBudgets
};