App = {
  web3Provider: null,
  account: null,
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
      } catch (error) {
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
      // Fetching account address
      web3.eth.getAccounts(function (error, accounts) {
        if (error) {
          console.log(error); 
        }
        var account = accounts[0];
        App.account = accounts[0];
        console.log(App.account);
      });
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
      // Fetching account address
      web3.eth.getAccounts(function (error, accounts) {
        if (error) {
          console.log(error); l
        }
        var account = accounts[0];
        App.account = accounts[0];
        console.log(App.account);
      });
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
    var sstate = $('#new_state').val();
    var sdistrict = $('#new_district').val();
    if (sname == "" || sphone == "" || smail == "" || sstate == "" || sdistrict == "" ){
      $('#add_err').text('* Kindly fill all the fields !');
    }
    else {
      // Fetching account address
      web3.eth.getAccounts(function (error, accounts) {
        if (error) {
          console.log(error); l
        }
        var account = accounts[0];
        App.account = accounts[0];
        console.log(App.account);
      });
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
              return instance.add_district(sname, parseInt(sphone), smail, sstate, sdistrict, App.account, 2, { from: App.account });

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
  btnAddState: function () {
    $('#add_err').text('');
    // Fetching the values from the input fields
    var sname = $('#new_bonm').val();
    var sphone = $('#new_bophone').val();
    var smail = $('#new_bomail').val();
    var sstate = $('#new_state').val();
    if (sname == "" || sphone == "" || smail == "" || sstate == "") {
      $('#add_err').text('* Kindly fill all the fields !');
    }
    else {
      // Fetching account address
      web3.eth.getAccounts(function (error, accounts) {
        if (error) {
          console.log(error); l
        }
        var account = accounts[0];
        App.account = accounts[0];
        console.log(App.account);
      });
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
              return instance.add_block(sname, parseInt(sphone), smail, sstate, App.account, 3, { from: App.account });

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
    if(btnOption == "1") {
      App.contracts.userRegister.deployed().then(function(instance) {
        return instance.showschool(App.account);
      }).then(function(result) {
        //window.location.href ="s_page.html";
        console.log(result);
        // Displaying the values
        //$('#view_rollno').text(result[0].toNumber());
        $('#view_acad').text(App.account);
        $('#view_sid').text(result[0].toNumber());
        $('#view_sname').text(result[1]);
        $('#view_sphone').text(result[2].toNumber());
        $('#view_smail').text(result[3]);
        $('#view_sstate').text(result[4]);
        $('#view_sdistrict').text(result[5]);
        $('#view_sblock').text(result[6]);
        $('#view_result').show();

        //window.location.href ="s_page.html";

      }).catch(function(err) {
        console.log(err.message);
      })
    }


    // App.contracts.userRegister.deployed().then(function (instance) {
    //   if ($(this).val() == "1") {
    //     window.location.href ="/s_page.html";
    //     return instance.showschool(account);
    //   }
    //   else {
    //     if ($(this).val() == "2") {
    //       window.location.href = "b_page.html";
    //       return instance.showblock(account);
    //     }
    //     else {
    //       if ($(this).val() == "3") {
    //         window.location = "d_page.html";
    //         return instance.showdistrict(account);
    //       }
    //       else {
    //         if ($(this).val() == "4") {
    //           window.location = "st_page.html";
    //           return instance.showstate(account);
    //         }
    //       }
    //     }
    //   }
    // }).
    //   then(function (result) {
    //     console.log(account);
    //     console.log(result);
    //     // Displaying the values
    //     //$('#view_rollno').text(result[0].toNumber());
    //     $('#view_sid').text(result[0].toNumber());
    //     $('#view_sname').text(result[1]);
    //     $('#view_sphone').text(result[2].toNumber());
    //     $('#view_smail').text(result[3]);
    //     $('#view_sstate').text(result[4]);
    //     $('#view_sdistrict').text(result[5]);
    //     $('#view_sblock').text(result[6]);
    //     $('#view_result').show();

    //   }).catch(function (err) {
    //     $('#view_err').text('* Something went wrong, Please try again !');
    //     console.log(err.message);
    //     $('#view_result').hide();

    //   });
  }
};

$(function () {

  $('#login').hide();
  $('#addSchool').hide();
  $('#addBlock').hide();
  $('#addDistrict').hide();
  $('#addState').hide();

  $(window).load(function () {
    App.init();
  });
});
$(function () {
  $('#_registerAs').on("click", function () {
    if ($(this).val() == "1") { $("#addSchool").show(); $('#login').hide(); $('#addBlock').hide(); $('#addDistrict').hide(); $('#addState').hide(); } else {
      if ($(this).val() == "2") { $("#addBlock").show(); $('#login').hide(); $('#addSchool').hide(); $('#addDistrict').hide(); $('#addState').hide(); } else {
        if ($(this).val() == "3") { $("#addDistrict").show(); $('#login').hide(); $('#addSchool').hide(); $('#addState').hide(); $('#addBlock').hide(); } else {
          if ($(this).val() == "4") { $("#addState").show(); $('#login').hide(); $('#addSchool').hide(); $('#addBlock').hide(); $('#addDistrict').hide(); }
        }
      }
    }
  });
});

$(function () {
  $('#_loginAs').on("click", function () {
    if ($(this).val() == "1") { } else {
      if ($(this).val() == "2") { } else {
        if ($(this).val() == "3") { } else {
          if ($(this).val() == "4") { }
        }
      }
    }
  });
});
