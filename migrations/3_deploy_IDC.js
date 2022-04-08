const Migrations = artifacts.require("IDC");

module.exports = function (deployer,networks,accounts) {
  deployer.deploy(Migrations);  
};
