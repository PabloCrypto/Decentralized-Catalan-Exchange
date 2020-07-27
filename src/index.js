//import _ from 'lodash';
import Web3 from '../node_modules/web3';
import NewCatalanExchange from "../build/contracts/catalanExchange.json";
import BigNumber from '../node_modules/bignumber.js';
import TokenABI from "../build/contracts/IERC20.json";
import ExchangePrice from "C:/Users/User/Desktop/Project/catalanExchange/ExchangePrice/build/contracts/catalanExchange.json";


let web3;
let CatalanExchange;
let CatalanExchangePrice;
let accounts = [];


var ofTrade;
const amount = new BigNumber(1e+17);
const unity = new BigNumber(1e+18);
const unity2 = new BigNumber(1e+8);
let help = new BigNumber(1e+10);//0.000100000000000000
let deploymentKey;
var loop;

let balanceBox = document.getElementById("algo");
let testButton = document.getElementById("test");
let userAddress = document.getElementById("userAddress");
let inici = document.getElementById("inici");

let botoCanvi = document.getElementById("botoCanvi");

let btnGroupDrop1 = document.getElementById("btnGroupDrop1");
let btnGroupDrop2 = document.getElementById("btnGroupDrop2");

let input1 = document.getElementById("input1");
let input2 = document.getElementById("input2");

let inputEth = document.getElementById("inputEth");
let inputDai = document.getElementById("inputDai");
let inputKnk = document.getElementById("inputKnk");
let inputMana = document.getElementById("inputMana");

let outputEth = document.getElementById("outputEth");
let outputDai = document.getElementById("outputDai");
let outputKnk = document.getElementById("outputKnk");
let outputMana = document.getElementById("outputMana");


let spanMateixaMoneda = document.getElementById("spanMateixaMoneda");
let bgEthOut = document.getElementById("bgEthOut");
let bgDaiOut = document.getElementById("bgDaiOut");
let bgKncOut = document.getElementById("bgKncOut");
let bgManaOut = document.getElementById("bgManaOut");

let bgEthIn = document.getElementById("bgEthIn");
let bgDaiIn = document.getElementById("bgDaiIn");
let bgKncIn = document.getElementById("bgKncIn");
let bgManaIn = document.getElementById("bgManaIn");

let doButton = document.getElementById("doButton");
let approveButton = document.getElementById("approveButton");
let transfeDone = document.getElementById("transfeDone");
let alertApprove = document.getElementById("alertApprove");
let DaiContract;
let KncContract;
let ManaContract;


//Kovan de moment
const daiAddress = "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa";
const kncAddress = "0xad67cB4d63C9da94AcA37fDF2761AaDF780ff4a2";
const manaAddress = "0xcb78b457c1F79a06091EAe744aA81dc75Ecb1183";

    
const initWeb3 = async() => {

  return  new Promise((resolve, reject) => {
    
    //caso 1: new metamask is present
    if(typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable()
        .then(() => {
          resolve(new Web3(window.ethereum));
        })
        .catch(e => {
          reject(e);
        });
      return;
    }

    //caso 2: old metamask is present
    if(typeof window.web3 !== 'undefined'){
      return  resolve(new Web3(window.web3.currentProvider));
    }


  });

};
const initContract = () => {
  deploymentKey = Object.keys(
    NewCatalanExchange.networks 
    )[1];
  DaiContract = new web3.eth.Contract(
    TokenABI.abi,
    daiAddress
  );
  KncContract = new web3.eth.Contract(
    TokenABI.abi,
    kncAddress
  );
  ManaContract = new web3.eth.Contract(
    TokenABI.abi,
    manaAddress
  );

  CatalanExchangePrice = new web3.eth.Contract(
    ExchangePrice.abi,
    ExchangePrice
      .networks[42]
      .address
    );
  testButton.innerHTML = "seep";
  return  new web3.eth.Contract(
    NewCatalanExchange.abi,
    NewCatalanExchange
      .networks[42]
      .address
  );

};



