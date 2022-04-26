function search12(e) {
    console.log("sdada");
    var s1 = document.getElementById("search1").value;
    if (s1 === "")
        alert("wrong input")
    console.log(s1)
    document.getElementById("search1").value = ""
    event.preventDefault();

}