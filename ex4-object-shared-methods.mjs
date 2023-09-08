import eurosFormatter from './euroFormatter.mjs';

function Wallet(name, cash = 0) {
  this._name = name;
  this._cash = cash;
  this._dailyAllowance = 40;
  this.dayTotalWithdrawals = 0;
}

Wallet.prototype.deposit = function (amount) {
  this._cash += amount;
}

Wallet.prototype.withdraw = function (amount) {
  if (this._cash - amount < 0) {
    console.log(`Insufficient funds!`);
    return 0;
  }

  this._cash -= amount;
  this.dayTotalWithdrawals += amount;
  return amount;
}

Wallet.prototype.transferInto = function (wallet, amount) {
  console.log(
    `Transferring ${eurosFormatter.format(amount)} from ${
      this._name
    } to ${wallet.getName()}`
  );
  const withdrawnAmount = this.withdraw(amount);
  wallet.deposit(withdrawnAmount);
};

Wallet.prototype.reportBalance = function() {
  console.log(
    `Name: ${this._name}, balance: ${eurosFormatter.format(this._cash)}`
  );
};

Wallet.prototype.getName = function () {
  return this._name;
};

Wallet.prototype.resetDailyAllowance = function () {
  this.dayTotalWithdrawals = 0;
};

Wallet.prototype.setDailyAllowance = function (newAllowance) {
  if (newAllowance >= 0) {
    this._dailyAllowance = newAllowance;
  } else {
    console.log("The new daily allowance must be greater than or equal to 0.");
  }
};

function createWallet(name, cash = 0) {
  return new Wallet (name, cash); 
};


function main() {
  const walletJack = createWallet('Jack', 100);
  const walletJoe = createWallet('Joe', 10);
  const walletJane = createWallet('Jane', 20);

  walletJack.transferInto(walletJoe, 50);
  walletJane.transferInto(walletJoe, 25);

  walletJane.deposit(20);
  walletJane.transferInto(walletJoe, 25);

  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();
}

main();