const Migrations = artifacts.require("MultiSigWallet");

module.exports = function (deployer,networks,accounts) {
  let address = [accounts[1],accounts[2]]
  console.log(address)
  deployer.deploy(Migrations,address);
  
};
