import '@nomicfoundation/hardhat-toolbox';
import { config } from 'dotenv';
import { HardhatUserConfig, task } from 'hardhat/config';

config({ path: __dirname + '/.env.local' });

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

task('deploy', 'Deploy the smart contracts', async (taskArgs, hre) => {
  const Nft3d = await hre.ethers.getContractFactory('Nft3d');
  const nft3d = await Nft3d.deploy('Nft3d Contract', '3d');
  await nft3d.deployed();
  await hre.run('verify:verify', {
    address: nft3d.address,
    constructorArguments: ['Nft3d Contract', '3d'],
  });
});

const options: HardhatUserConfig = {
  solidity: '0.8.17',
  networks: {
    mumbai: {
      url: 'https://matic-testnet-archive-rpc.bwarelabs.com',
      accounts: [`0x${process.env.PRIVATE_KEY as string}`],
    },
    localhost: {
      url: 'https://127.0.0.1:8545',
      accounts: [
        '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
      ],
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
};

export default options;
