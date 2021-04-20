var reader ="";
var table = document.getElementById("idtable").getElementsByTagName("tbody")[0];
var item_list;
var current_id;
function load_data(){
    let count=1;
    item_list = JSON.parse(localStorage.getItem("item_list"));
   
   if(item_list != null){
        item_list.forEach(element => {
            let item = JSON.parse(element);
            addrow(item,count);
            count++;
        });
    }

}
function addrow(item , count){
    let row = table.insertRow(count);
    let btnedit =document.createElement("button");
    let btndelete = document.createElement("button");
    let btnsave = document.createElement("button");
    let txtname = document.createElement("input");
    let cbb = document.createElement("select");
    let btnchooseimg = document.createElement("input");
    let hidden = document.createElement("input");
    
    
    //hidden input for item_id    
        hidden.setAttribute("type","hidden");
        hidden.id=item._id;


        //image
        let img = new Image();
        img.src = item._img;
        img.width=200;
        img.height=100;
        img.id = "img"+item._id;

        //button choose file
        btnchooseimg.setAttribute("type","file");
        btnchooseimg.hidden = true;
        btnchooseimg.id = "btnchooseimg"+item._id;
        btnchooseimg.addEventListener('change',function(){
            readURL(this);
        })
       
        //button edit
        btnedit.className ="btn btn-primary";
        btnedit.innerHTML="EDIT";
        btnedit.id="btnedit"+item._id;
        btnedit.onclick = item_edit;        


        //button save
        btnsave.className = "btn btn-success";
        btnsave.innerHTML = "SAVE";
        btnsave.id="btnsave"+item._id;
        btnsave.hidden = true;
        btnsave.onclick = item_save;

        //button delete
        btndelete.className = "btn btn-danger";
        btndelete.innerHTML="DELETE";
        btndelete.id="btndelete"+item._id;
        btndelete.onclick =item_delete;

        //input name
        txtname.setAttribute("type","text");
        txtname.readOnly=true;
        txtname.setAttribute("value",item._name);
        txtname.id="txtname"+item._id;

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
        cbb.id = "cbb"+item._id;



        var cell0 = row.insertCell(0)
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);


        cell0.innerHTML = count;
        cell0.appendChild(hidden);
        cell1.appendChild(txtname);
        cell2.appendChild(cbb);
        cell3.appendChild(img);
        cell3.appendChild(btnchooseimg);
        cell4.id="idcell4_"+count;
        cell4.appendChild(btnedit);
        cell4.appendChild(btndelete);
        cell4.appendChild(btnsave);
        

}
function checkImage(filename){
    let accept = ["jpg","png","jpeg"];
    let imgext = filename.split(".").pop();
    return accept.includes(imgext);
}

function readURL(input) {
    let idimg
    if( !checkImage(input.value) ) {
        document.getElementById("img-warning").innerHTML = "File extention is not compatible"
    }else{
        document.getElementById("img-warning").innerHTML = "";
    }
    if(input.id !=null) idimg = "img"+input.id.replace("btnchooseimg","");
    let img=document.getElementById(idimg);
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
    let txtname=document.getElementById("txtname");
    let category=document.getElementById("categories");
    let item_list=JSON.parse(localStorage.getItem("item_list"));
    let img = document.getElementById("img0");
    current_id = localStorage.getItem("current_id");
    let count;
    if(item_list==null ) item_list=[];
    if(current_id ==null) current_id = 1;
    if(check(txtname.value.trim(),category.value)){
        const item = {
            _id : current_id++ ,
            _name : txtname.value.trim(),
            _category   : category.value,
            _img : reader.result
        }
        item_list.push(JSON.stringify(item));
        localStorage.setItem("current_id",current_id);
        localStorage.setItem("item_list",JSON.stringify(item_list));
        count=item_list.length;
        addrow(item , count);
        reader.result = null;
        txtname.value = "";
        category.value="Not Selected";
        img.src = "#";
    }

}

function check(name,category,img){
    let item_list ;
    let item;
    let check=true;
    

    if(name.length ==0){
        document.getElementById("name-warning").innerHTML="Name is required";
        check =false;
    }
    if(name.length>10){
        document.getElementById("name-warning").innerHTML="Length must not be greater than 10";
        check =  false;
    }
    if(name>='0' && name<='9') {
        document.getElementById("name-warning").innerHTML="Must start with a letter";
        check =  false;
    }

    item_list = JSON.parse(localStorage.getItem("item_list"));
    if(item_list!=null){
        item = item_list.map(x => JSON.parse(x)).filter(x => x._name==name);
        if(!item.toString()==""){
            document.getElementById("name-warning").innerHTML="Item has already exists";
            check = false;
        }
    }
    if(category=="Not Selected"){
        document.getElementById("category-warning").innerHTML="Category is required";
        check = false;
    }

    if(!(name.length==0 || name.length > 10 || ( name[0] >= '0' && name[0] <= '9' ) )){
        document.getElementById("name-warning").innerHTML=null;
    }

    if(category!="Not Selected"){
        document.getElementById("category-warning").innerHTML=null;
    }
    return check;
}

function item_edit(){
    let item_id =this.id.replace("btnedit","");
    let cell4 = this.parentNode;
    let id_btnsave = "btnsave"+item_id;
    let btnsave = document.getElementById(id_btnsave);
    let txtname = document.getElementById("txtname"+item_id);
    let cbb = document.getElementById("cbb"+item_id);
    let btnchooseimg = cell4.parentNode.cells[3].childNodes[1];


    cell4.insertBefore(btnsave ,this);
    btnsave.hidden = false;
    this.hidden = true;
    txtname.readOnly = false;
    cbb.disabled = false;
    btnchooseimg.hidden = false;
}

function item_save(){
    item_list=JSON.parse(localStorage.getItem("item_list"));
    let item_id = this.id.replace("btnsave","");
    let btnedit = document.getElementById("btnedit"+item_id);
    let txtname = document.getElementById("txtname"+item_id);
    let cbb = document.getElementById("cbb"+item_id);
    let btnchooseimg = document.getElementById("btnchooseimg"+item_id);
    
    
    this.hidden=true;
    btnedit.hidden = false;
    txtname.readOnly = true;
    cbb.disabled=true;

    for(let i =0 ;i<item_list.length ;i++){
        let item = JSON.parse(item_list[i]);
        if(item_id == item._id){
            item._name = txtname.value;
            item._category = cbb.value;
            if(reader.result != null) item._img = reader.result;
            item_list.splice(i,1,JSON.stringify(item));
            break;
        }
    }
    localStorage.setItem("item_list",JSON.stringify(item_list));
    reader.result =null ;
    btnchooseimg.hidden = true;
}

function item_delete(){
    item_list=JSON.parse(localStorage.getItem("item_list"));
    let item_id =this.id.replace("btndelete","");
    let index_row = this.parentNode.parentNode.rowIndex-1;


    for(let i =index_row +1;i <table.rows.length ;i++){
        table.rows[i].cells[0].childNodes[0].nodeValue-=1;
    }

    table.deleteRow(index_row);

    for(let i =0 ;i < item_list.length ;i++){
        let item = JSON.parse(item_list[i]);
        if(item_id == item._id) {
            item_list.splice(i,1);
            break;
        }
    }
    //update local storage
    localStorage.setItem("item_list",JSON.stringify(item_list));
}


