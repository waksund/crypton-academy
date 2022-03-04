const {task} = require("hardhat/config");

task("donations/totalDonations", "get total donations")
    .addParam("contract", "contract address")
    .setAction(async (taskArgs) => {
            const factory = await ethers.getContractFactory("Donations");
            const contract = await factory.attach(taskArgs.contract);
            
            const totalDonations = await contract.totalDonations();
            console.log(`total donations ${totalDonations}`);
    });

module.exports = {};