pragma solidity >=0.7.0 <0.9.0;

contract UMS {
    address owner;

    constructor()
    {
        owner = msg.sender;
    }
    struct Student {
        uint age;
        string fName;
        string lName;
        uint attendance;
        uint[] courseid;
        mapping(uint => uint) marks;
    }

    struct Professor {
        string fName;
        string lName;       
        uint[] courseid;
    }

    struct Course {
        string title;
        uint duration;       
        uint[] enrolled;
        uint[] prof;
        uint[] exams;
    }

    struct Exam {
        uint courseid;
        uint maxmarks;
        string date;
    }
    
    mapping (uint => Student) studentList;
    mapping(address => bool) studad;
    uint[] public studIdList;
    
    mapping (uint => Professor) professorList;
    mapping(address => bool) profad;
    uint[] public profIdlist;

    mapping (uint => Course) courseList;
    uint[] public courseIdList;

    mapping (uint => Exam) examList;
    uint[] public examIdList;
    
    function createStudent(uint _studId, uint _age, string memory _fName, string memory _lName,address _st)  public {
        
        if(msg.sender != owner)
            return; 
        uint[] memory ea;
        Student storage student = studentList[_studId];
    
        student.age = _age;
        student.fName = _fName;
        student.lName = _lName;
        student.attendance = 0;
        student.courseid = ea;
        studIdList.push(_studId);
        studad[_st] = true;
    }

    function createExam(uint _profid, uint _courseid, uint _examid ,uint marks, string memory date)  public {
        
        if(profad[msg.sender] == false)
            return;
        uint flag = 0;
        for(uint i=0;i<courseList[_courseid].prof.length;i++)
        {
            if(courseList[_courseid].prof[i] == _profid)
                flag = 1;
        }
        if(flag == 0)
            return;
        
        Exam memory exam;
        exam.courseid = _courseid;
        exam.maxmarks = marks;
        exam.date = date;

        examIdList.push(_examid);
        examList[_examid] = exam;

        courseList[_courseid].exams.push(_examid);
    }

    function createProfessor(uint _profId, string memory _fName, string memory _lName,address _pr)  public {

       if(msg.sender != owner)
            return; 
        uint[] memory ea;
        Professor memory prof;
    
        prof.fName = _fName;
        prof.lName = _lName;
        prof.courseid = ea;

        profIdlist.push(_profId);
        professorList[_profId] = prof;
        profad[_pr] = true;
    }

    function createCourse(uint _courseId,string memory _title,uint _duration )  public {
       if(msg.sender != owner)
            return;         
        uint[] memory ea;
        Course memory course;
    
        course.title = _title;
        course.duration = _duration;
        course.enrolled = ea;
        course.prof = ea;
        course.exams = ea;
        courseIdList.push(_courseId);
        courseList[_courseId] = course;

    }
    
    function incrementAttendance(uint _studId)  public {
        if(studad[msg.sender] == false)
            return; 
        studentList[_studId].attendance = studentList[_studId].attendance+1;
    }
    
    function getStudents() view public returns(uint[] memory ) {
        return studIdList;
    }
    
    function getParticularStudent(uint _studId) public view returns (string memory , string memory , uint, uint,uint[] memory) {
        return (studentList[_studId].fName, studentList[_studId].lName, studentList[_studId].age, studentList[_studId].attendance,studentList[_studId].courseid);
    }


    function getProfessors() view public returns(uint[] memory ) {
        return profIdlist;
    }
    
    function getParticularProfessor(uint _profId) public view returns (string memory , string memory , uint[] memory) {
        return (professorList[_profId].fName, professorList[_profId].lName, professorList[_profId].courseid);
    }


    function getCourses() view public returns(uint[] memory ) {
        return courseIdList;
    }
    
    function getParticularCourse(uint _courseId) public view returns (string memory , uint , uint[] memory,uint[] memory) {
        return (courseList[_courseId].title, courseList[_courseId].duration, courseList[_courseId].enrolled, courseList[_courseId].prof);
    }

    function enrollStud(uint _studid, uint _courseId) public {
       if(msg.sender != owner)
            return; 
        studentList[_studid].courseid.push(_courseId);
        courseList[_courseId].enrolled.push(_studid);
    } 

    function assignProf(uint _profid, uint _courseId) public {
       if(msg.sender != owner)
            return; 
        professorList[_profid].courseid.push(_courseId);
        courseList[_courseId].prof.push(_profid);
    } 
    function addMarks(uint _studid, uint _examid,uint _marks) public 
    {
       if(profad[msg.sender] == false)
            return; 
        studentList[_studid].marks[_examid] = _marks;
    } 
    function getmarks(uint _studid, uint _examid) public view returns (uint){
        if(studad[msg.sender] == false)
            return 0;
        return studentList[_studid].marks[_examid]; 
    }

}
