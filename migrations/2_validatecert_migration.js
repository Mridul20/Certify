const validatecertart = artifacts.require("validatecert");

module.exports = function (deployer) {
  deployer.deploy(validatecertart);
};
