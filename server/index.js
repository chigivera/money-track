require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose'); // Import mongoose
const authenticateToken = require('./errors/unauthenticated');
const cors = require('cors');
const port = process.env.APP_PORT || 8000;

// Import route files
const userRoutes = require('./routes/user');
const budgetRoutes = require('./routes/budget');
const expenseRoutes = require('./routes/expenseCategory');
const transactionRoutes = require('./routes/transaction');

const { notFound } = require('./errors/not-found');
const { serverError } = require('./errors/index');
const adminAuth = require('./errors/unauthorized');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credential:true,
    origin:"http://localhost:3000"
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Define routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/budget', budgetRoutes);
app.use('/api/v1/expense', expenseRoutes);
app.use('/api/v1/transaction', transactionRoutes);
app.use(notFound);
app.use(serverError);

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}....`);
});
