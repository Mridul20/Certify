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
    "inputs": [
      {
        "internalType": "address",
        "name": "instad",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_acr",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_link",
        "type": "string"
      },
      {
        "internalType": "string[]",
        "name": "_course",
        "type": "string[]"
      }
    ],
    "name": "addInstitute",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "instad",
        "type": "address"
      }
    ],
    "name": "viewInstitute",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "acr",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "link",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "course",
            "type": "string[]"
          },
          {
            "internalType": "bool",
            "name": "del",
            "type": "bool"
          }
        ],
        "internalType": "struct cert.institute",
        "name": "i",
        "type": "tuple"
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
        "name": "instad",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_acr",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_link",
        "type": "string"
      },
      {
        "internalType": "string[]",
        "name": "_course",
        "type": "string[]"
      }
    ],
    "name": "updateInstitute",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "instad",
        "type": "address"
      }
    ],
    "name": "deleteInstitute",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "viewAllInstitutes",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "acr",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "link",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "course",
            "type": "string[]"
          },
          {
            "internalType": "bool",
            "name": "del",
            "type": "bool"
          }
        ],
        "internalType": "struct cert.institute[]",
        "name": "",
        "type": "tuple[]"
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
        "name": "studad",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "addStudent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "certad",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "instad",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "studad",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_course",
        "type": "string"
      },
      {
        "internalType": "int256",
        "name": "dur",
        "type": "int256"
      }
    ],
    "name": "issueCertificate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "certad",
        "type": "address"
      }
    ],
    "name": "revCertificate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "certad",
        "type": "address"
      }
    ],
    "name": "viewCertificate",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "stud",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "inst",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "course",
            "type": "string"
          },
          {
            "internalType": "int256",
            "name": "duration",
            "type": "int256"
          },
          {
            "internalType": "bool",
            "name": "del",
            "type": "bool"
          }
        ],
        "internalType": "struct cert.certificate",
        "name": "",
        "type": "tuple"
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
        "name": "studad",
        "type": "address"
      }
    ],
    "name": "viewStudCert",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "stud",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "inst",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "course",
            "type": "string"
          },
          {
            "internalType": "int256",
            "name": "duration",
            "type": "int256"
          },
          {
            "internalType": "bool",
            "name": "del",
            "type": "bool"
          }
        ],
        "internalType": "struct cert.certificate[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]

  const coa =  '0xDacCAAe834559F630c46382a826eFFFea9A82F69';


  var contract = new web3.eth.Contract(abi,coa);


  // console.log(contract.methods);

let adminad = "0";
let institutead = "0";

app.get("/",function(req,res){
    res.render("home");
});

app.get("/adminlogin",function(req,res){
    res.render("adminlogin");
});

app.get("/admin/:id",function(req,res){
  var id = req.params.id;
  adminad = id;
  res.render("admin",{id: id});
});

app.post("/adminlogin",function(req,res){
  return res.redirect("/admin/" + req.body.id);
});

app.get("/addinstitute",function(req,res){
  res.render("addinstitute");
});

app.post("/addinstitute",function(req,res){
  console.log(req.body);
  var courses = ["a","b"];

  web3.eth.personal.newAccount() 
  // console.log("admin : ");
  // console.log(adminad);
  web3.eth.getAccounts().then(function(result) {
    var hash = result[result.length-1];
    console.log(hash);
    contract.methods.addInstitute(hash,req.body.name,req.body.acr,req.body.webl,courses)
    .send({from : result[0],gasPrice : 1, gas : 6721975},function(err){
      if(err)
        console.log(err);
    });

    res.render("admin",{id: adminad});
  });
});

app.get("/viewinstitute",function(req,res){
  contract.methods.viewAllInstitutes().call(function(err,resu){
    if(err)
      console.log(err);
    console.log(resu);
    res.render("viewinstitute",{inst:resu});
  });
});

app.get("/removeinstitute",function(req,res){
  res.render("removeinstitute");
});

app.post("/removeinstitute",function(req,res){
  var id = req.body.username;
  web3.eth.getAccounts().then(function(result) {
  contract.methods.deleteInstitute(id)
  .send({from : result[0],gasPrice : 1, gas : 6721975},function(err){
    if(err)
      console.log(err);
    res.redirect("/admin/" + adminad);
  });
  });
});

