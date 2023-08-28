// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Assessment {
    uint256 public age;
    string public name;
    event datadd(uint256 age,string  name);

    function set(uint256 _value,string memory _name) public {
        age = _value;
        name = _name;
        emit datadd(_value,_name);
    }

    function get() public view returns (uint256,string memory) {
        return (age,name);
    }
}
