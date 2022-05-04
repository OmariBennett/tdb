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
              Todo: C.R.U.D invoices (Create, Read, Update, & Delete)
              Step 1: Input all net increase (pay stub, extra cash, ...)
                Step 1a: Create a new Invoice: Id | Author | Amount | Date | Modified | Modified Date | Memo |
                Step 1b: Determine if input is one time invoice or reoccurring invoice

          - List monthly expenses
              Todo: C.R.U.D worksheets (Create, Read, Update, & Delete)
              Step 2: Automatically add or deduct reoccurring monthly expenses
                Step 2a: Add any additional expenses 

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
              Todo: Track and manage your budget through regular check-ins.

*       SheetJs Usage
          Most scenarios involving spreadsheets and data can be broken into 5 parts:
            1.  Acquire Data: Data may be stored anywhere: local or remote files, 
                databases, HTML TABLE, or even generated programmatically in the web browser.

            2. Extract Data: For spreadsheet files, this involves parsing raw bytes to read
                the cell data. For general JS data, this involves reshaping the data.

            3. Process Data: From generating summary statistics to cleaning data records,
                this step is the heart of the problem.

            4. Package Data: This can involve making a new spreadsheet or serializing with
                JSON.stringify or writing XML or simply flattening data for UI tools.

            5. Release Data: Spreadsheet files can be uploaded to a server or written locally.
                Data can be presented to users in an HTML TABLE or data grid. 

*/
//  Step  3. Pseudocode
//    Most scenarios involving spreadsheets and data can be broken into 5 parts:
//      1. Acquire Data: Data may be stored anywhere: local or remote files,
//          databases, HTML TABLE, or even generated programmatically in the web browser.

//          - Calculate your net income
//          Todo: C.R.U.D invoices (Create, Read, Update, & Delete)
//          Step 1: Input all net increase (pay stub, extra cash, ...)
//          Step 1a: Create a new Invoice: Id | Author | Amount | Date | Modified | Modified Date | Memo |
//          Todo:  Convert the string into a object 'Netflix bill 19.07 Jan 14'
//          Step 1b: Determine if input is one time invoice or reoccurring invoice

//          - Label fixed and variable expenses
//          Todo: Determine if invoice is a fixed or variable expenses

//      2. Extract Data: For spreadsheet files, this involves parsing raw bytes to read
//          the cell data. For general JS data, this involves reshaping the data.

//      3. Process Data: From generating summary statistics to cleaning data records,
//          this step is the heart of the problem.

//          - List monthly expenses
//          Todo: C.R.U.D worksheets (Create, Read, Update, & Delete)
//          Step 2: Automatically add or deduct reoccurring monthly expenses
//          Step 2a: Add any additional expenses

//      4. Package Data: This can involve making a new spreadsheet or serializing with
//          JSON.stringify or writing XML or simply flattening data for UI tools.

//      5. Release Data: Spreadsheet files can be uploaded to a server or written locally.
//          Data can be presented to users in an HTML TABLE or data grid.

//          - Determine average monthly costs for each expenses
//          Todo: Output the worksheet invoices

//          - Make adjustments

//    Step 4. Test-Driven Development (TDD)
//    Step 5. Implement
//    Step 6. Practice
//    Step 7. Repeat
/*  App Features:
    Step C.R.U.D worksheets (Create, Read, Update, & Delete)
    Step C.R.U.D invoices (Create, Read, Update, & Delete)
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

console.log('hello world!');
const invoice = {
	id: 01234,
	author: 'Netflix',
	amount: '19.07',
	date: 'Jan 14',
	Modified: false,
	Modified_Date: '',
	Memo: '',
};
