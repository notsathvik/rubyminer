import './App.css';
import { useState, useEffect } from "react";
import Web3 from "web3";

function App() {

  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState("0");

  const [isConnectBtn, setIsConnectBtn] = useState(false);

  // Initialize Web3


  const handleWalletConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      if(!isWalletConnected) {
        window.web3 = new Web3(window.ethereum);

        const web3 = window.web3;

        window.ethereum.request({ method: 'eth_requestAccounts' }).then((res) => {
          setAddress(res[0]);
          setIsWalletConnected(true);

          loadAppData(res[0]);
        })

      } else {
        setIsWalletConnected(false)
        setAddress("");

        setWalletBalance("0")
      }
      
    } else {

    }
  }

  const loadAppData = (dataAddress) => {
    const web3 = window.web3;

    web3.eth.getBalance(dataAddress).then((response) => {
      const bal = parseFloat(web3.utils.fromWei(response)).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
      setWalletBalance(bal);
    });
  }

  return (
    <div className="app">
      <div className="app__nav">
        <img />
        <h2 style={{ color: "white"}}>{address}</h2>
      </div>

      <div className="app__main">
        <button disabled={isConnectBtn} onClick={handleWalletConnection} className={isConnectBtn ? "app__walletconnectdisabled" : "app__walletconnect"}>{isWalletConnected ? "DISCONNECT" : "CONNECT"}</button>

        <h6 className="app__heading">Some type of intro message</h6>

        <div className="app__interact">
          <div className="app__interactmargin">
            <div className="app__interactstats">
              <div className="app__interactstatsdata">
                <p>Contract</p>
                <h5>0 AVAX</h5>
              </div>

              <div className="app__interactstatsdata">
                <p>Wallet</p>
                <h5>{walletBalance} AVAX</h5>
              </div>

              <div className="app__interactstatsdata">
                <p>Your Ruby</p>
                <h5>0 RUBY</h5>
              </div>
            </div>

            <div className="app__inputcontainer">
              <input placeholder="10" className="app__inputavax" type="number" />
              <div className="app__inputavaxsymbol"><p>AVAX</p></div>
            </div>

            <button disabled={!isWalletConnected} className={isWalletConnected ? "app__minebtn" : "app__minebtndisabled"}>MINE RUBY</button>

            <div className="app__divider"></div>

            <div className="app__interactstatsreward">
              <p>Your Rewards</p>
              <h5>0 AVAX</h5>
            </div>

            <div className="app__rewards">
              <button disabled={!isWalletConnected} className={isWalletConnected ? "app__rewardsbtn" : "app__rewardsbtndisabled"}>RE-MINE</button>
              <button disabled={!isWalletConnected} className={isWalletConnected ? "app__rewardsbtn" : "app__rewardsbtndisabled"}>COLLECT</button>
            </div>
          </div>
        </div>


        <div className="app__statistics">
          <div className="app__statisticsmargin">
            <h5 className="app__statisticshead">Statistics</h5>

            <div className="app__statisticsdivider"></div>

            <div className="app__statisticsinfo">
              <p>Daily Return</p>
              <p>8%</p>
            </div>

            <div className="app__statisticsinfo">
              <p>APR</p>
              <p>2,920%</p>
            </div>

            <div className="app__statisticsinfo">
              <p>Deposit Fee</p>
              <p>8%</p>
            </div>
          </div>
        </div>


        <div className="app__referral">
          <h5>Referral Link</h5>

          <input className="app__referralinput" type="text" readOnly value="https://localhost:3000?ref=" />

          <p>Earn 10% of the AVAX used to mine ruby<br/> from anyone who uses your referral link</p>
        </div>
      </div>
    </div>
  );
}

export default App;
