const mongoose = require('mongoose');
const budgetModel = require('./models/budgetsModel');
const UserModel = require('./models/userModel');
const expenseModel=require('./models/expensesModel');
const userData = { email: 'TekLoon', password:'password',displayName:'njkrdg' };
let user_id='';
describe('User Model Test', () => {

    // It's just so easy to connect to the MongoDB Memory Server 
    // By using mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save user successfully', async () => {
        const validUser = new UserModel(userData);
        const savedUser = await validUser.save();
        // Object Id should be defined when successfully saved to MongoDB.
        user_id=savedUser._id;
        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe(userData.email);
    });

    it('save budget successfully', async () => {
        budgetData={budgetName:'Rent',budget:'385',userId:user_id};
        const budget=new budgetModel(budgetData);
        const savedBudget = await budget.save();
        expect(savedBudget._id).toBeDefined();
        expect(savedBudget.budgetName).toBe(budgetData.budgetName);
        
    });

    it('save expense successfully', async () => {
        expenseData={expenseName:'Recreation',expense:'15',userId:user_id};
        const expenseRec=new expenseModel(expenseData);
        const savedExpense = await expenseRec.save();
        expect(savedExpense._id).toBeDefined();
        expect(savedExpense.expenseName).toBe(expenseData.expenseName);
    });
})