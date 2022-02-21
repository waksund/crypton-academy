const hre = require("hardhat");

async function main(){
    const factory = await hre.ethers.getContractFactory("Donations");
    const contract = await factory.deploy();
    console.log(`contract address: ${contract.address}`);
}

main()
.then(() => process.exit(0))
.then().catch(error => {
    console.error(error);
    process.exit(1);
});