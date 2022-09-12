// SPDX-License-Identifier: MIT

pragma solidity ^0.8;

contract StudentRegister {
    // structure for student
    struct Student {
        uint rollno;
        string name;
        string location;
        uint percentage;
    }

    // Creating array of student structure
    Student[] person;
    mapping(uint => Student) public studs;

    // Function to add students into the student structure
    function addStudent(uint _rollno, string memory _name, string memory _location, uint _percentage) public {
        Student memory x = Student(_rollno, _name, _location, _percentage);
        person.push(x);
        studs[_rollno] = x;
    }

    // Function to check whether the student exist or not
    function checkStudent(uint _rollno) view public returns(uint) {
        uint _find = 0;
        for (uint _i = 0; _i < person.length; _i++) {
            if (person[_i].rollno == _rollno) {
                _find = 1;
            }
        }

        return (_find);
    }

    // Function to show the details of the students by providing roll number
    function showStudent(uint _rollno) view public returns (uint, string memory, string memory, uint) {
        uint _flag = 0;
        for (uint _i = 0; _i < person.length; _i++) {
            if (person[_i].rollno == _rollno) {
                _flag = 1;
                return (person[_i].rollno, person[_i].name, person[_i].location, person[_i].percentage);
            }
        }
        
        return (0, "Not exist", "0", 0);

    }
}