const { expect } = require('chai');

describe("Donations contract", () => {
   let donationsFactory, donationsContract, owner, addr1, addr2;
   
   beforeEach(async () => {
       donationsFactory = await ethers.getContractFactory('Donations');
       donationsContract = await donationsFactory.deploy();
       [owner, addr1, addr2] = await ethers.getSigners();
   });
   
   describe ("Deployment", () => {
       it('Should set the right owner', async () => {
           expect(await donationsContract.owner()).to.equal(owner.address);
       });
   });
   
});