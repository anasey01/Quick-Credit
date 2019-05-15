const dropLoansTable = () => 'DROP TABLE IF EXISTS loans';

const deleteLoan = id => ({
  text: 'DELETE FROM loans WHERE id = $1',
  values: [id],
});

const createLoan = (
  email,
  createdOn,
  tenor,
  amount,
  paymentInstallment,
  status,
  repaid,
  balance,
  interest,
) => ({
  text: `INSERT INTO 
    loans(email, createdOn, tenor, amount, paymentInstallment, status, repaid, balance, interest) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
  // eslint-disable-next-line max-len
  values: [email, createdOn, tenor, amount, paymentInstallment, status, repaid, balance, interest],
});

export default {
  dropLoansTable,
  deleteLoan,
  createLoan,
};
