import detectEthereumProvider from "@metamask/detect-provider"

async function setup() {
  const provider = await detectEthereumProvider()

  if (provider && provider === window.ethereum) {
    console.log("MetaMask is available!")
    await ensureCorrectNetwork()
    startApp(provider)
  } else {
    console.log("Please install MetaMask!")
  }
}

async function ensureCorrectNetwork() {
  const targetChainId = "0xaa36a7";
  
  try {
    const currentChainId = await window.ethereum.request({ method: "eth_chainId" });

    if (currentChainId !== targetChainId) {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: targetChainId }],
      });
      console.log("Successfully switched to Sepolia Testnet!");
    } else {
      console.log("Already on Sepolia Testnet!");
    }
  } catch (error) {
    if (error.code === 4902) {
      console.error("Sepolia Testnet is not available in MetaMask. Please add it manually.");
    } else {
      console.error("Failed to switch network:", error.message);
    }
  }
}

function startApp(provider) {
  if (provider !== window.ethereum) {
    console.error("Do you have multiple wallets installed?")
  }
}

window.addEventListener("load", setup)

/**********************************************************/
/* Handle chain (network) and chainChanged (per EIP-1193) */
/**********************************************************/

const chainId = await window.ethereum.request({ method: "eth_chainId" })

window.ethereum.on("chainChanged", handleChainChanged)

function handleChainChanged(chainId) {
  window.location.reload()
}