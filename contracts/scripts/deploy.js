const {ethers} = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const CommemeFactory = await ethers.getContractFactory("CommemeFactory");
    const commemeFactory = await CommemeFactory.deploy();

    await commemeFactory.deployed();

    console.log("CommemeFactory deployed to:", commemeFactory.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
