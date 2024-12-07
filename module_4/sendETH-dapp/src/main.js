import './style.css'
import {ethers} from 'ethers'

export let signer = null
export let address = null
export let walletBalance = 0
export let provider;
export let gasPrice = 0;

if (window.ethereum == null) {
    console.log("MetaMask not installed; using read-only defaults")
}else {
    provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    signer = provider.getSigner();
}

const connectBtnEl = document.getElementById("connectBtn");
const showAcctEl = document.getElementById("showAccount");
const inputBalanceEl = document.getElementById("accountBal");
const formAmt =  document.getElementById("formAmt");


export function fmtAddr() {
  return `${address.slice(0,5)}...${address.substr(address.length - 5)}`
}

function handleCopyAddress() {
  window.navigator.clipboard
    .writeText(showAcctEl.innerText)
    .then(() => {
      showAcctEl.textContent = "copied"
      setTimeout(() => {
      showAcctEl.textContent = fmtAddr()
      }, 2000);
    })
    .catch((err) => {
      console.error('Failed to copy the link:', err);
    });
};

function updateWalletBalance() {
  signer.getBalance("latest")
    .then((res) => {
      walletBalance = res.toNumber()/1e18
      inputBalanceEl.value =  walletBalance
      inputAmt.max = walletBalance
      formAmt.style.display = "flex"
    }).catch((err) => console.error(err))
}

async function initializeOnConnect(accounts) {
  // set address
  address = accounts[0]
  console.log(signer)

  // show address in dom
  showAcctEl.textContent = fmtAddr()
  showAcctEl.style.display = "block"
  connectBtnEl.style.display = "none"

  // show form for transactions
  updateWalletBalance()
}

connectBtnEl.addEventListener("click", async() => {
  try {
    const accounts = await provider.send("eth_requestAccounts", []).then()
    await initializeOnConnect(accounts)
  }catch(error){
      console.error(error)
  }
})

showAcctEl.addEventListener("click", () => handleCopyAddress())