app.get("/updateinstitute",function(req,res){
  res.render("updateinstitute");
})

app.get("/institutelogin",function(req,res){
  res.render("institutelogin");
});

app.get("/institute/:id",function(req,res){
var id = req.params.id;
institutead = id;
res.render("institute",{id: id});
});


app.post("/institutelogin",function(req,res){
return res.redirect("/institute/" + req.body.id);
});
app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});

// app.post("/updateinstitute",function(req,res){
//   console.log(req.body);
//   var courses = ["a","b"];
  
//   web3.eth.personal.newAccount() 
//   // console.log("admin : ");
//   // console.log(adminad);
//   web3.eth.getAccounts().then(function(result) {
//     var hash = result[result.length-1];
//     console.log(hash);
//     contract.methods.addInstitute(hash,req.body.name,req.body.acr,req.body.webl,courses)
//     .send({from : result[0],gasPrice : 1, gas : 6721975},function(err){
//       if(err)
//         console.log(err);
//     });

//     res.render("admin",{id: adminad});
//   });
// });
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
  

//   app.get("/", function(req, res){
//     res.render("home");
//   });
//   app.get("/addcollege",function(req,res){
//     res.render("addcollege");
//   });

//   app.post("/addcollege",function(req,res){
//     var name = req.body.name;
//     web3.eth.personal.newAccount() 
//     web3.eth.getAccounts().then(function(result) {
//       var hash = result[result.length-1];
//       console.log(hash);
//       contract.methods.addCollege(hash,name).send({from : result[0],gasPrice : 1, gas : 6721975});
//       res.render("showhash",{hash: hash});
//     });
//   });

//   app.get("/viewcollege",function(req,res){
//       res.render("viewcollege",{clgname:"NULL",clgid :"NULL"});
//   })

//   app.post("/viewcollege",function(req,res){
//     var id = req.body.hash;
//     web3.eth.getAccounts().then(function(result) {
//         var hash = result[result.length-1];
//         contract.methods.checkcoll(id).call(function(err,resu){
//             res.render("viewcollege",{clgname:resu[0],clgid : resu[1]});
//         })
//       });
//   });
  
//   app.get("/addcertificate",function(req,res){
//       res.render("addcertificate");
//   })

//   app.post("/addcertificate",function(req,res){
//       var instid = req.body.instid;
//       var name = req.body.name;
//       var course = req.body.course;
//       var dur = req.body.duration;
//       web3.eth.personal.newAccount() 
//       web3.eth.getAccounts().then(function(result) {
//         var hash = result[result.length-1];
//         contract.methods.addcert(instid,name,course,dur,hash).send({from : result[0],gasPrice : 1, gas : 6721975});
//         res.render("showhash",{hash: hash});
//       });
//   })

//   app.get("/viewcertificate",function(req,res){
//     res.render("viewcertificate",{name:"NULL",course:"NULL",duration : "NULL"});
// })

// app.post("/viewcertificate",function(req,res){
//   var id = req.body.hash;
//   web3.eth.getAccounts().then(function(result) {
//       contract.methods.viewcert(id).call(function(err,resu){
//         //   console.log(resu);
//           res.render("viewcertificate",{name:resu[0],course : resu[1],duration : resu[2]});
//       })
//     });
// });


//   app.get("/admin",function(req,res){
//     res.render("admin")
//   })

// //   app.post("/", function(req, res){
// //     var name = req.body.name;
// //     var id = req.body.id;
// //     var age = req.body.age;
// //     web3.eth.personal.newAccount() 
// //     // web3.eth.accounts.create();
// //     web3.eth.getAccounts().then(function(result) {
// //       var hash = result[result.length-1];
// //       console.log(result);
// //       contract.methods.createStudent(3,20,"mridul","mittal",hash).send({from : result[0],gasPrice : 1, gas : 6721975});
// //       res.render("showhash",{hash: hash});
// //     });
    
// //   });
  
  
//   app.listen(process.env.PORT || 3000, function() {
//     console.log("Server started on port 3000");
//   });