const initApp = async() => {

  web3.eth.getAccounts()
  .then(_accounts => {
    accounts = _accounts;
    userAddress.innerHTML = accounts[0];
    inici.hidden = false;
    refresh();
    loop = setInterval(refresh, 500);
    doButton.hidden = false;
  });


};






const refresh = () => {
    bgEthOut.hidden = true;
    bgDaiOut.hidden = true;
    bgKncOut.hidden = true;
    bgManaOut.hidden = true;

    bgEthIn.hidden = true;
    bgDaiIn.hidden = true;
    bgKncIn.hidden = true;
    bgManaIn.hidden = true;

    let tokenIn = new BigNumber(input1.value).multipliedBy(unity);
  
    if(btnGroupDrop1.innerHTML == "ETH"){
      bgEthIn.hidden = false;
      doButton.hidden = false;
      approveButton.hidden = true;
      if(btnGroupDrop2.innerHTML == "DAI"){
        bgDaiOut.hidden=false;
        CatalanExchangePrice.methods.priceDaiToEth2(tokenIn).call({from: accounts[0]})
        .then(x => {
          let r = new BigNumber(x[1]).dividedBy(unity);
          input2.value = r.toFormat(6);
      });
      }
      if(btnGroupDrop2.innerHTML == "KNC"){
        bgKncOut.hidden = false;
        CatalanExchangePrice.methods.priceKncToEth2(tokenIn).call({from: accounts[0]})
        .then(x => {
          let r = new BigNumber(x[1]).dividedBy(unity);
          input2.value = r.toFormat(6);
      });
      }
      if(btnGroupDrop2.innerHTML == "MANA"){
        bgManaOut.hidden = false;
        CatalanExchangePrice.methods.priceManaToEth2(tokenIn).call({from: accounts[0]})
        .then(x => {
          let r = new BigNumber(x[1]).dividedBy(unity);
          input2.value = r.toFormat(6);
      });
      }
    }
    if(btnGroupDrop1.innerHTML == "DAI"){
      bgDaiIn.hidden = false;
      approveButton.hidden = false;
      doButton.hidden = true;
      if(btnGroupDrop2.innerHTML == "ETH"){
        bgEthOut.hidden = false;
        CatalanExchangePrice.methods.priceDaiToEth2(tokenIn).call({from: accounts[0]})
        .then(x => {
          let r = new BigNumber(x[0]).dividedBy(unity);
          input2.value = r.toFormat(6);
      });
      }
      if(btnGroupDrop2.innerHTML == "KNC"){
        bgKncOut.hidden = false;
        CatalanExchangePrice.methods.priceDaiToKnc2(tokenIn).call({from: accounts[0]})
        .then(x => {
          let r = new BigNumber(x[0]).dividedBy(unity);
          input2.value = r.toFormat(6);
      });
      }
      if(btnGroupDrop2.innerHTML == "MANA"){
        bgManaOut.hidden = false;
        CatalanExchangePrice.methods.priceManaToDai2(tokenIn).call({from: accounts[0]})
        .then(x => {
          let r = new BigNumber(x[1]).dividedBy(unity);
          input2.value = r.toFormat(6);
      });
      }
    }
    if(btnGroupDrop1.innerHTML == "KNC"){
      bgKncIn.hidden = false;
      approveButton.hidden = false;
      doButton.hidden = true;
      if(btnGroupDrop2.innerHTML == "ETH"){
        bgEthOut.hidden = false;
        CatalanExchangePrice.methods.priceKncToEth2(tokenIn).call({from: accounts[0]})
        .then(x => {
          let r = new BigNumber(x[0]).dividedBy(unity);
          input2.value = r.toFormat(6);
      });
      }
      if(btnGroupDrop2.innerHTML == "DAI"){
        bgDaiOut.hidden = false;
        CatalanExchangePrice.methods.priceDaiToKnc2(tokenIn).call({from: accounts[0]})
        .then(x => {
          let r = new BigNumber(x[1]).dividedBy(unity);
          input2.value = r.toFormat(6);
      });
      }
      if(btnGroupDrop2.innerHTML == "MANA"){
        bgManaOut.hidden = false;
        CatalanExchangePrice.methods.priceManaToKnc2(tokenIn).call({from: accounts[0]})
        .then(x => {
          let r = new BigNumber(x[1]).dividedBy(unity);
          input2.value = r.toFormat(6);
      });
      }
    }
    if(btnGroupDrop1.innerHTML == "MANA"){
      bgManaIn.hidden = false;
      approveButton.hidden = false;
      doButton.hidden = true;
      if(btnGroupDrop2.innerHTML == "ETH"){
        bgEthOut.hidden = false;
        CatalanExchangePrice.methods.priceManaToEth2(tokenIn).call({from: accounts[0]})
        .then(x => {
          let r = new BigNumber(x[0]).dividedBy(unity);
          input2.value = r.toFormat(6);
      });
      }
      if(btnGroupDrop2.innerHTML == "DAI"){
        bgDaiOut.hidden = false;
        CatalanExchangePrice.methods.priceManaToDai2(tokenIn).call({from: accounts[0]})
        .then(x => {
          let r = new BigNumber(x[0]).dividedBy(unity);
          input2.value = r.toFormat(6);
      });
      }
      if(btnGroupDrop2.innerHTML == "KNC"){
        bgKncOut.hidden = false;
        CatalanExchangePrice.methods.priceManaToKnc2(tokenIn).call({from: accounts[0]})
        .then(x => {
          let r = new BigNumber(x[0]).dividedBy(unity);
          input2.value = r.toFormat(6);
      });
      }
    }
  }











