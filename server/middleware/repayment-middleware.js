import db from '../database/config-db';
import queries from '../database/queries-db';

const middleware = {
  async createRepaymentRecord(req, res, next) {
    const requestLoanId = req.params.loanid;
    const { rows } = await db(queries.createRepayment(requestLoanId, Date.now(), req.body.amount, req.body.monthlyInstallment, req.body.paidAmount, req.body.balance));
    // eslint-disable-next-line prefer-destructuring
    req.data = rows[0];

    return next();
  },

};

export default middleware;
