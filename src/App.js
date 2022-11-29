import { useState } from "react";
import "./App.css";
import MainMint from "./components/MainMint";
import NavBar from "./components/NavBar";

/* RainbowKit imports */
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { getAccount } from "@wagmi/core";
/* Rainbowkit imports */

/* RainbowKit variables */
const { chains, provider } = configureChains(
  [chain.goerli],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
/* RainbowKit variables */

/* IS ACCOUNT CONNECTED? */
const { isConnected } = getAccount();

function App() {
  const [accounts, setAccounts] = useState([]);
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className="overlay">
          <div className="App">
            <NavBar
              accounts={accounts}
              setAccounts={setAccounts}
              isConnected={isConnected}
            />
            <MainMint
              accounts={accounts}
              setAccounts={setAccounts}
              isConnected={isConnected}
            />
          </div>
          <div className="moving-background"></div>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
