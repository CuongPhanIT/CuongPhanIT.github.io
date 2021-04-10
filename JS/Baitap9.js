var reader ="";
function readURL(input) {
    console.log(input);
            if (input.files && input.files[0]) {
                reader = new FileReader();

                reader.onload = function (e) {
                    $("#idimg")
                        .attr('src', e.target.result)
                        .width(150)
                        .height(100);
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
function submit(){
    let name=document.getElementById("txtname").value;
    let category=document.getElementById("categories").value;
    localStorage.setItem("3","adasdasdasdasda");
    if(check(name,category)){
        const item = {
            _name : name,
            _category : category,
        }
        localStorage.setItem(name,JSON.stringify(item));
    }
}
function check(name,category){
    if(name.length ==0){
        document.getElementById("name-warning").innerHTML="Name is required";
        return false;
    }
    if(name.length>10){
        document.getElementById("name-warning").innerHTML="Length must be less than 10";
        return false;
    }
    if(name>='0' && name<='9') {
        document.getElementById("name-warning").innerHTML="Must start with a character";
        return false;
    }
    if(category=="Not Selected"){
        document.getElementById("category-warning").innerHTML="Category is required";
        return false;
    }
    return true;
}