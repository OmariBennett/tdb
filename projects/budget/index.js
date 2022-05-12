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
const XLSX = require('xlsx');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

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
const currentDate_Time = `${month} ${date}, ${year} ${currentTime}`;
const currentFullDate_Time = `${dayOfTheWeek} ${month} ${date}, ${year} ${currentTime}`;

//    Most scenarios involving spreadsheets and data can be broken into 5 parts:
//      1. Acquire Data: Data may be stored anywhere: local or remote files,
//          databases, HTML TABLE, or even generated programmatically in the web browser.
let ws_titles = [
	['id', 'author', 'amount', 'date', 'modified', 'modified_Date', 'memo'],
];
let filename = 'testFile';
let folderName = 'excel';
let file = `./${filename}.xlsx`;
const workbook = XLSX.utils.book_new();

const increment = number => {
	let num = parseInt(number);
	return (num += 1);
};

// console.log(String.fromCodePoint(0x1f303));  //* "Night with Stars": UTF-16
/**
 * Increment the letter A through Z
 *
 * ex: fn( A ) => B
 * @param {string} string A letter A through Z
 * @returns {string}
 */
const incrementAlphabet = string => {
	let newLetter = null;
	const letter = string.toUpperCase().charCodeAt(0);

	if (letter < 65 || letter > 90)
		console.log(
			'Warning: The string provided needs to be between A through  Z.',
		);

	newLetter = letter + 1;

	if (newLetter >= 91) newLetter = 65;

	return String.fromCharCode(newLetter);
};

const incrementCell_Row = worksheet => {
	// Ex: A1 - worksheet cell coordinate
	const cellCoordinate = Object.getOwnPropertyNames(worksheet).pop();
	const column = cellCoordinate[0];
	const row = cellCoordinate[1];
	const nextColumn = incrementAlphabet(column);
	const nextCellCoordinate = `${nextColumn}${row}`;
	return nextCellCoordinate;
};
const incrementCell_Column = (string, bool = false) => {
	// Ex: A1 - worksheet cell coordinate
	const cellCoordinate = string;
	const column = cellCoordinate[0];
	const row = cellCoordinate[1];
	const nextRow = increment(row);
	// console.log(bool ? 'A1' : `${column}${nextRow}`);
	const nextCellCoordinate = bool ? `A${nextRow}` : `${column}${nextRow}`;
	return nextCellCoordinate;
};

const createCellRow = (worksheet, invoice) => {
	/* Workbook object ex:
{
  '!ref': 'A1:G1',
  A1: { t: 's', v: 'id', h: 'id', w: 'id' },      
  B1: { t: 's', v: 'author', h: 'author', w: 'author' },
  C1: { t: 's', v: 'amount', h: 'amount', w: 'amount' },
  D1: { t: 's', v: 'date', h: 'date', w: 'date' },  E1: { t: 's', v: 'modified', h: 'modified', w: 'modified' },
  F1: {
    t: 's',
    v: 'modified_Date',
    h: 'modified_Date',
    w: 'modified_Date'
  },
  G1: { t: 's', v: 'memo', h: 'memo', w: 'memo' } 
}*/

	//  last cell coordinate: G1: { t: 's', v: 'memo', h: 'memo', w: 'memo' }
	// 	next cell coordinate:	A2: { t: 's', v: 'memo', h: 'memo', w: 'memo' }
	// 	next cell coordinate:	B2: { t: 's', v: 'memo', h: 'memo', w: 'memo' }
	const previousCellCoordinate = Object.getOwnPropertyNames(worksheet).pop();
	// console.log({ previousCellCoordinate });
	let cellCoordinate = incrementCell_Column(previousCellCoordinate, true);
	let nextCellCoordinate;
	// console.log(Object.values(invoice));
	// console.log(incrementCell_Column(cellCoordinate, true));

	// console.log(cellCoordinate);
	for (let i = 0; i < Object.values(invoice).length; i++) {
		const element = Object.values(invoice)[i];
		nextCellCoordinate = incrementCell_Column(cellCoordinate);
		// console.log(element);
		console.log(nextCellCoordinate);
		console.log({ [cellCoordinate]: '' });
	}

	for (const key in invoice) {
		if (Object.hasOwnProperty.call(invoice, key)) {
			const element = invoice[key];
			// nextCellCoordinate = incrementCell_Column(cellCoordinate);
			// console.log(nextCellCoordinate);
			// console.log({
			// 	[nextCellCoordinate]: {
			// 		t: 's',
			// 		// v: element,
			// 		// h: element,
			// 		// w: element,
			// 	},
			// });
		}
	}
	// console.log({
	// 	[cellCoordinate]: {
	// 		t: 's',
	// 		v: invoice.author,
	// 		h: invoice.author,
	// 		w: invoice.author,
	// 	},
	// });
};
//          Step 1: Create a new workbook
/**
 *  Create a new workbook.
 * @param {string} filename Name for the file with file extension. ex: 'file_name.xlsx'
 *
 * The book_new utility function creates an empty workbook with no worksheets.
 * Spreadsheet software generally require at least one worksheet and enforce the requirement
 * in the user interface.
 *
 * This library enforces the requirement at write time, throwing errors if an empty workbook is passed to write functions.
 * @returns
 */
