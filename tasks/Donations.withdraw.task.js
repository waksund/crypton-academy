const {task} = require("hardhat/config");

task("donations/withdraw", "Withdraw donations")
    .addParam("contract", "contract address")
    .addParam("to", "withdraw to address")
    .addParam("amount", "withdraw amount")
    .setAction(async (taskArgs) => {
        const [owner] = await ethers.getSigners();
        const factory = await ethers.getContractFactory("Donations");
        const contract = await factory.attach(taskArgs.contract);
        const withdrawAmount = ethers.utils.parseEther(taskArgs.amount);

        await contract.connect(owner).withdraw(taskArgs.to, withdrawAmount);
    });

module.exports = {};