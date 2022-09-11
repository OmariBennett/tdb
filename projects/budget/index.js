// @ts-check
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
                Data can be presented to users in an HTML TABLE or data grid. */

//  Step  3. Pseudocode
import XLSX from 'xlsx';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
// import csvdata from 'csvdata';
import path from 'path';

const time = new Date();

const seconds = time.getSeconds();
const minutes = time.getMinutes();
const hours = time.getHours(); //? Why the 'hour' variable is outputing a hour behind?

const date = time.getDate();
let month = null;
switch (time.getMonth()) {
	case 1:
		month = 'February';
		break;
	case 2:
		month = 'March';
		break;
	case 3:
		month = 'April';
		break;
	case 4:
		month = 'May';
		break;
	case 5:
		month = 'June';
		break;
	case 6:
		month = 'July';
		break;
	case 7:
		month = 'August';
		break;
	case 8:
		month = 'September';
		break;
	case 9:
		month = 'October';
		break;
	case 10:
		month = 'November';
		break;
	case 11:
		month = 'December ';
		break;

	default:
		month = 'January';
		break;
}
const year = time.getFullYear();

let dayOfTheWeek = null;
switch (time.getDay()) {
	case 1:
		dayOfTheWeek = 'Monday';
		break;
	case 2:
		dayOfTheWeek = 'Tuesday';
		break;
	case 3:
		dayOfTheWeek = 'Wednesday';
		break;
	case 4:
		dayOfTheWeek = 'Thursday';
		break;
	case 5:
		dayOfTheWeek = 'Friday';
		break;
	case 6:
		dayOfTheWeek = 'Saturday';
		break;

	default:
		dayOfTheWeek = 'Sunday';
		break;
}

const currentTime = `${hours}:${minutes}:${seconds}`;
const currentDate = `${dayOfTheWeek} ${month} ${date}, ${year}`;
const currentDate_Time = `${month} ${date}-${year} ${currentTime}`;
const currentFullDate_Time = `${dayOfTheWeek} ${month} ${date}, ${year} ${currentTime}`;
const currentMonth = time.getMonth() + 1;
const formatedMonth = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
//    Most scenarios involving spreadsheets and data can be broken into 5 parts:
//      1. Acquire Data: Data may be stored anywhere: local or remote files,
//          databases, HTML TABLE, or even generated programmatically in the web browser.
//          Step 1: Create Invoice log csv data log
const newInvoice = (author, amount, Memo) => ({
	id: uuidv4(),
	author,
	amount,
	date: currentDate_Time,
	Modified: false,
	Modified_Date: '',
	Memo
});
const Netflix = newInvoice('Netflix', 19.07, 'invoice memo');
const Hulu = newInvoice('Hulu', 12.07, 'invoice memo');
const CrunchyRoll = newInvoice('CrunchyRoll', 35.97, 'invoice memo');
const Att = newInvoice('AT&T', 235.87, 'invoice memo');
const Gas = newInvoice('GAS', 50.49, 'invoice memo');
const invoiceHeader = 'id,author,amount,date,Modified,Modified_Date,Memo';
let reoccurringInvoice = [Netflix, Hulu, CrunchyRoll];
const New_Invioce = [Att, Gas];
//          Step 2b: Get Invoice
const FILE_PATH = `./duplicate-invoice.csv`; // `./projects/budget/invoices/2022/quarterly-02/logs-08-2022.csv`;
/**
 * @description Returns a promise, eventually fulfilled when done writing data to "filePath"
 * (be careful, as it overwrites existing files).
 * @param {string} filePath Reads data from "filePath" (the first line of the CSV file must contain headers).
 * @param data
 * @param {object} options options argument is a configuration object with the following default values.
 * @example 'options argument default values :' {
 * append: false,
 * delimiter: ',',
 * empty: false,
 * encoding: 'utf8',
 * header: '',
 * log: true
 *}
 * @example 'data argument types':
 * 'String (e.g. 'a,b,c\nd,e,f')'
 * 'Array of arrays (e.g.' [['a','b','c'],['d','e','f']]')'
 * 'Array of objects (e.g.' [{amount: 100, name: 'John'}, {amount: 130, name: 'Paul'}]')'
 * 'Object containing objects (e.g.' {John: {amount: '100', name: 'John' }, Paul: {amount: '130', name: 'Paul'}}')'
 * @example 'data examples'
 * {header: 'age,hair,name'}
 * {empty: true, header: 'name,hair,age'}
 */
const writeFile = async (filePath, data, options = null) => {
	if (options === null) {
		return console.log('Wraining: CSV file must contain a header');
	}
	return csvdata.write(filePath, data, options);
};
/**
 * @param {string} filePath Reads data from "filePath" provided
 */
