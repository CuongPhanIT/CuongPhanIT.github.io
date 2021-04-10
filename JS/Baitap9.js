var reader ="";
function load_data(){
    let table , item_list ;
    let count=1;
    table = document.getElementById("idtable");

    item_list = JSON.parse(localStorage.getItem("item_list"));
    item_list.forEach(element => {
        let row = table.insertRow(count);
        let item = JSON.parse(element);
        let img = new Image();
        img.src = item._img;
        
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        // var cell1 = row.insertCell(0);


    
        cell1.innerHTML = item._name;
        cell2.innerHTML =item._category ;
        cell3.appendChild(img);
        cell4.
    });
}


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
    let item_list=JSON.parse(localStorage.getItem("item_list"));
    if(item_list==null) {
        item_list=[];
    }
    if(check(name,category)){
        const item = {
            _name : name,
            _category   : category,
            _img : reader.result
        }
        item_list.push(JSON.stringify(item));
        localStorage.setItem("item_list",JSON.stringify(item_list));
    }
}
function check(name,category){
    var item_list ;
    var item;

    if(!(name.length == 0 && name.length > 10 && ( name >= '0' && name <= '9' ) )){
        document.getElementById("name-warning").innerHTML=null;
    }

    if(category!="Not Selected"){
        document.getElementById("category-warning").innerHTML=null;
    }

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

    item_list = JSON.parse(localStorage.getItem("item_list"));
    if(item_list!=null){
        item = item_list.map(x => JSON.parse(x)).filter(x => x._name==name);
        console.log(item);
        if(!item.toString()==""){
            document.getElementById("name-warning").innerHTML="Item has already exists";
            return false;
        }
    }


    if(category=="Not Selected"){
        document.getElementById("category-warning").innerHTML="Category is required";
        return false;
    }
    return true;
}