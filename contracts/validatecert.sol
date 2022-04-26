pragma solidity >=0.7.0 <0.9.0;

contract validatecert{

    struct cert
    {
        string name;
        string course;
        uint duration;
    }

    struct college{
        string name;
        uint id;
        address[] certs;
    }


    mapping(address=>cert) certificates;
    mapping(address=>bool) college_add;
    mapping(address=>college) colleges;
    mapping(address=>bool) certificate_add;


    address owner;
    uint cid = 0;
    uint gcertid = 0;

    constructor() public {
        owner=msg.sender;
    }

    event id(uint clgid);
    event certificateid(address certificate_id);

    function addCollege(address add,string memory name)  public  returns (uint){
        if(msg.sender != owner)
            return 0;
        address[] memory ea;
        colleges[add]  =  college(name,cid,ea);
        cid = cid + 1;
        college_add[add] = true;
        emit id(cid-1);
        return cid - 1;
    }
    
    function checkcoll(address col) view public returns (string memory,uint){
        return (colleges[col].name,colleges[col].id);
    }

    function addcert(address inst,string memory name,string memory course,uint duration,address ceid)   public {
        if(college_add[inst] == false)
            return;
        certificates[ceid] = cert(name,course,duration);
        colleges[inst].certs.push(ceid);
        certificate_add[ceid] = true;
        emit certificateid(ceid);
    }

    function viewcert(address certid) view public returns(string memory name,string memory course,uint dur){
        string memory s = "invalid";
        if(certificate_add[certid] != true)
            return (s,s,0);
        return (certificates[certid].name,certificates[certid].course,certificates[certid].duration);
    }
    
}