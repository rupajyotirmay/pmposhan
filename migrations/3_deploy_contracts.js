const userRegister = artifacts.require("userRegister");

module.exports = function (deployer) {
  deployer.deploy(userRegister);
};
