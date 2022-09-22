// SPDX-License-Identifier: MIT

pragma solidity ^0.8;

contract userRegister {
    uint256 public _s_id = 0;
    uint256 public _b_id = 0;
    uint256 public _d_id = 0;
    uint256 public _st_id = 0;
    // structure for school
    struct school {
        uint256 s_id;
        string s_name;
        uint256 s_phone;
        string s_email;
        string s_state;
        string s_district;
        string s_block;
        string s_address;
        address sAddress;
        string u_type;
    }
    mapping(address => school) public school_data;
    school[] school_d;

    //add_school through function
    function add_school(
        uint256 s_id,
        string memory s_name,
        uint256 s_phone,
        string memory s_email,
        string memory s_state,
        string memory s_district,
        string memory s_block,
        string memory s_address,
        address sAddress,
        string memory u_type
    ) public {
        _s_id = _s_id++;
        userRegister.school memory x = school(
            s_id,
            s_name,
            s_phone,
            s_email,
            s_state,
            s_district,
            s_block,
            s_address,
            sAddress,
            u_type
        );
        school_d.push(x);
        school_data[sAddress] = x;
    }

    // structure for block
    struct blocks {
        string b_officername;
        uint256 b_phone;
        string b_email;
        string b_state;
        string b_district;
        string b_name;
        address b_Address;
        string u_type;
    }
    mapping(address => blocks) public b_data;
    blocks[] block_d;

    //add_block officer through function
    function add_block(
        string memory b_officername,
        uint256 b_phone,
        string memory b_email,
        string memory b_state,
        string memory b_district,
        string memory b_name,
        address b_Address,
        string memory u_type
    ) public {
        userRegister.blocks memory b = blocks(
            b_officername,
            b_phone,
            b_email,
            b_state,
            b_district,
            b_name,
            b_Address,
            u_type
        );
        block_d.push(b);
        b_data[b_Address] = b;
    }

    // structure for district
    struct district {
        string d_officername;
        uint256 d_phone;
        string d_email;
        string d_state;
        string d_name;
        address d_Address;
        string u_type;
    }
    mapping(address => district) public d_data;
    district[] district_d;

    //add_district officer through function
    function add_district(
        string memory d_officername,
        uint256 d_phone,
        string memory d_email,
        string memory d_state,
        string memory d_name,
        address d_Address,
        string memory u_type
    ) public {
        userRegister.district memory d = district(
            d_officername,
            d_phone,
            d_email,
            d_state,
            d_name,
            d_Address,
            u_type
        );
        district_d.push(d);
        d_data[d_Address] = d;
    }

    // structure for district
    struct state {
        string st_officername;
        uint256 st_phone;
        string st_email;
        string st_name;
        address st_Address;
        string u_type;
    }
    mapping(address => state) public st_data;
    state[] state_d;

    //add_state officer through function
    function add_state(
        string memory st_officername,
        uint256 st_phone,
        string memory st_email,
        string memory st_name,
        address st_Address,
        string memory u_type
    ) public {
        userRegister.state memory st = state(
            st_officername,
            st_phone,
            st_email,
            st_name,
            st_Address,
            u_type
        );
        state_d.push(st);
        st_data[st_Address] = st;
    }

    function checkschool(address acad) public view returns (uint256) {
        uint256 _find = 0;
        for (uint256 _i = 0; _i < school_d.length; _i++) {
            if (school_d[_i].sAddress == acad) {
                _find = 1;
            }
        }
        return (_find);
    }

    //
    function checkblock(address acad) public view returns (uint256) {
        uint256 _find = 0;
        for (uint256 _i = 0; _i < block_d.length; _i++) {
            if (block_d[_i].b_Address == acad) {
                _find = 1;
            }
        }
        return (_find);
    }

    function checkdistrict(address acad) public view returns (uint256) {
        uint256 _find = 0;
        for (uint256 _i = 0; _i < district_d.length; _i++) {
            if (district_d[_i].d_Address == acad) {
                _find = 1;
            }
        }
        return (_find);
    }

    function checkstate(address acad) public view returns (uint256) {
        uint256 _find = 0;
        for (uint256 _i = 0; _i < state_d.length; _i++) {
            if (state_d[_i].st_Address == acad) {
                _find = 1;
            }
        }
        return (_find);
    }

    function showschool(address s_acad)
        public
        view
        returns (
            uint256,
            string memory,
            uint256,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        return (
            school_data[s_acad].s_id,
            school_data[s_acad].s_name,
            school_data[s_acad].s_phone,
            school_data[s_acad].s_email,
            school_data[s_acad].s_state,
            school_data[s_acad].s_district,
            school_data[s_acad].s_block
        );
    }
    function showschoolindex(uint256 ssindex) public view
        returns (uint256, string memory, uint256, string memory, string memory, string memory, string memory)
    {
        return (
            school_d[ssindex].s_id,
            school_d[ssindex].s_name,
            school_d[ssindex].s_phone,
            school_d[ssindex].s_email,
            school_d[ssindex].s_state,
            school_d[ssindex].s_district,
            school_d[ssindex].s_block
        );
    }

    function showblock(address b_acad)
        public
        view
        returns (
            string memory,
            uint256,
            string memory,
            string memory,
            string memory,
            string memory,
            address
        )
    {
        return (
            b_data[b_acad].b_officername,
            b_data[b_acad].b_phone,
            b_data[b_acad].b_email,
            b_data[b_acad].b_state,
            b_data[b_acad].b_district,
            b_data[b_acad].b_name,
            b_data[b_acad].b_Address
        );
    }
    function showdistrict(address d_acad)
        public
        view
        returns (
            string memory,
            uint256,
            string memory,
            string memory,
            string memory,
            address
        )
    {
        return (
            d_data[d_acad].d_officername,
            d_data[d_acad].d_phone,
            d_data[d_acad].d_email,
            d_data[d_acad].d_state,
            d_data[d_acad].d_name,
            d_data[d_acad].d_Address
        );
    }

    function showstate(address st_acad)
        public
        view
        returns (
            string memory,
            uint256,
            string memory,
            string memory,
            address
        )
    {
        return (
            st_data[st_acad].st_officername,
            st_data[st_acad].st_phone,
            st_data[st_acad].st_email,
            st_data[st_acad].st_name,
            st_data[st_acad].st_Address
        );
    }
    struct tender {
        uint256 t_id;
        address t_sid;
        string  t_status;
        uint256 t_amount;   
        string t_timest; }
    mapping(uint256 =>tender) public t_data;
    tender[] tender_d;
    function add_tender(
        uint256 t_id,
        address t_sid,
        string memory t_status,
        uint256 t_amount,
        string memory t_timest
    ) public {
        userRegister.tender memory t = tender(
            t_id,
            t_sid,
            t_status,
            t_amount,
            t_timest
        );
        tender_d.push(t);
        t_data[t_id] = t;
    }
    function checktender(uint256 t_id) public view returns (uint256) {
        uint256 _find = 0;
        for (uint256 _i = 0; _i < tender_d.length; _i++) {
            if (tender_d[_i].t_id == t_id) {
                _find = 1;
            }
        }
        return (_find);
    }

    function showtender(uint256 t_id)
        public
        view
        returns (
        uint256 ,
        address ,
        string memory ,
        uint256 ,
        string memory 
        )
    {
        return(
            t_data[t_id].t_id,
            t_data[t_id].t_sid,
            t_data[t_id].t_status,
            t_data[t_id].t_amount,
            t_data[t_id].t_timest
        );
    }
    struct tbill {
        uint256 b_id;
        uint256 b_tid;
        string b_month;
        uint256 b_amount; 
        }
    mapping(uint256 =>tbill) public bill_data;
    tbill[] bill_d;   
    function add_bill(
        uint256 b_id,
        uint256 b_tid,
        string memory b_month,
        uint256 b_amount
    ) public {
        userRegister.tbill memory bi = tbill(
            b_id,
            b_tid,
            b_month,
            b_amount
        );
        bill_d.push(bi);
        bill_data[b_id] = bi;
    }



    function getTenderSize() public view returns(uint) {
        uint _size;
        _size = tender_d.length;
        return (_size);
    }
    function getTengder(uint _i) public view returns(uint, address,string memory, uint) {
        return(tender_d[_i].t_id,tender_d[_i].t_sid,tender_d[_i].t_status,tender_d[_i].t_amount);
    }

    ///////////////////////////////////////
//  function stender(address _add) public returns(int _id){
//      string memory blockname= b_data[_add].b_name;
//      uint size=block_d.length;
//      for(uint i=0;i<school_d.length; i++){
//         if(school_d[_add].s_block==blockname){
            
//         }
//      }

//  }


    /////////////////////////////////////
}
