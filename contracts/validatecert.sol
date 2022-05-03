pragma solidity >=0.7.0 <0.9.0;

contract certman{

    address admin;

    constructor() public {
        admin=msg.sender;
    }

    struct institute {
        string name;
        string acr;
        string link;
        string[] course;
        bool del;
    }

    mapping(address=>institute) institutes;
    address[] InstAddressList;
    uint instcnt = 0;

    function addInstitute(address instad,string memory _name,string memory _acr,string memory _link,string[] memory _course) public{
        if(msg.sender != admin)
            return ;

        institutes[instad] = institute(_name,_acr,_link,_course,false);
        InstAddressList.push(instad);
        instcnt = instcnt + 1;
    }

    function viewInstitute(address instad) public view returns (institute memory i)
    {
        string[] memory es;
        institute memory t = institute("invalid","inv","null",es,false);

        if(msg.sender != admin)
            return t;
        
        if(institutes[instad].del == true)
            return t;

        return (institutes[instad]);
    }

    function updateInstitute(address instad,string memory _name,string memory _acr,string memory _link,string[] memory _course) public {
        if(institutes[msg.sender].del == true)
            return;

        institutes[instad].name = _name;
        institutes[instad].acr = _acr;
        institutes[instad].link = _link;

        delete institutes[instad];
        for(uint i=0;i<_course.length;i++)
            institutes[instad].course.push(_course[i]);   
    } 
    
    function deleteInstitute(address instad) public {
        if(msg.sender != admin)
            return;
        institutes[instad].del = true;
        instcnt = instcnt - 1;
    }

    function viewAllInstitutes() public view returns (institute[] memory)  {
        
        institute[] memory ans = new institute[](instcnt);
        // if(msg.sender != admin)
        //     return ans;
        uint j = 0;
        for(uint i=0;i<InstAddressList.length;i++)
        {
            if(institutes[InstAddressList[i]].del == false)
            {
                ans[j] = institutes[InstAddressList[i]];
                j = j  +1 ;
            }
        }
        return ans;
    }

    mapping(address=>string) students;
    address[] StudAddressList;
    uint studcnt = 0;    

    function addStudent(address studad,string memory _name) public{
        students[studad] = _name;
    }

    struct certificate{
        address stud;
        address inst;
        string course;
        int duration;  
        bool del; 
    }   

    mapping(address=>certificate) certificates;
    address[] certAddressList;

    function issueCertificate(address certad,address instad,address studad,string memory _course,int dur) public
    {
        if(institutes[instad].del == true)
            return;
        if(institutes[msg.sender].del == true)
            return;
        certificates[certad] = certificate(instad,studad,_course,dur,false);
        certAddressList.push(certad);
    }

    function revCertificate(address certad) public
    {
        if(institutes[msg.sender].del == true)
            return;
        if(institutes[certificates[certad].inst].del == true)
            return;

        certificates[certad].del = true;
    }

    function viewCertificate(address certad) public view returns (certificate memory){
        return certificates[certad];
    }
    function viewStudCert(address studad) public view returns (uint cnt,certificate[] memory){
        uint cnt = 0;
        for(uint i=0;i<certAddressList.length;i++)
        {
            if(certificates[certAddressList[i]].del  == false)
            {
                if(certificates[certAddressList[i]].stud == studad)
                {
                    if(institutes[certificates[certAddressList[i]].inst].del == false)
                        cnt = cnt + 1;
                }
            }
        }

        certificate[] memory ans = new certificate[](cnt);
        uint j = 0;
        for(uint i=0;i<cnt;i++)
        {
            if(certificates[certAddressList[i]].del  == false)
            {
                if(certificates[certAddressList[i]].stud == studad)
                {
                    if(institutes[certificates[certAddressList[i]].inst].del == false)
                    {
                            ans[j] = certificates[certAddressList[i]];
                            j = j + 1;
                    }
                }
            }         
        }
        return (cnt,ans);
    }

}   