pragma solidity >=0.7.0 <0.9.0;

contract certman{

    address admin;

    constructor() public {
        admin=msg.sender;
    }

    struct course {
        string title;
        bool del;
    }

    struct institute {
        string name;
        string acr;
        string link;
        bool del;
    }

    mapping(address=>institute) institutes;
    mapping(address=>course[]) instcourses;

    function addInstitute(address instad,string memory _name,string memory _acr,string memory _link,course[] memory _course) public{
        if(msg.sender != admin)
            return ;
        for(uint i=0;i<_course.length;i++)
            instcourses[instad].push(_course[i]);
        institutes[instad] = institute(_name,_acr,_link,true);
    }

    function viewInstitue(address instad) public view returns (institute memory i,course[] memory c)
    {
        institute memory t = institute("invalid","inv","null",false);
        course[] memory t1;

        if(msg.sender != admin)
            return (t,t1);
        if(institutes[instad].del == false)
            return (t,t1);
        
        return (institutes[instad],instcourses[instad]);
    }

    function deleteInstitute(address instad) public view return 
}