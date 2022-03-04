/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('@nomiclabs/hardhat-waffle');
require('solidity-coverage');
require('dotenv').config();

require("./tasks/Donations.totalDonations.task");
require("./tasks/Donations.donationOf.task");
require("./tasks/Donations.donations.task");
require("./tasks/Donations.donate.task");

const INFURA_URL = process.env.INFURA_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

module.exports = {
  solidity: "0.8.9",
  networks:{
    rinkeby:{
      url: INFURA_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};