const deleteFile = (filePath) =>
	fs.unlink(filePath, (err) => {
		if (err) throw err;
		console.log(`${filePath} was deleted`);
	});
/**
 * @description Returns a promise, eventually fulfilled with an array where each item is an object that contains data from a row
 * @param {string} filePath Reads data from "filePath" (the first line of the CSV file must contain headers).
 * @param {object} options options argument is a configuration object with the following default values.
 * @example 'options argument default values :' {
 * delimiter: ',',
 * encoding: 'utf8',
 * log: true,
 * objName: undefined,
 * parse: true,
 * stream: false
 *}
 * @example  'CSV file header example: ' {objName: 'string'}
 */
const readCSVFile = async (filePath, options = null) => {
	return options != null ? await csvdata.load(filePath) : await csvdata.load(filePath, options);
};
/**
 * @param {string} filePath filePath Reads data from "filePath"
 */
const createFolder = (filePath) => {
	fs.mkdir(filePath, (error) => {
		if (error) {
			console.log(error);
		}
	});
	console.log(`${filePath} directory was created`);
};
/**
 * @param {string} filePath filePath Reads data from "filePath"
 */
const deleteFolder = (filePath) =>
	fs.rmdir(filePath, function (error) {
		if (error) {
			throw error;
		} else {
			console.log('Folder deleted successfully!');
		}
	});
/**
 * @description Returns a promise, eventually fulfilled when done writing data to "filePath"
 * (be careful, as it overwrites existing files).
 * @param {string} filePath  Reads data from "filePath" provided
 * @param {Object} newData
 * @returns
 */
const updateCSVFile = async (filePath, newData, options = null) => {
	const csvData = await readCSVFile(filePath);
	if (csvData === undefined) return console.log('Error: CSV Data is equal to undefined');
	return writeFile(filePath, [...csvData, ...newData], options);
};
/**
 * @description Delete a single objcet from the CSV array with matching id
 * @param {string} filePath Reads data from "filePath" (the first line of the CSV file must contain headers).
 * @param {string} id
 * @param {object} options options argument is a configuration object with the following default values.
 * @returns
 */
const deleteCSVRow = async (filePath, id, options = null) => {
	const csvData = await readCSVFile(filePath);
	// @ts-ignore
	const modifiedCSVData = csvData.filter((i) => i.id != id);
	return writeFile(filePath, modifiedCSVData, options);
};
//          Step 2c: Update Invoice
//            Step 2b: Add reoccurring monthly expenses to the csv log
//             Net increase (pay stub, extra cash, ...)
//          Step 2d: Delete Invoice
//          Step 2e: Save Invoice

//      2. Extract Data: For spreadsheet files, this involves parsing raw bytes to read
//          the cell data. For general JS data, this involves reshaping the data.

//      3. Process Data: From generating summary statistics to cleaning data records,
//          this step is the heart of the problem.

//          - Calculate your net income
//          Step 1: Input all net increase (pay stub, extra cash, ...)

//          - Label fixed and variable expenses
//          Todo: Determine if invoice is a fixed or variable expenses
//          Step 2: Determine if input is one time invoice or

//          - List monthly expenses
//          Step 3: Automatically add or deduct reoccurring monthly expenses
//            Step 3a: Add any additional expenses

//          - Determine average monthly costs for each expenses

//          - Make adjustments
//          Todo: Output the worksheet invoices

//          - Calculate your monthly income, pick a budgeting method, and monitor your progress.
//            - Try the 50/30/20 rule as a simple budgeting framework.
//              Todo: Allow up to 50% of your income for needs.
//              Todo: Leave 30% of your income for wants.
//              Todo: Commit 20% of your income to savings and debt repayment.
//              Todo: Track and manage your budget through regular check-ins.

//      4. Package Data: This can involve making a new spreadsheet or serializing with
//          JSON.stringify or writing XML or simply flattening data for UI tools.

//      5. Release Data: Spreadsheet files can be uploaded to a server or written locally.
//          Data can be presented to users in an HTML TABLE or data grid.
//          Todo: Output the workbook & worksheet

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

    Step Update Cards: Deposit amount to the card saving accounts
      todo - depost total amount to the cards saving accounts

    Step Add New Invoice:
      todo - submit new invoice form (once)
      todo - submit new invoice form (repeating)
*/

function init() {
	console.log('Initialising...');
	// writeFile(FILE_PATH, reoccurringInvoice, { header: invoiceHeader });
	// updateCSVFile(FILE_PATH, [...New_Invioce], { header: invoiceHeader });
	// deleteCSVRow(FILE_PATH, 'd90a8a87-a64a-478a-aeec-dc6713ead76d',{
	// 	header: invoiceHeader,
	// });
	// deleteFile(`duplicate-invoice.csv`);
}
init();
