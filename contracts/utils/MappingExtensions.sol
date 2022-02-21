pragma solidity ^0.8.0;

library MappingExtensions{
    struct AddressAmountMapping{
        address[] keys;
        mapping(address => AddressAmountMappingValue) values;
    }

    struct AddressAmountMappingValue{
        uint256 value;
        bool inserted;
    }

    function get(AddressAmountMapping storage map, address key) internal view returns (uint256){
        return map.values[key].value;
    }

    function set(AddressAmountMapping storage map, address key, uint256 value) internal {
        AddressAmountMappingValue memory currentValue = map.values[key];
        if (!currentValue.inserted){
            map.keys.push(key);
            map.values[key].inserted = true;
        }
        map.values[key].value = value;
    }
}