const {task} = require("hardhat/config");

task("donations/donationOf", "get address donations")
    .addParam("contract", "contract address")
    .addParam("donator", "donator's address")
    .setAction(async (taskArgs) => {
            const factory = await ethers.getContractFactory("Donations");
            const contract = await factory.attach(taskArgs.contract);
            const donatorAddress = taskArgs.donator;

            const donation = await contract.donationOf(donatorAddress);
            console.log(`donation of ${donatorAddress}: ${donation}`);
    });

module.exports = {};