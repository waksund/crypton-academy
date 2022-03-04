const {task} = require("hardhat/config");

task("donations/donations", "get all donators")
    .addParam("contract", "contract address")
    .setAction(async (taskArgs) => {
            const factory = await ethers.getContractFactory("Donations");
            const contract = await factory.attach(taskArgs.contract);

            const donations = await contract.donations();

            console.log(`all donators: ${donations.toString()}`);
    });

module.exports = {};