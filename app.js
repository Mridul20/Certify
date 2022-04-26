// import Tx from ethereumjs-tx
// import Web3 from web3
// import Accounts from web3-eth-accounts
var Tx = require('ethereumjs-tx')
const Web3 = require('web3')
var Accounts = require('web3-eth-accounts');
const express = require("express");
const bodyParser = require("body-parser");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const web3 = new Web3('HTTP://127.0.0.1:7545');
var accounts = new Accounts('HTTP://127.0.0.1:7545');

const abi =   [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "certificate_id",
          "type": "address"
        }
      ],
      "name": "certificateid",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "clgid",
          "type": "uint256"
        }
      ],
      "name": "id",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "add",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "addCollege",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "col",
          "type": "address"
        }
      ],
      "name": "checkcoll",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "inst",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "course",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "duration",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "ceid",
          "type": "address"
        }
      ],
      "name": "addcert",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "certid",
          "type": "address"
        }
      ],
      "name": "viewcert",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "course",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "dur",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]

  const coa =  '0xD148d204396858956cD501f4aB023492400aE774';


  var contract = new web3.eth.Contract(abi,coa);





  console.log(contract.methods);


  // contract.methods.createStudent(3,20,"mridul","mittal").send({from : account1,gasPrice : 1, gas : 6721975});

  // contract.methods.getParticularStudent(3).call(function(err,res){
  //   if(err)
  //   {
  //     console.log("errr");
  //   }
  //   console.log(res);
  // })
  
  // web3.eth.personal.newAccount() 
  // web3.eth.accounts.create();
  // console.log(web3.eth.accounts);
  // web3.eth.getAccounts().then(function(res) {
  //   document.getElementById("para1").innerHTML = res;
  //   console.log(res);
  // });
  

  app.get("/", function(req, res){
    res.render("home");
  });
  app.get("/addcollege",function(req,res){
    res.render("addcollege");
  });

  app.post("/addcollege",function(req,res){
    var name = req.body.name;
    web3.eth.personal.newAccount() 
    web3.eth.getAccounts().then(function(result) {
      var hash = result[result.length-1];
      console.log(hash);
      contract.methods.addCollege(hash,name).send({from : result[0],gasPrice : 1, gas : 6721975});
      res.render("showhash",{hash: hash});
    });
  });

  app.get("/viewcollege",function(req,res){
      res.render("viewcollege",{clgname:"NULL",clgid :"NULL"});
  })

  app.post("/viewcollege",function(req,res){
    var id = req.body.hash;
    web3.eth.getAccounts().then(function(result) {
        var hash = result[result.length-1];
        contract.methods.checkcoll(id).call(function(err,resu){
            res.render("viewcollege",{clgname:resu[0],clgid : resu[1]});
        })
      });
  });
  
  app.get("/addcertificate",function(req,res){
      res.render("addcertificate");
  })

  app.post("/addcertificate",function(req,res){
      var instid = req.body.instid;
      var name = req.body.name;
      var course = req.body.course;
      var dur = req.body.duration;
      web3.eth.personal.newAccount() 
      web3.eth.getAccounts().then(function(result) {
        var hash = result[result.length-1];
        contract.methods.addcert(instid,name,course,dur,hash).send({from : result[0],gasPrice : 1, gas : 6721975});
        res.render("showhash",{hash: hash});
      });
  })

  app.get("/viewcertificate",function(req,res){
    res.render("viewcertificate",{name:"NULL",course:"NULL",duration : "NULL"});
})

app.post("/viewcertificate",function(req,res){
  var id = req.body.hash;
  web3.eth.getAccounts().then(function(result) {
      contract.methods.viewcert(id).call(function(err,resu){
        //   console.log(resu);
          res.render("viewcertificate",{name:resu[0],course : resu[1],duration : resu[2]});
      })
    });
});


  app.get("/admin",function(req,res){
    res.render("admin")
  })

//   app.post("/", function(req, res){
//     var name = req.body.name;
//     var id = req.body.id;
//     var age = req.body.age;
//     web3.eth.personal.newAccount() 
//     // web3.eth.accounts.create();
//     web3.eth.getAccounts().then(function(result) {
//       var hash = result[result.length-1];
//       console.log(result);
//       contract.methods.createStudent(3,20,"mridul","mittal",hash).send({from : result[0],gasPrice : 1, gas : 6721975});
//       res.render("showhash",{hash: hash});
//     });
    
//   });
  
  
  app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
  });