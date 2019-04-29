import db from '../models/loans';
import Helper from '../helpers/Helper';

class Loan {
  // Create loan application
  static createLoan(req, res) {
    const calcAmount = parseFloat(req.body.amount);
    const calcInterest = ((5 / 100) * calcAmount);
    const calcPaymentInstallment = parseFloat((calcAmount + calcInterest) / req.body.tenor);    
    const loan = {
      id: db.length + 1,
      user: req.body.email,
      createdOn: new Date(),
      tenor: req.body.tenor,
      amount: calcAmount,
      paymentInstallment: calcPaymentInstallment,
      status: 'pending', // should default to pending
      balance: calcAmount,
      interest: calcInterest,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
    };
    db.push(loan); // User created
    return res.status(200).json({
      status: 200,
      data: {
        loanId: loan.id,
        firstName: loan.firstname,
        lastName: loan.lastname,
        email: loan.email,
        tenor: loan.tenor,
        amount: loan.amount,
        paymentInstallment: loan.paymentInstallment,
        status: loan.status, // should default to pending
        balance: loan.balance,
        interest: loan.interest,
      },
    });
  }

  // Get all loans
  static getAllLoans(req, res) {
    return res.status(200).json({
      status: 200,
      message: 'All loan applicatioin record successfully retrieved',
      data: db,
    });
  }

  // Get all repaid loans
  static getRepaidLoans(req, res) {
    const paramsString = req.url.split('?')[1];
    const eachParamArray = paramsString.split('&');
    const paramsDetails = Helper.getParams(eachParamArray);
    const foundData = db.filter(check => (check.status === paramsDetails.status && check.repaid === Boolean(paramsDetails.repaid)));
    // Repaid loans not found
    if (!foundData) {
      return res.status(404).json({
        status: 404,
        error: 'No loan repaid',
      });
    }
    // Repaid loans found
    return res.status(200).json({
      status: 200,
      data: foundData,
    });
  }

  // Get all current loans
  static getCurrentLoans(req, res) {
    const paramsString = req.url.split('?')[1];
    const eachParamArray = paramsString.split('&');
    const paramsDetails = Helper.getParams(eachParamArray);
    const found = db.filter(check => (check.status === paramsDetails.status && String(check.repaid) === paramsDetails.repaid));
    // Repaid loans not found
    if (!found) {
      return res.status(404).json({
        status: 404,
        error: 'No loan repaid',
      });
    }
    // Repaid loans found
    return res.status(200).json({
      status: 200,
      data: found,
    });
  }
}


export default Loan;
