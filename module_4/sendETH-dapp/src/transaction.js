import { ethers } from "ethers";
import { getAmtTransferable, provider, walletBalance } from "./main";

const inputBalanceEl = document.getElementById("accountBal");
const formAmt =  document.getElementById("formAmt");
const inputAmt =  document.getElementById("inputAmt");
const inputReceiver = document.getElementById("inputReceiver");
const transferBtn =  document.getElementById("transferBtn");
const errorEl =  document.getElementById("errorEl");


function transferAmtValidation(value){
    if (value > 0 && value < walletBalance) {
      errorEl.style.display = "none"
      errorEl.textContent = ""
      return true;
    }
  
    if(value < 0) {
      errorEl.style.display = "block";
      errorEl.textContent = "INVALID AMOUNT."
      return false;
    }
  
    if(value > 0) {
      errorEl.style.display = "block";
      errorEl.textContent = "VALUE TOO LARGE.";
      return false;
    }
  }
  
  transferBtn.addEventListener("click", () => {
    if (transferAmtValidation(Number(inputAmt.value))) {
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
        console.log(inputAmt.value, res, tx)
      })
  
    }
  })