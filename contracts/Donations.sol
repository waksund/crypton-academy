pragma solidity ^0.8.0;

import "./access/Ownable.sol";
import "./utils/Address.sol";
import "./utils/MappingExtensions.sol";

contract Donations is Ownable {

    MappingExtensions.AddressAmountMapping private _donations;
    uint256 private _totalDonations;
    
    function totalDonations() public view returns (uint256) {
        return _totalDonations;
    }
    
    function donationOf(address account) public view returns (uint256) {
        return MappingExtensions.get(_donations, account);
    }

    function donations() public view returns (address[] memory){
        return _donations.keys;
    }
    
    function donate() public payable {
        address account = _msgSender();
        uint256 amount = msg.value;
        _donate(account, amount);
    }
    
    function withdraw(address to, uint256 amount) public onlyOwner{
        require(to != address(0), "withdraw to the zero address");
        require(amount <= _totalDonations, "insufficient funds");
        _totalDonations -= amount;
        Address.sendValue(payable(to), amount);
    }
    
    function _donate(address account, uint256 amount) private {
        require(amount > 0, "zero donate");
        uint256 currentDonate = MappingExtensions.get(_donations, account);
        if (currentDonate != type(uint256).max)
            MappingExtensions.set(_donations, account, currentDonate + amount);
        if (_totalDonations != type(uint256).max)    
            _totalDonations += amount;
    }
    
}