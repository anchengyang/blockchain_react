import './App.css';
import Web3 from 'web3';
import { useEffect, useState } from 'react';



function App() {
  const [account, setAccount] = useState();
  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const network = await web3.eth.net.getNetworkType()
      const accounts = await web3.eth.requestAccounts()
      setAccount(accounts[0])
      console.log(network)
      console.log(accounts)
    }
    load();
  }, []);
  
  
  return (
    <div className="container">
      <h1>Hello, World</h1>
      <p>Your account: {account}</p>
    </div>
  );
}

export default App;