const createWorkbook = (workbook, filename) => {
	try {
		const path = `./projects/budget/${folderName}`;
		createWorksheet('Test Excel Sheet', workbook, file);

		//        Step 1a: Save workbook to local storage (local file system)
		fs.access(path, error => {
			if (error) {
				XLSX.writeFile(workbook, filename);
				fs.mkdir(path, error => {
					if (error) {
						console.log(error);
					}
				});
				XLSX.writeFile(workbook, filename);

				fs.rename(filename, `${path}/${filename}`, err => {
					if (err) throw err;
					console.log('Intialize new workbook.');
				});
			} else {
				XLSX.writeFile(workbook, filename);

				fs.rename(filename, `${path}/${filename}`, err => {
					if (err) throw err;
					console.log('Intialize new workbook.');
				});
			}
		});
		return;
	} catch {
		console.error(
			'Empty workbook with no worksheet was pass to the writeFile()',
		);
		console.error(
			'This library enforces the requirement at write time, throwing errors if an empty workbook is passed to write functions.',
		);
	}
};

//             Todo: C.R.U.D workbook (Create, Read, Update, & Delete)
//*              Create Worksheet
/**
 *  Create a new worksheet.
 * @param {string} ws_title Name for the worksheet object
 * @param {object} workBook Workbook object
 * @param {string} file_name Name for the file with file extension. ex: 'file_name.xlsx'
 */
const createWorksheet = (ws_title, workBook, file_name) => {
	let ws_data = [...ws_titles];
	let worksheet = XLSX.utils.aoa_to_sheet(ws_data);

	XLSX.utils.book_append_sheet(workBook, worksheet, ws_title);
	return workBook;
};

//*              Append Worksheet to Workbook
/**
 *  Append Worksheet to the workbook
 * @param {object} workbook Workbook object
 * @param {array} worksheet Array of arrays in row-major order
 * @param {string} title Name for the worksheet
 */
function appendWorksheet(workbook, worksheet, title) {
	const ws_data = [...ws_titles, ...worksheet];
	const newWorksheet = XLSX.utils.json_to_sheet(ws_data);

	XLSX.utils.book_append_sheet(workbook, newWorksheet, title);
}

//*              Read Workbook data
/**
 * Read workbook
 * @param {string} filePath Read a spreadsheet file at the supplied
 * path. Browsers generally do not allow reading files in this way
 * (it is deemed a security risk), and attempts to read files in
 * this way will throw an error.
 *
 * @return {object}
 */
const readWorkbook = filePath => XLSX.readFile(filePath);

//*              Delete Workbook
/**
 * Delete workbook from the file directory
 * @param {string} path The file path of the workbook
 */
const deleteWorkbook = path => {
	fs.unlink(path, error => {
		if (error) {
			console.error(error);
			return;
		}
		console.log('file removed!');
	});
};

//          Todo: C.R.U.D invoice (Create, Read, Update, & Delete)
//          Step 2: Create Invoice
const newInvoice = (
	author,
	amount,
	Memo,
	//            Step 2a: Invoice: Id | Author | Amount | Date | Modified | Modified Date | Memo |
	//            Convert the string into a object 'Netflix bill 19.07 Jan 14'
) => ({
	id: uuidv4(),
	author,
	amount,
	date: currentDate_Time,
	Modified: false,
	Modified_Date: '',
	Memo,
});

//            Net increase (pay stub, extra cash, ...)

//          Step 2b: Get Invoice
//          Step 2c: Update Invoice
//          Step 2d: Delete Invoice
//          Step 2e: Append Invoice to the worksheet
const appendInvoiceToWorksheet = (workbook, invoice) => {
	const wb = workbook.Sheets;
	const ws_name = workbook.SheetNames[0];
	const worksheet = workbook.Sheets[ws_name];
	let lastWorkbookObjectKey = null;
	createCellRow(worksheet, invoice);
	// console.log(invoice);
	// console.log(wb);
	// console.log(ws_name);
	// console.log(worksheet);

	// XLSX.utils.book_append_sheet(workbook, worksheet, sheet_name);
};

//      2. Extract Data: For spreadsheet files, this involves parsing raw bytes to read
//          the cell data. For general JS data, this involves reshaping the data.

//      3. Process Data: From generating summary statistics to cleaning data records,
//          this step is the heart of the problem.

//          - Calculate your net income
//          Step 1: Input all net increase (pay stub, extra cash, ...)

//          - Label fixed and variable expenses
//          Todo: Determine if invoice is a fixed or variable expenses
//          Step 2: Determine if input is one time invoice or reoccurring invoice

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

console.log('Initialising...');
const excel_File = readWorkbook(`./projects/budget/${folderName}/${file}`);

const Netflix = newInvoice('Netflix', 19.07, '');

appendInvoiceToWorksheet(excel_File, Netflix);
// createWorkbook(workbook, file);
// console.log('Deleting Workbook...');
// deleteWorkbook(`./projects/budget/${folderName}/${file}`);
// appendWorksheet(workbook, ['Hello', 'World', '!'], 'New work sheet');
// appendWorksheet(workbook, ['Hello', 'World', '!'], 'New work sheet@2');
// appendWorksheet(workbook, ['Hello', 'World', '!'], 'New work sheet@3');
// appendWorksheet(workbook, ['Hello', 'World', '!'], 'New work sheet@4');
