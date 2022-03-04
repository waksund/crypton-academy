const {task} = require("hardhat/config");

task("donations/donate", "Prints all donators")
    .addParam("contract", "contract address")
    .addParam("donate", "donate amount wei")
    .setAction(async (taskArgs) => {
            const [donator] = await ethers.getSigners();
            const factory = await ethers.getContractFactory("Donations");
            const contract = await factory.attach(taskArgs.contract);
            const donateAmount = ethers.utils.parseEther(taskArgs.donate);

            await contract.connect(donator).donate({value:donateAmount});
    });

module.exports = {};