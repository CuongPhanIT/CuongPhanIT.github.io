var reader ="";
var table = document.getElementById("idtable").getElementsByTagName("tbody")[0];
function load_data(){
    let  item_list ;
    let count=1;
    item_list = JSON.parse(localStorage.getItem("item_list"));
   
   
    item_list.forEach(element => {
        let item = JSON.parse(element);
        addrow(item,count);
        count++;
    });


}
function addrow(item , count){
    let row = table.insertRow(count);
    let btnedit =document.createElement("button");
    let btndelete = document.createElement("button");
    let btnsave = document.createElement("button");
    let txtname = document.createElement("input");
    let cbb = document.createElement("select");

        //image
        let img = new Image();
        img.src = item._img;
        img.width=200;
        img.height=100;
       
        //button edit
        btnedit.className ="btn btn-primary";
        btnedit.innerHTML="EDIT";
        btnedit.id="btnedit"+count;
        btnedit.onclick = item_edit;        


        //button save
        btnsave.className = "btn btn-success";
        btnsave.innerHTML = "SAVE";
        btnsave.id="btnsave"+count;
        btnsave.hidden = true;
        btnsave.onclick = item_save;

        //button delete
        btndelete.className = "btn btn-danger";
        btndelete.innerHTML="DELETE";
        btndelete.id="btndelete"+count;
        btndelete.onclick =item_delete;

        //input name
        txtname.setAttribute("type","text");
        txtname.readOnly=true;
        txtname.setAttribute("value",item._name);
        txtname.id="txtname"+count;

        //combobox
        var array = ["Not Selected","Category1","Category2","Category3"];
        cbb.id="idcbb";
        for (let i = 0; i < array.length; i++) {
            let option = document.createElement("option");
            option.value = array[i];
            option.text = array[i];
            cbb.add(option);
        }
        cbb.value=item._category;
        cbb.disabled = true;
        cbb.id = "cbb"+count;



        var cell0 = row.insertCell(0)
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);

        cell0.innerHTML = count;
        cell1.appendChild(txtname);
        cell2.appendChild(cbb);
        cell3.appendChild(img);
        cell4.id="idcell4_"+count;
        cell4.appendChild(btnedit);
        cell4.appendChild(btndelete);
        cell4.appendChild(btnsave);
        

}
function item_edit(){
    let index = this.id.replace("btnedit","");
    let id_btnsave = "btnsave"+index;
    let cell4 = document.getElementById("idcell4_"+index);
    let btnsave = document.getElementById(id_btnsave);
    let txtname = document.getElementById("txtname"+index);
    let cbb = document.getElementById("cbb"+index);
    
    cell4.replaceChild(btnsave,cell4.childNodes[0]);
    btnsave.hidden=false;
    txtname.readOnly = false;
    cbb.disabled=false;
}

function item_save(){
    let index = this.id.replace("btnsave","");
    let id_btnedit = "btnedit"+index;
    let cell4 = document.getElementById("idcell4_"+index);
    let btnedit = document.getElementById(id_btnedit);
    let txtname = document.getElementById("txtname"+index);
    let cbb = document.getElementById("cbb"+index);
    
    cell4.replaceChild(btnedit,cell4.childNodes[0]);
    btnsave.hidden=false;
    txtname.readOnly = false;
    cbb.disabled=false;
}

function readURL(input) {
    let img=document.getElementById("idimg");
        if (input.files && input.files[0]) {
            reader = new FileReader();
            reader.onload = function (e) {
                img.src=e.target.result;
                img.width=150;
                img.height=100;
            };
            reader.readAsDataURL(input.files[0]);
        }
}


function submit(){
    let name=document.getElementById("txtname").value;
    let category=document.getElementById("categories").value;
    let item_list=JSON.parse(localStorage.getItem("item_list"));
    let count;
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
        count=item_list.length;
        addrow(item , count);
    }

}

function item_delete(){
    let item_list=JSON.parse(localStorage.getItem("item_list"));
    let index;
    let indexrow= this.id.replace("btndelete","");
    let row = table.rows[indexrow];
    let itemname = row.cells[1].childNodes[0].value;

    //delete table 
    table.deleteRow(indexrow);

    //delete in local storage
    for(let i =0 ;i < item_list.length ;i++){
        let item = JSON.parse(item_list[i]);
        if(itemname === item._name) {
            index=item_list.indexOf(item);
            item_list.splice(index,1);
            break;
        }
    }
    //update local storage
    localStorage.setItem("item_list",JSON.stringify(item_list));
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