async function sendSign(transaction, value = 0){
  const options = {
        to      : NewCatalanExchange.networks[deploymentKey].address,
        data    : transaction.encodeABI(),
        gas     : 8000000, //await transaction.estimateGas({from: accounts[0]}), 1705600, 1574212
        gasPrice: 2000000000, //await web3.eth.getGasPrice(), 3500000000
        value   : value
  };
  console.log("GasUsed: " + options.gas);
  console.log("GasPrice: " + options.gasPrice);
  web3.eth.accounts.signTransaction(options, process.env.PRIVATE_KEY)
  .then(p => {
    const signed = p;
    web3.eth.sendSignedTransaction(signed.rawTransaction)
    .then(m => {
      console.log(m);
        alert("EEEEPA");
        ofTrade = setInterval(function(){isProfit()}, 1000);
        refresh();
    });
  });


};




window.addEventListener('DOMContentLoaded', () => {
    initWeb3()
    .then(_web3 => {
      web3 = _web3;
      //console.log(web3);
      CatalanExchange = initContract();
      //console.log(tradeFactory);
      initApp();
        testButton.innerHTML = "seep2";

  })
    .catch( e => console.log(e.message));

});
testButton.addEventListener('click', () =>{

  CatalanExchange.methods.buyEthToMana2(amount).send({from: accounts[0], value: amount})
  .then(x => {
    console.log(x);
  })
  /*
  DaiContract.methods.transferFrom(accounts[0], "0x29679Aa3B9D83F6210faF7f79D9aa7E0589cA514", amount).send({from: accounts[0]})
      .then(p => {
        console.log(p);
      });
*/
});
botoCanvi.addEventListener('click', () => {
  transfeDone.hidden = true;
  let a = btnGroupDrop1.innerHTML;
  btnGroupDrop1.innerHTML = btnGroupDrop2.innerHTML;
  btnGroupDrop2.innerHTML = a;
  refresh();
});


inputEth.addEventListener('click', function(){
  transfeDone.hidden = true;
  btnGroupDrop1.innerHTML = "ETH";
  doButton.hidden = false;
  approveButton.hidden = true;
  if (btnGroupDrop1.innerHTML == btnGroupDrop2.innerHTML){
    spanMateixaMoneda.hidden = false;
  }else{
    spanMateixaMoneda.hidden = true;
  }
});

inputDai.addEventListener('click', function(){
  transfeDone.hidden = true;
  btnGroupDrop1.innerHTML = "DAI";
  approveButton.hidden = false;
  doButton.hidden = true;
  if (btnGroupDrop1.innerHTML == btnGroupDrop2.innerHTML){
    spanMateixaMoneda.hidden = false;
  }else{
    spanMateixaMoneda.hidden = true;
  }
});

