import eurosFormatter from './euroFormatter.mjs';

function createWallet(name, cash = 0) {
  return {
    _name: name,
    _cash: cash,

    dailyAllowance: 40,
    dayTotalWithdrawals: 0,

    resetDailyAllowance() {
      this.dayTotalWithdrawals = 0;
    },

    setDailyAllowance(newAllowance) {
      if (newAllowance >= 0) {
        this.dailyAllowance = newAllowance;
        const formattedAllowance = eurosFormatter.format(newAllowance)
        return `Daily Allowance update to ${formattedAllowance}.`;
      } else {
        return "The new daily allowance must be greater than or equal to 0.";
      }
    },

    deposit(amount) {
      this._cash += amount;
    },

    withdraw(amount) {
      if (this._cash - amount < 0) {
        console.log(`Insufficient funds!`);
        return 0;
      }

      this._cash -= amount;
      return amount;
    },

    transferInto(wallet, amount) {
      console.log(
        `Transferring ${eurosFormatter.format(amount)} from ${
          this._name
        } to ${wallet.getName()}`
      );
      const withdrawnAmount = this.withdraw(amount);
      wallet.deposit(withdrawnAmount);
    },

    reportBalance() {
      console.log(
        `Name: ${this._name}, balance: ${eurosFormatter.format(this._cash)}`
      );
    },

    getName() {
      return this._name;
    },
  };
}

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
