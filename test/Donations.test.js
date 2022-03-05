const { expect } = require('chai');
const constants = require("./helpers/constants");

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
       
       it('Should set zero total donations', async () => {
           expect(await donationsContract.totalDonations()).to.equal(0);
       });
       
       it('Should set empty donations', async () => {
           let donations = await donationsContract.donations();
           expect(donations.length).to.equal(0);
       });
   });
   
   describe("DonationOf", () => {
       it('Should equal donate', async () =>{
          const donateAmount = 1;
          await donationsContract.connect(addr1).donate({value:donateAmount});
          expect(await donationsContract.donationOf(addr1.address)).to.equal(donateAmount);
       });

       it('Should equal double donate', async () =>{
           const donateAmount1 = 1;
           const donateAmount2 = 2;
           await donationsContract.connect(addr1).donate({value:donateAmount1});
           await donationsContract.connect(addr1).donate({value:donateAmount2});
           expect(await donationsContract.donationOf(addr1.address)).to.equal(donateAmount1 + donateAmount2);
       });
       
       it('Should not change if donate other account', async () => {
           const donateAmount1 = 1;
           const donateAmount2 = 2;
           await donationsContract.connect(addr1).donate({value:donateAmount1});
           await donationsContract.connect(addr2).donate({value:donateAmount2});
           expect(await donationsContract.donationOf(addr1.address)).to.equal(donateAmount1);
           expect(await donationsContract.donationOf(addr2.address)).to.equal(donateAmount2);
       });
   });

    describe("Donations", () => {
        it('Should includes account after donate', async () =>{
            const donateAmount = 1;
            await donationsContract.connect(addr1).donate({value:donateAmount});
            let donations = await donationsContract.donations();
            expect(donations.includes(addr1.address)).to.equal(true);
        });

        it('Should includes account only one time after double donate', async () =>{
            const donateAmount = 1;
            await donationsContract.connect(addr1).donate({value:donateAmount});
            await donationsContract.connect(addr1).donate({value:donateAmount});
            let donations = await donationsContract.donations();
            expect(donations.length).to.equal(1);
        });
    });

    describe("TotalDonations", () => {
        it('Should equal account donate', async () =>{
            const donateAmount = 1;
            await donationsContract.connect(addr1).donate({value:donateAmount});
            let totalDonations = await donationsContract.totalDonations();
            expect(totalDonations).to.equal(donateAmount);
        });

        it('Should equal sum of accounts donate', async () =>{
            const donateAmount = 1;
            await donationsContract.connect(addr1).donate({value:donateAmount});
            await donationsContract.connect(addr2).donate({value:donateAmount});
            let totalDonations = await donationsContract.totalDonations();
            expect(totalDonations).to.equal(donateAmount + donateAmount);
        });
    });

    describe("Donate", () => {
        it('Should not be possible donate zero value', async () =>{
            const donateAmount = 0;
            await expect(donationsContract.connect(addr1).donate({value:donateAmount}))
                .to.be.revertedWith('zero donate');
        });
    });
    
    describe("Withdraw", () => {
        it('Should be possible only owner', async () =>{
            const withdrawAmount = 1;
            await expect(donationsContract.connect(addr1).withdraw(addr2.address, withdrawAmount))
                .to.be.revertedWith('Ownable: caller is not the owner');
        });

        it('Should not be possible more then total donations', async () =>{
            const donateAmount = 2;
            await donationsContract.connect(addr1).donate({value:donateAmount});
            let totalDonations = await donationsContract.totalDonations();
            
            await expect(donationsContract.connect(owner).withdraw(addr2.address, totalDonations + 1))
                .to.be.revertedWith('insufficient funds');
        });
        
        it('Should not be possible withdraw to zero address', async () =>{
            const withdrawAmount = 1;
            await expect(donationsContract.connect(owner).withdraw(constants.ZERO_ADDRESS, withdrawAmount))
                .to.be.revertedWith('withdraw to the zero address');
        });

        it('Should reduce totalDonations by a withdraw value', async () =>{
            const donateAmount = 2;
            const withdrawAmount = 1;
            await donationsContract.connect(addr1).donate({value:donateAmount});
            await donationsContract.connect(owner).withdraw(addr2.address, withdrawAmount);
            let totalDonations = await donationsContract.totalDonations();
            expect(totalDonations).to.equal(donateAmount - withdrawAmount);
        });
    });
   
    
});