inputKnk.addEventListener('click', function(){
  transfeDone.hidden = true;
  btnGroupDrop1.innerHTML = "KNC";
  approveButton.hidden = false;
  doButton.hidden = true;
  if (btnGroupDrop1.innerHTML == btnGroupDrop2.innerHTML){
    spanMateixaMoneda.hidden = false;
  }else{
    spanMateixaMoneda.hidden = true;
  }
});

inputMana.addEventListener('click', function(){
  transfeDone.hidden = true;
  btnGroupDrop1.innerHTML = "MANA";
  approveButton.hidden = false;
  doButton.hidden = true;
  if (btnGroupDrop1.innerHTML == btnGroupDrop2.innerHTML){
    spanMateixaMoneda.hidden = false;
  }else{
    spanMateixaMoneda.hidden = true;
  }
});



outputEth.addEventListener('click', function(){
  transfeDone.hidden = true;
  btnGroupDrop2.innerHTML = "ETH";
  if (btnGroupDrop1.innerHTML == btnGroupDrop2.innerHTML){
    spanMateixaMoneda.hidden = false;
  }else{
    spanMateixaMoneda.hidden = true;
  }
});

outputDai.addEventListener('click', function(){
  transfeDone.hidden = true;
  btnGroupDrop2.innerHTML = "DAI";
  if (btnGroupDrop1.innerHTML == btnGroupDrop2.innerHTML){
    spanMateixaMoneda.hidden = false;
  }else{
    spanMateixaMoneda.hidden = true;
  }
});

outputKnk.addEventListener('click', function(){
  transfeDone.hidden = true;
  btnGroupDrop2.innerHTML = "KNC";
  if (btnGroupDrop1.innerHTML == btnGroupDrop2.innerHTML){
    spanMateixaMoneda.hidden = false;
  }else{
    spanMateixaMoneda.hidden = true;
  }
});

outputMana.addEventListener('click', function(){
  transfeDone.hidden = true;
  btnGroupDrop2.innerHTML = "MANA";
  if (btnGroupDrop1.innerHTML == btnGroupDrop2.innerHTML){
    spanMateixaMoneda.hidden = false;
  }else{
    spanMateixaMoneda.hidden = true;
  }
});

approveButton.addEventListener('click', function(){
  transfeDone.hidden = true;
  alertApprove.hidden = false;
  let tokenIn = new BigNumber(input1.value).multipliedBy(unity);
  if(btnGroupDrop1.innerHTML == "DAI"){
    DaiContract.methods.approve(NewCatalanExchange.networks[42].address, tokenIn).send({from: accounts[0]})
    .then(x => {
      clearInterval(loop);
      doButton.hidden = false;
      approveButton.hidden = true;
      alertApprove.hidden = true;

    });
  }
  if(btnGroupDrop1.innerHTML == "KNC"){
    KncContract.methods.approve(NewCatalanExchange.networks[42].address, tokenIn).send({from: accounts[0]})
    .then(x => {
      clearInterval(loop);
      doButton.hidden = false;
      approveButton.hidden = true;
      alertApprove.hidden = true;
    });
  }
  if(btnGroupDrop1.innerHTML == "MANA"){
    ManaContract.methods.approve(NewCatalanExchange.networks[42].address, tokenIn).send({from: accounts[0]})
    .then(x => {
      clearInterval(loop);
      doButton.hidden = false;
      approveButton.hidden = true;
      alertApprove.hidden = true;
    });
  }



});



