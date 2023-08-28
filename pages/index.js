import { useState, useEffect } from "react";
import { ethers } from "ethers";
import det_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [details, setdetails] = useState(undefined);
  // const [balance, setBalance] = useState(undefined);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(0);
  const [reage, setreage] = useState(0);
  const [rename, setrename] = useState('');
  const [status, setstatus] = useState(false);

  const contractAddress = "0xFf9c604aC33f033d056D90c4c1b3DaA1B924B82C";
  const detailsabi = det_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getdetailsContract();
  };

  const getdetailsContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const detailsContract = new ethers.Contract(contractAddress, detailsabi, signer);

    setdetails(detailsContract);
  }

  const getdetails = async () => {
    try {
      if (details) {
        const result = await details.get();
        const age = result[0].toString();
        const name = result[1];
        setreage(age);
        setrename(name);
        console.log(result);
      }
    }
    catch (error) {
      window.alert(error);
    }
  }

  const setdetailss = async () => {
    if (details) {
      let tx = await details.set(newAge, newName);
      await tx.wait();
      setstatus(true);


    }
  }


  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this Dapp.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    // if (balance == undefined) {
    //   getBalance();
    // }

    return (
      <div>
        <p>Your Account: {account}</p>
        {/* <p>Your Balance: {balance}</p> */}
        <div>
          <label>New Age: </label>
          <input
            type="number"
            value={newAge}
            onChange={(e) => setNewAge(e.target.value)}
          />
        </div>
        <div>
          <label>New Name: </label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>

        {/* Button to call the setDetails function */}
        <button onClick={() => setdetailss()}>Set Details</button>
        {status && (<button onClick={() => getdetails()}>get Details</button>)}

        {reage !== 0 && (
          <div>
            <p>Retrieved Age: {reage}</p>
            <p>Retrieved Name: {rename}</p>
          </div>
        )}
     

      </div>
    )
  }

  useEffect(() => { getWallet(); }, []);

  return (
    <main className="container">
      <header><h1>Welcome to the Person details!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
      `}
      </style>
    </main>
  )
}
