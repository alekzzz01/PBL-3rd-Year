import express from 'express';
import { addExpense, deleteExpenseItem, updateExpenseItem, getExpenseItemsForUser, getTotalExpensePerMonth, getTotalExpenses } from "../controllers/expenseController.js"; 
import authMiddleware from '../middleWare/checkAuth.js';

const router = express.Router();

router.post('/addexpenses', authMiddleware , addExpense);
router.get('/totalExpenses', authMiddleware, getTotalExpenses);
router.delete('/deleteexpenses/:expenseItemId', authMiddleware, deleteExpenseItem); // Route for deleting an expense item
router.put('/updateexpenses/:expenseItemId', authMiddleware, updateExpenseItem); // Route for updating an expense item
router.get('/expenseitems', authMiddleware, getExpenseItemsForUser);
router.get('/monthly-total', authMiddleware, getTotalExpensePerMonth)

router.get('/', (req, res, next ) => {
    res.send("Hello World")
});

export { router as ExpenseRouter };

