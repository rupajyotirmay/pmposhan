// SPDX-License-Identifier: MIT

pragma solidity ^0.8;

contract userRegister {
    uint public _s_id =0;
    uint public _b_id =0;
    uint public _d_id =0;
    uint public _st_id =0;
    // structure for school
    struct school{
        uint s_id;
        string s_name;
        uint s_phone;
        string s_email;
        string s_state;
        string s_district;
        string s_block;
        string s_address;
        address sAddress;
        string u_type;
    }
    mapping(address=>school) public school_data;
    school[] school_d;
    //add_school through function
    function add_school(uint s_id,string memory s_name,uint s_phone,string memory s_email,string memory s_state,string memory s_district,string memory s_block,string memory s_address,address  sAddress,string memory u_type)  
    public { _s_id=_s_id++;
        userRegister.school memory x = school(s_id,s_name,s_phone,s_email,s_state,s_district,s_block,s_address,sAddress,u_type);
        school_d.push(x);
        school_data[sAddress] = x;
    }
    
    // structure for block
    struct blocks{
        string b_officername;
        uint b_phone;
        string b_email;
        string b_state;
        string b_district;
        string b_name;
        address  b_Address;
        string u_type;
    }
    mapping(address =>blocks) public b_data;
    blocks[] block_d;
     //add_block officer through function
    function add_block(string memory b_officername,uint b_phone,string memory b_email,string memory b_state,string memory b_district,string memory b_name,address  b_Address,string memory u_type)  
    public {
        userRegister.blocks memory b= blocks(b_officername,b_phone,b_email,b_state,b_district,b_name,b_Address,u_type);
        block_d.push(b);
        b_data[b_Address] = b;
    }
    
    // structure for district
    struct district{
        uint d_id;
        string d_officername;
        uint d_phone;
        string d_email;
        string d_state;
        string d_name;
        address  d_Address;
        string u_type;
    }
    mapping(address =>district) public d_data;
    district[] district_d;
    //add_district officer through function
    function add_district(uint d_id,string memory d_officername,uint d_phone,string memory d_email,string memory d_state,string memory d_name,address  d_Address,string memory u_type)  
    public {
        userRegister.district memory d = district(d_id,d_officername,d_phone,d_email,d_state,d_name,d_Address,u_type);
        district_d.push(d);
        d_data[d_Address] = d;
    }
    // structure for district
    struct state{
        string st_officername;
        uint st_phone;
        string st_email;
        string st_name;
        address  st_Address;
        string u_type;
    }
    mapping(address =>state) public st_data;
    state[] state_d;
    //add_state officer through function
    function add_state(string memory st_officername,uint st_phone,string memory st_email,string memory st_name,address  st_Address,string memory u_type)  
    public {
        userRegister.state memory st = state(st_officername,st_phone,st_email,st_name,st_Address,u_type);
        state_d.push(st);
        st_data[st_Address]=st;

    }
    function checkschool(address acad) view public returns(uint) {
        uint _find = 0; for (uint _i = 0; _i < school_d.length; _i++) {
            if (school_d[_i].sAddress== acad) {
                _find = 1;
            }} return (_find);
    }
    //f
    function checkblock(address acad) view public returns(uint) {
        uint _find = 0; for (uint _i = 0; _i < block_d.length; _i++) {
            if (block_d[_i].b_Address==acad) {
                _find = 1;
            }} return (_find);
    }
    function checkdistrict(address acad) view public returns(uint) {
        uint _find = 0; for (uint _i = 0; _i < district_d.length; _i++) {
            if (district_d[_i].d_Address== acad) {
                _find = 1;
            }} return (_find);
    }
    function checkstate(address acad) view public returns(uint) {
        uint _find = 0; for (uint _i = 0; _i < state_d.length; _i++) {
            if (state_d[_i].st_Address== acad) {
                _find = 1;
            }} return (_find);
    }
    function showschool(address s_acad) public view returns(uint,string memory,uint,string memory,string memory,string memory,string memory){
     return (school_data[s_acad].s_id,school_data[s_acad].s_name,school_data[s_acad].s_phone,school_data[s_acad].s_email,school_data[s_acad].s_state,school_data[s_acad].s_district,school_data[s_acad].s_block);
    }
    function showblock(address  b_acad) public view returns(string memory ,uint, string memory ,string memory ,string memory ,string memory ,address  ){
        return(b_data[b_acad].b_officername,b_data[b_acad].b_phone,b_data[b_acad].b_email,b_data[b_acad].b_state,b_data[b_acad].b_district,b_data[b_acad].b_name,b_data[b_acad].b_Address);
    }
    function showdistrict(address  d_acad) public view returns(string memory ,uint, string memory ,string memory ,string memory ,address  ){
        return(d_data[d_acad].d_officername,d_data[d_acad].d_phone,d_data[d_acad].d_email,d_data[d_acad].d_state,d_data[d_acad].d_name,d_data[d_acad].d_Address);
    }
    function showstate(address  st_acad) public view returns(string memory ,uint, string memory ,string memory ,address  ){
        return(st_data[st_acad].st_officername,st_data[st_acad].st_phone,st_data[st_acad].st_email,st_data[st_acad].st_name,st_data[st_acad].st_Address);
    }
    }
