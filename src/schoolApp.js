schoolApp = {
    web3Provider: null,
    account: null,
    contracts: {},  
    init: async function () {  
      return await schoolApp.initWeb3();
    },
  
    initWeb3: async function () {
  
      // Modern dapp browsers...
      if (window.ethereum) {
        schoolApp.web3Provider = window.ethereum;
        try {
          // Request account access
          await window.ethereum.request({ method: "eth_requestAccounts" });;
        } catch (error) {
          // User denied account access...
          console.error("User denied account access")
        }  
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        schoolApp.web3Provider = window.web3.currentProvider;
      }
      // If no injected web3 instance is detected, fall back to Ganache
      else {
        schoolApp.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      }
      web3 = new Web3(App.web3Provider);
  
      return schoolApp.initContract();
    },
  
    initContract: function () {
  
      $.getJSON('userRegister.json', function (data) {
        // Get the necessary contract artifact file and instantiate it with @truffle/contract
        schoolApp.contracts.userRegister = TruffleContract(data);
  
        // Set the provider for our contract
        schoolApp.contracts.userRegister.setProvider(App.web3Provider);
  
      });
  
      return schoolApp.initAccount();
  
    },
  
    initAccount: function () {
      // Fetching account address
      web3.eth.getAccounts(function (error, accounts) {
        if (error) {
          console.log(error);
        }
        schoolApp.account = accounts[0];
        console.log(schoolApp.account);
      });
    },
      btn_updateDistrictTender: function(){
  
  
      },
      btnAddTender:function(){
        $('#add_err').text('');
        // Fetching the values from the input fields
        var tid = $('#new_tid').val();
        var tmonth = $('#new_tMonth').val();
        var tstno = $('#new_tNoOfStudent').val();
        var tamount = $('#new_tAmount').val();
        if (tid== "" || tmonth == "" || tstno == "" || tamount == "") {
          $('#add_err').text('* Kindly fill all the fields !');
        }
        else {
          // Calling checkStudent function to check whether the student has already exist or not
          schoolApp.contracts.userRegister.deployed().then(function (instance) {
            return instance.checkschool(App.account);
          }).then(function (result) {
            if (result == 1) {
              schoolApp.contracts.userRegister.deployed().then(function (instance) {
                return instance.add_tender(parseInt(sid), sname, parseInt(sphone), smail, sstate, sdistrict, sblock, saddress, App.account, 0, { from: App.account });
    
              }).then(function (result) {
                $('#add_err').text('School Record Successfully Added');
                console.log(result);
              }).catch(function (err) {
                $('#add_err').text('* Unable to save record. Please try again!');
                console.log(err.message);
              });$('#add_err').text('* School does not exists Please register!');
              
            }
            else {
              $('#add_err').text('* School does not exists Please register!');
            }
          }).catch(function (err) {
            $('#add_err').text('* somthing went wrong , Please try again!');
            console.log(err.message);
          });
        }
      },
   select_loginas:
     function () {
      $('#view_err').text('');
      web3.eth.getAccounts(function (error, accounts) {
        if (error) {
          console.log(error);
        }
        App.account = accounts[0];
      });
  
      //var btnOption = $('#_loginAs').val();
      var btnOption = "1";
      console.log(btnOption);
      if (btnOption == "1") {
        App.contracts.userRegister.deployed().then(function (instance) {
          return instance.showschool(App.account);
        }).then(function (result) {
          //window.location.href ="s_page.html";
          console.log(result);
          // Displaying the values
          $('#view_tid').text(result[0].toNumber())
          $('#view_amount').text(result[3].toNumber());
          $('#view_issueDate').text(result[4].data);
          $('#view_status').text(result[2]);
          $('#view_result').show();
  
          //window.location.href ="s_page.html";
  
        }).catch(function (err) {
          console.log(err.message);
        })
      }
    }
  };
  
  $(function () {
    $('#_fund').hide();
    $('#_tender').hide();
  
    $(window).load(function () {
      App.init();
    });
  });
  
  