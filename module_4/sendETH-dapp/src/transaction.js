import { ethers, utils } from "ethers";
import { address, gasPrice, provider, signer, walletBalance } from "./main";

const inputAmt =  document.getElementById("inputAmt");
const inputReceiver = document.getElementById("inputReceiver");
const transferBtn =  document.getElementById("transferBtn");
const errorEl =  document.getElementById("errorEl");


function transferAmtValidation(){
  const amtValue = Number(inputAmt.value);
  const receiverAddr = inputReceiver.value;

    // amt value validation
    if (amtValue > 0 && amtValue < walletBalance) {
      errorEl.style.display = "none"
      errorEl.textContent = ""
      return true;
    }
  
    if(amtValue < 0) {
      errorEl.style.display = "block";
      errorEl.textContent = "INVALID AMOUNT."
      return false;
    }
  
    if(amtValue > 0) {
      errorEl.style.display = "block";
      errorEl.textContent = "VALUE TOO LARGE.";
      return false;
    }

    // address value validation
    if(!ethers.utils.isAddress(receiverAddr)) {
      errorEl.style.display = "block";
      errorEl.textContent = "INVALID ADDRESS.";
      return false;
    }else {
      errorEl.style.display = "none"
      errorEl.textContent = ""
      return true;
    }
  }

  export async function getAmtTransferable() {
    try {
      const feeData = await provider.getFeeData()
      return walletBalance - 21000*(feeData.maxFeePerGas.toNumber()/1e18)
    } catch (error) {
      console.error("unable to get amount transferable.")
    }
  
  }

  console.log(getAmtTransferable())

  async function sendEth(tx) {
    try {
      if (signer)
      {
        const res = await signer.sendTransaction(tx)
        console.log(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  transferBtn.addEventListener("click", async() => {
    if (transferAmtValidation()) {
      errorEl.style.display = "none"
      errorEl.textContent = ""
  
      getAmtTransferable().then((res) => {
        if (Number(inputAmt.value) >= res) {
          errorEl.style.display = "block";
          errorEl.textContent = "INSUFFICIENT GAS FEE.."
        }
  
        // initiate transfer
        let nonce = 0;
        provider.getTransactionCount(address, "latest").then((res) => nonce = res)
  
        const tx = {
          from: address,
          to: inputReceiver.value,
          value: ethers.utils.parseEther(inputAmt.value),
          nonce,
          gasLimit: ethers.utils.hexlify(10000),
          gasPrice: ethers.utils.hexlify(parseInt(gasPrice)),
      };

        sendEth(tx).then((res) = console.log(res)).catch((err) => {
          errorEl.style.display = "block";
          errorEl.textContent = "USER REJECTED TRANSACTION.";
        })
      })
  
    }
  })