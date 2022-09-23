App = {
  web3Provider: null,
  account: null,
  getbnm: null,
  tsize:0,
  contracts: {},
  init: async function () {
    return await App.initWeb3();
  },
  initWeb3: async function () {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });;
      }
      catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },
  initContract: function () {
    $.getJSON('userRegister.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      App.contracts.userRegister = TruffleContract(data);
      // Set the provider for our contract
      App.contracts.userRegister.setProvider(App.web3Provider);
    });
    return App.initAccount();
  },
  initAccount: function () {
    // Fetching account address
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }
      App.account = accounts[0];
      console.log(App.account);
    });
  },

  // Button click function for 'ADD' button to add student details
  btnAddSchool: function () {
    $('#add_err').text('');
    // Fetching the values from the input fields
    var sid = $('#new_sid').val();
    var sname = $('#new_sname').val();
    var sphone = $('#new_sphone').val();
    var smail = $('#new_smail').val();
    var sstate = $('#new_sstate').val();
    var sdistrict = $('#new_sdistrict').val();
    var sblock = $('#new_sblock').val();
    var saddress = $('#new_saddress').val();
    if (sid == "" || sname == "" || sphone == "" || smail == "" || sstate == "" || sdistrict == "" || sblock == "" || saddress == "") {
      $('#add_err').text('* Kindly fill all the fields !');
    }
    else {
      // Calling checkStudent function to check whether the student has already exist or not
      App.contracts.userRegister.deployed().then(function (instance) {
        return instance.checkschool(App.account);
      }).then(function (result) {
        if (result == 1) {
          $('#add_err').text('* School is already exists !');
        }
        else {
          // Calling addSchol function to add the student details
          App.contracts.userRegister.deployed().then(function (instance) {
            return instance.add_school(parseInt(sid), sname, parseInt(sphone), smail, sstate, sdistrict, sblock, saddress, App.account, 0, { from: App.account });

          }).then(function (result) {
            $('#add_err').text('School Record Successfully Added');
            console.log(result);
          }).catch(function (err) {
            $('#add_err').text('* Unable to save record. Please try again!');
            console.log(err.message);
          });
        }
      }).catch(function (err) {
        $('#add_err').text('* somthing went wrong , Please try again!');
        console.log(err.message);
      });
    }
  },

  btnAddBlock: function () {
    $('#add_err').text('');
    // Fetching the values from the input fields
    var sname = $('#new_bonm').val();
    var sphone = $('#new_bophone').val();
    var smail = $('#new_bomail').val();
    var sstate = $('#new_bstate').val();
    var sdistrict = $('#new_bdistrict').val();
    var sblock = $('#new_bblock').val();
    if (sname == "" || sphone == "" || smail == "" || sstate == "" || sdistrict == "" || sblock == "") {
      $('#add_err').text('* Kindly fill all the fields !');
    }
    else {

      // Calling checkStudent function to check whether the student has already exist or not
      App.contracts.userRegister.deployed().then(function (instance) {
        return instance.checkblock(App.account);
      }).then(function (result) {
        if (result == 1) {
          $('#add_err2').text('* Block is already exists !');
        }
        else {
          // Calling addSchol function to add the student details
          App.contracts.userRegister.deployed().then(function (instance) {
            return instance.add_block(sname, parseInt(sphone), smail, sstate, sdistrict, sblock, App.account, 1, { from: App.account });

          }).then(function (result) {
            $('#add_err2').text('Block Record Successfully Added');
            console.log(result);
          }).catch(function (err) {
            $('#add_err2').text('* Unable to save record. Please try again!');
            console.log(err.message);
          });
        }
      }).catch(function (err) {
        $('#add_err2').text('* somthing went wrong , Please try again!');
        console.log(err.message);
      });
    }
  },
  btnAddDistrict: function () {
    $('#add_err').text('');
    // Fetching the values from the input fields
    var sname = $('#new_donm').val();
    var sphone = $('#new_dophone').val();
    var smail = $('#new_domail').val();
    var sstate = $('#new_dostate').val();
    var sdistrict = $('#new_dodistrict').val();
    if (sname == "" || sphone == "" || smail == "" || sstate == "" || sdistrict == "") {
      $('#add_err').text('* Kindly fill all the fields !');
    }
    else {
      // Calling checkStudent function to check whether the student has already exist or not
      App.contracts.userRegister.deployed().then(function (instance) {
        return instance.checkdistrict(App.account);
      }).then(function (result) {
        if (result == 1) {
          $('#add_err3').text('* District is already exists !');
        }
        else {
          // Calling addSchol function to add the student details
          App.contracts.userRegister.deployed().then(function (instance) {
            return instance.add_district(sname, parseInt(sphone), smail, sstate, sdistrict, App.account, 2, { from: App.account });
          }).then(function (result) {
            $('#add_err3').text('District Record Successfully Added');
            console.log(result);
          }).catch(function (err) {
            $('#add_err3').text('* Unable to save record. Please try again!');
            console.log(err.message);
          });
        }
      }).catch(function (err) {
        $('#add_err3').text('* somthing went wrong , Please try again!');
        console.log(err.message);
      });
    }
  },
  btnAddState: function () {
    $('#add_err').text('');
    // Fetching the values from the input fields
    var sname = $('#new_sonm').val();
    var sphone = $('#new_sophone').val();
    var smail = $('#new_somail').val();
    var sstate = $('#new_sostate').val();
    if (sname == "" || sphone == "" || smail == "" || sstate == "") {
      $('#add_err').text('* Kindly fill all the fields !');
    }
    else {
      // Calling checkStudent function to check whether the student has already exist or not
      App.contracts.userRegister.deployed().then(function (instance) {
        return instance.checkstate(App.account);
      }).then(function (result) {
        if (result == 1) {
          $('#add_err4').text('* State is already exists !');
        }
        else {
          // Calling addSchol function to add the student details
          App.contracts.userRegister.deployed().then(function (instance) {
            return instance.add_state(sname, parseInt(sphone), smail, sstate, App.account, 3, { from: App.account });
          }).then(function (result) {
            $('#add_err4').text('State Record Successfully Added');
            console.log(result);
          }).catch(function (err) {
            $('#add_err4').text('* Unable to save record. Please try again!');
            console.log(err.message);
          });
        }
      }).catch(function (err) {
        $('#add_err4').text('* somthing went wrong , Please try again!');
        console.log(err.message);
      });
    }
  },
  btnAddTender: function () {
    alert('ok');
    $('#add_err').text('');
    var tid = $('#new_tid').val();
    var tmonth = $('#new_tMonth').val();
    var tstno = $('#new_tNoOfStudent').val();
    var tamount = $('#new_tAmount').val();alert('ok');
    if (tid == "" || tmonth == "" || tstno == "" || tamount == "") {
      $('#add_err').text('* Kindly fill all the fields !');
    }
    else {
      // Calling checkStudent function to check whether the student has already exist or not
      App.contracts.userRegister.deployed().then(function (instance) {
        return instance.checkschool(App.account);
      }).then(function (result) {
        if (result == 0) {
          $('#add_err4').text('* school does not exists !');
        }
        else {
          // Calling addSchol function to add the student details
          App.contracts.userRegister.deployed().then(function (instance) {
            return instance.add_tender(parseInt(tid), tmonth, parseInt(tstno), tamount, 1, { from: App.account });
          }).then(function (result) {
            $('#add_err4').text('Tender Record Successfully Added');
            console.log(result);
          }).catch(function (err) {
            $('#add_err4').text('* Unable to save record. Please try again!');
            console.log(err.message);
          });
        }
      }).catch(function (err) {
        $('#add_err4').text('* somthing went wrong , Please try again!');
        console.log(err.message);
      });
    }
  },

  // btn_updateDistrictTender: function(){


  // },
  btnAddBid: function () {
    $('#add_err').text('');
    // Fetching the values from the input fields              
    var bid = $('#new_bid').val();
    var tid = $('#new_tid').val();
    var bmonth = $('#new_bmonth').val();
    var tamount = $('#new_tAmount').val();
    if (bid = "" || tid == "" || bmonth == "" || tamount == "") {
      $('#add_err5').text('* Kindly fill all the fields !');
    }
    else {
      // Calling checkStudent function to check whether the student has already exist or not
      App.contracts.userRegister.deployed().then(function (instance) {
        return instance.checktender(App.account);
      }).then(function (result) {
        if (result == 1) {
          // Calling addSchol function to add the student details
          App.contracts.userRegister.deployed().then(function (instance) {
            return instance.add_tender(parseInt(tid), App.account, a, parseInt(tamount), 1, { from: App.account });
          }).then(function (result) {
            $('#add_err5').text('Tender Record Successfully Added');
            console.log(result);
          }).catch(function (err) {
            $('#add_err5').text('* Unable to save record. Please try again!');
            console.log(err.message);
          });
        }
        else {
          $('#add_err5').text('* school does not exists !');
        }
      }).catch(function (err) {
        $('#add_err5').text('* somthing went wrong , Please try again!');
        console.log(err.message);
      });
    }
  },

  // btnAddTender:function(){  
  //   alert('okok');
  // $('#add_err').text('');
  // // Fetching the values from the input fields
  // var tid = $('#new_tid').val();
  // var tmonth = $('#new_tMonth').val();
  // var tstno = $('#new_tNoOfStudent').val();
  // var tamount = $('#new_tAmount').val();
  // if (tid== "" || tmonth == "" || tstno == "" || tamount == "") {
  //   $('#add_err5').text('* Kindly fill all the fields !');
  // }
  // else 
  //   {
  //   // Calling checkStudent function to check whether the student has already exist or not
  //   App.contracts.userRegister.deployed().then(function (instance) {
  //   return instance.checkschool(App.account);
  //   }).then(function (result) 
  //     {
  //       if (result == 1) 
  //         {
  //           // Calling addSchol function to add the student details
  //           App.contracts.userRegister.deployed().then(function (instance) 
  //           {
  //           return instance.add_tender(parseInt(tid),App.account,a,parseInt(tamount),1, { from: App.account });
  //           }).then(function (result) 
  //           {
  //           $('#add_err5').text('Tender Record Successfully Added');
  //           console.log(result);
  //           }).catch(function (err) 
  //           {
  //           $('#add_err5').text('* Unable to save record. Please try again!');
  //           console.log(err.message);
  //           });
  //         }
  //       else 
  //         {
  //           $('#add_err5').text('* school does not exists !');
  //         }
  //     }).catch(function (err) 
  //         {
  //           $('#add_err5').text('* somthing went wrong , Please try again!');
  //           console.log(err.message);
  //         });
  //   }
  //   },
  // Button click function for 'VIEW' button to show the student details
  select_loginas: function () {
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
    switch (btnOption) {
      case "1":
        App.contracts.userRegister.deployed().then(function (instance) {
          return instance.showschool(App.account);
        }).then(function (result) {
          //window.location.href ="s_page.html";
          console.log(result);
          // Displaying the values
          //$('#view_rollno').text(result[0].toNumber());
          $('#view_acad').text(App.account);
          $('#view_sid').text(result[0].toNumber());
          $('#view_sname').text(result[1]);
          $('#view_sblock').text(result[6]);
          $('#view_result').show();
          //window.location.href ="s_page.html";
        }).catch(function (err) {
          console.log(err.message);
        })
        break;
      case "2":
        App.contracts.userRegister.deployed().then(function (instance) {
          return (instance.showblock(App.account), instance.showschool(App.account));
        }
        ).then(function (result) {

          //window.location.href ="s_page.html";
          console.log(result);
          // Displaying the values {
            $('#view_acad').text(App.account);
            $('#view_sid').text(result[0].toNumber());
            $('#view_sname').text(result[1]);
            $('#view_sblock').text(result[6]);
            $('#view_result').show();
            //window.location.href ="s_page.html";
          
        }).catch(function (err) {
          console.log(err.message);
        })
        break;
    }
  },

  btn_allSchoolView: function () { 

    App.getBlockNm();
    App.gettenderSize();    
    for (var i = 0; i < tsize; i++) {
      App.showtenderview(i);
    }
    $('#btn_allSchoolView').hide();
  },
  showtenderview:function(times){
    App.contracts.userRegister.deployed().then(function (instance) {
      return instance.showtender(times);
    }).then(function (result) {

      var getsid=App.showSchoolView(10);
      //console.log(result);
      if(getsid==result[2]){
      var x = "<tr><td>" + result[0].toNumber() + "</td><td>" + result[1].toNumber() + "</td><td>" + result[2] + "</td><td>" + result[3].toNumber() + "</td><td>" + result[4]+ "</td><td><button class='btn btn-sm btn-primary' type='button' onclick='App.btnUserApplyIns(" + result[0].toNumber() + ")'>APPLY</button></td></tr>";
      $('#tenderList').append(x);
    
      $('#tenderList').show();}
  }).catch(function (err) {
    console.log(err.message);
  });
  },
  showSchoolView: function(times) {
    App.contracts.userRegister.deployed().then(function (instance) {
      return instance.showschoolindex(times);
    }).then(function (result) {
      console.log(getbnm);
      if(getbnm==result[6]){
      return (result[8]);
    }
    }).catch(function (err) {
      console.log(err.message);
    })
  },
  getBlockNm:function (){
    App.contracts.userRegister.deployed().then(function (instance) {
      return instance.showblock(App.account);
    }).then(function (result) {
      console.log(result);
      return(getbnm=result[5]);
    }).catch(function (err) {
      console.log(err.message);
    })
  },
  gettenderSize: function () {
    App.contracts.UserRegister.deployed().then(function (instance) {
      return instance.getTenderSize(1);
    }).then(function (result) {
      return(tsize= result.toNumber());
      console.log('Policy Nums: ' + tsize);
    }).catch(function (err) {
      console.log(err.message);
    });
  },

};


$(function () {
  $('#_fund').hide();
  $('#_tender').hide();

  $(window).load(function () {
    App.init();
  });
});

