require("@nomiclabs/hardhat-web3");
const {task} = require("hardhat/config");
const abi = require("../build/Donations.abi.json");

task("donations/donations", "get all donators")
    .addParam("contract", "contract address")
    .setAction(async (taskArgs) => {
        const web3 = new Web3(process.env.INFURA_URL);
        const contractAddress = web3.utils.toChecksumAddress(taskArgs.contract);
        const contract = new web3.eth.Contract(abi, contractAddress);

        const donations = await contract.methods.donations().call();

        console.log(`all donators: ${donations}`);
    });

module.exports = {};