doButton.addEventListener('click', function(){
  transfeDone.hidden = true;
  if (btnGroupDrop2.innerHTML == btnGroupDrop1.innerHTML){
    alert("You should choose a token and a correct amount before to swap, thanks.");
  }else{

    let tokenIn = new BigNumber(input1.value).multipliedBy(unity);

    if(btnGroupDrop1.innerHTML == "ETH"){
      if(btnGroupDrop2.innerHTML == "DAI"){
        CatalanExchange.methods.buyEthToDai2(tokenIn).send({from: accounts[0], value: tokenIn})
        .then(x => {
          transfeDone.hidden = false;
        });
      }
      if(btnGroupDrop2.innerHTML == "KNC"){
        CatalanExchange.methods.buyEthToKnc2(tokenIn).send({from: accounts[0], value: tokenIn})
        .then(x => {
          transfeDone.hidden = false;
        });
      }
      if(btnGroupDrop2.innerHTML == "MANA"){
        CatalanExchange.methods.buyEthToMana2(tokenIn).send({from: accounts[0], value: tokenIn})
        .then(x => {
          transfeDone.hidden = false;
        });
      }
    }
    if(btnGroupDrop1.innerHTML == "DAI"){
      if(btnGroupDrop2.innerHTML == "ETH"){
        CatalanExchange.methods.transferRapid(tokenIn, 1).send({from: accounts[0]})
        .then(p => {
          approveButton.hidden = false;
          doButton.hidden = true;
          transfeDone.hidden = false;
          loop = setInterval(refresh, 500);
        });
      }
      if(btnGroupDrop2.innerHTML == "KNC"){
        CatalanExchange.methods.transferRapid(tokenIn, 4).send({from: accounts[0]})
        .then(p => {
          approveButton.hidden = false;
          doButton.hidden = true;
          transfeDone.hidden = false;
          loop = setInterval(refresh, 500);
        });
      }
      if(btnGroupDrop2.innerHTML == "MANA"){
        CatalanExchange.methods.transferRapid(tokenIn, 8).send({from: accounts[0]})
        .then(p => {
          approveButton.hidden = false;
          doButton.hidden = true;
          transfeDone.hidden = false;
          loop = setInterval(refresh, 500);
        });
      }
    }
    if(btnGroupDrop1.innerHTML == "KNC"){
      if(btnGroupDrop2.innerHTML == "ETH"){
        CatalanExchange.methods.transferRapid(tokenIn, 2).send({from: accounts[0]})
        .then(p => {
          approveButton.hidden = false;
          doButton.hidden = true;
          transfeDone.hidden = false;
          loop = setInterval(refresh, 500);
        });
      }
      if(btnGroupDrop2.innerHTML == "DAI"){
        CatalanExchange.methods.transferRapid(tokenIn, 5).send({from: accounts[0]})
        .then(p => {
          approveButton.hidden = false;
          doButton.hidden = true;
          transfeDone.hidden = false;
          loop = setInterval(refresh, 500);
        });
      }
      if(btnGroupDrop2.innerHTML == "MANA"){
        CatalanExchange.methods.transferRapid(tokenIn, 9).send({from: accounts[0]})
        .then(p => {
          approveButton.hidden = false;
          doButton.hidden = true;
          transfeDone.hidden = false;
          loop = setInterval(refresh, 500);
        });
      }
    }
    if(btnGroupDrop1.innerHTML == "MANA"){
      if(btnGroupDrop2.innerHTML == "ETH"){
        CatalanExchange.methods.transferRapid(tokenIn, 3).send({from: accounts[0]})
        .then(p => {
          approveButton.hidden = false;
          doButton.hidden = true;
          transfeDone.hidden = false;
          loop = setInterval(refresh, 500);
        });
      }
      if(btnGroupDrop2.innerHTML == "KNC"){
        CatalanExchange.methods.transferRapid(tokenIn, 6).send({from: accounts[0]})
        .then(p => {
          approveButton.hidden = false;
          doButton.hidden = true;
          transfeDone.hidden = false;
          loop = setInterval(refresh, 500);
        });
      }
      if(btnGroupDrop2.innerHTML == "DAI"){
        CatalanExchange.methods.transferRapid(tokenIn, 7).send({from: accounts[0]})
        .then(p => {
          approveButton.hidden = false;
          doButton.hidden = true;
          transfeDone.hidden = false;
          loop = setInterval(refresh, 500);
        });
      }
    }


  }
});

