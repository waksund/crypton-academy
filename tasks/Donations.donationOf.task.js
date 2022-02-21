require("@nomiclabs/hardhat-web3");
const {task} = require("hardhat/config");
const abi = require("../build/Donations.abi.json");

task("donations/donationOf", "get address donations")
    .addParam("contract", "contract address")
    .addParam("donator", "donator's address")
    .setAction(async (taskArgs) => {
        const web3 = new Web3(process.env.INFURA_URL);
        const contractAddress = web3.utils.toChecksumAddress(taskArgs.contract);
        const donatorAddress = web3.utils.toChecksumAddress(taskArgs.donator);
        const contract = new web3.eth.Contract(abi, contractAddress);

        const donation = await contract.methods.donationOf(donatorAddress).call();

        console.log(`donation of ${donatorAddress}: ${donation}`);
    });

module.exports = {};