const {BigNumber} = require("ethers");

module.exports = {
    ZERO_ADDRESS: '0x0000000000000000000000000000000000000000',
    ZERO_BYTES32: '0x0000000000000000000000000000000000000000000000000000000000000000',
    MAX_UINT256: BigNumber.from('2').pow(BigNumber.from('256')).sub(BigNumber.from('1')),
    MAX_INT256: BigNumber.from('2').pow(BigNumber.from('255')).sub(BigNumber.from('1')),
    MIN_INT256: BigNumber.from('2').pow(BigNumber.from('255')).mul(BigNumber.from('-1')),
};