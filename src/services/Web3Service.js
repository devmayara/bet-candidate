import Web3 from "web3";
import CONTRACT_ABI from "./ABI.json";

const CONTRACT_ADDRESS = "0x099cE1e579CB69c9a242A6FcBF53f56Ba9249529";

export async function doLogin() {
  if (!window.ethereum) throw new Error("MetaMesk não está instalada!");

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.requestAccounts();

  if (!accounts || !accounts.length)
    throw new Error("MetaMesk não foi autorizada!");

  localStorage.setItem("wallet", accounts[0]);
  return accounts[0];
}

export function getContract() {
  if (!window.ethereum) throw new Error("MetaMesk não está instalada!");

  const from = localStorage.getItem("wallet");
  const web3 = new Web3(window.ethereum);
  return new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS, { from });
}

export async function getDispute() {
  const contract = getContract();
  return contract.methods.dispute().call();
}

export async function placeBet(candidate, amountInEth) {
  const contract = getContract();
  return contract.methods.bet(candidate).send({
    value: Web3.utils.toWei(amountInEth, "ether"),
    gas: 138069,
    gasPrice: "34920000017",
  });
}

export async function finishDispute(winner) {
  const contract = getContract();
  return contract.methods.finish(winner).send({
    gasPrice: "34920000017"
  });
}

export async function claimPrize() {
  const contract = getContract();
  return contract.methods.claim().send();
}
