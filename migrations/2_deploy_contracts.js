const StudentRegister = artifacts.require("StudentRegister");

module.exports = function (deployer) {
  deployer.deploy(StudentRegister);
};
