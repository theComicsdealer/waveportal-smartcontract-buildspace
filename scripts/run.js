const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy(
      {
        value: hre.ethers.utils.parseEther('0.1')
      }
    );
    await waveContract.deployed();

    /*
    * Get Contract balance
    */
    let contractBalance = await hre.ethers.provider.getBalance(
      waveContract.address
    );

    console.log(
      'Contract balance:',
      hre.ethers.utils.formatEther(contractBalance)
    );
  
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);
  
    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    
    let waveTxn;

    waveTxn = await waveContract.connect(randomPerson).wave("Hello world!");
    await waveTxn.wait();

    let waveTxn2 = await waveContract.wave('This is wave #2');
    await waveTxn2.wait();

    /*
    * Get Contract balance to see what happened!
    */
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
      'Contract balance:',
      hre.ethers.utils.formatEther(contractBalance)
    );

    waveCount = await waveContract.getTotalWaves();

    let waves = await waveContract.getWavesList();
    console.log("All waves: %", waves)
};
  
const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
};
  
runMain();