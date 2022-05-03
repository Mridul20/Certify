const cert = artifacts.require("cert");

module.exports = function (deployer) {
  deployer.deploy(cert);
};
