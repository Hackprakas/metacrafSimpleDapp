require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    Mumbai: { // name your network
      url: 'enter your rpc url here',
      accounts: ['enter your account private key here']
    }
  }
};