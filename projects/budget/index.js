/* If I had an hour to solve a problem, I'd spend 55 minutes thinking about the problem and 5 minutes thinking about solutions." -Albert Einstein
 */
/*  Problem Solving Steps:
    Step  1. Identify the problem
?     What problem dose the 'Budget' application solve?
        - A central hub for all my financial accounts
        - A visual representation of my finances 
        - A personal way to budget my finances
    
    Step  2. Research & Refine
?     How to create a budget?
        - Calculate your net income
              Todo: C.R.U.D invoice (Create, Read, Update, & Delete)
          - List monthly expenses
              Todo: C.R.U.D work sheet (Create, Read, Update, & Delete)
          - Label fixed and variable expenses
              Todo: Determine if invoice is a fixed or variable expenses

        - Determine average monthly costs for each expenses
              Todo: Output the worksheet invoices
          - Make adjustments

?     How to budget money after-tax income?
        - Calculate your monthly income, pick a budgeting method, and monitor your progress.
          - Try the 50/30/20 rule as a simple budgeting framework.
              Todo: Allow up to 50% of your income for needs.
              Todo: Leave 30% of your income for wants.
              Todo: Commit 20% of your income to savings and debt repayment.
              Todo: Track and manage your budget through regular check-ins

    Step  3. Pseudocode
    Step 4. Test-Driven Development (TDD)
    Step 5. Implement
    Step 6. Practice
    Step 7. Repeat
*/

/*  App Features:
    Step New Monthly Invoice: Record 'repeating' invoices
      todo - create new Excel sheet
      todo - create a new monthly invoice
      todo - record all repeating monthly invoices

    Step New Deposit:
      todo - submit new Amount form
      todo - submit new Check form
      todo - submit new Other Amount form

    Step Update Cards: Deposit amount to the card savings
      todo - depost total amount to the cards savings

    Step Add New Invoice:
      todo - submit new invoice form (once)
      todo - submit new invoice form (repeating)
*/

//  Create a new Invoice:
//  *  | Id | Author | Amount | Date | Modified | Modified Date | Memo |
// todo Convert the string into a object 'Netflix bill 19.07 Jan 14'
const invoice = { author: 'Netflix', amount: '19.07', date: 'Jan 14' };

console.log('hello world!');
