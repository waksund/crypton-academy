require("@nomiclabs/hardhat-web3");
var Tx = require('ethereumjs-tx').Transaction;
const {task} = require("hardhat/config");
const abi = require("../build/Donations.abi.json");

task("donations/donate", "Prints all donators")
    .addParam("contract", "contract address")
    .addParam("donator", "donator's address")
    .addParam("donatorprivate", "donator's private key")
    .addParam("donate", "donate amount wei")
    .setAction(async (taskArgs) => {
        const web3 = new Web3(process.env.INFURA_URL);
        const contractAddress = web3.utils.toChecksumAddress(taskArgs.contract);
        const donatorAddress = web3.utils.toChecksumAddress(taskArgs.donator);
        const donatorPrivateKey = taskArgs.donatorprivate.toString();
        const donateAmount = taskArgs.donate.toString();
        const contract = new web3.eth.Contract(abi, contractAddress);

        const nonce = web3.eth.getTransactionCount(donatorAddress);
        const txParams = {
                from: donatorAddress,
                to: contractAddress,
                value: web3.utils.toHex(donateAmount),
                data: contract.methods.donate().encodeABI(),
                gasLimit: web3.utils.toHex(210000),
                gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
                nonce: web3.utils.toHex(nonce)
        };

        const tx = new Tx(txParams, { chain: 'ropsten' });
        tx.sign(Buffer.from(donatorPrivateKey, 'hex'));

        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');

        const transaction = await web3.eth.sendSignedTransaction(raw, (err, tx) => {
                console.log(tx);
        });
        
        
    });

module.exports = {};