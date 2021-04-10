        function bai1(){
             return document.getElementById('b1ketqua').innerHTML=Date();
        }

        function bai2(){
            let today = new Date();
            let result="";
            let day = today.getDate().toString();
            let month = today.getMonth().toString();
            let year = today.getFullYear();
            
            if (month.length == 1) month = "0" + month;
            if (day.length == 1) day = '0' + day;
            
            result+=month+"-"+day+"-"+year;
            // result+=month+"/"+day+"/"+year;
            // result+=day+"-"+month+"-"+year;
            // result+=day+"/"+month+"/"+year;
            return document.getElementById('b2ketqua').innerHTML=result;
        }
        

        
        function bai3(){
            let val =document.getElementById('b3text').value;
            if(val.length<=1) return false; 
            let i=0;
            let result=true;
            do{
                if(val[i]>=val[i+1] || val[i]<'0' || val[i]>'9') {
                    result= false;
                }
                i++;
            }while(i<val.length);
            return document.getElementById('b3ketqua').innerHTML=result;
        }
        function bai4(){
            let val=document.getElementById("b4text").value;
            let result ="";
            for(let i=0;i<val.length;i++){
                result+=String.fromCharCode(val.charCodeAt(i)+1);
            }
            return document.getElementById('b4ketqua').innerHTML=result;
        }
        function bai5(){
            let val=document.getElementById("b5text").value;
            let result="";
            if(val.length<3 || val.length%2==0) {
                result+="Do dai chuoi phai lon hon hoac bang ba va phai la so le!!!!";
                return document.getElementById('b5ketqua').innerHTML=result;
            }
            let avg=(val.length-1)/2;
            result+=val[avg-1];
            result+=val[avg];
            result+=val[avg+1];
            console.log(result);
            return document.getElementById('b5ketqua').innerHTML=result;
        }
        function bai6(){
            let arr=document.getElementById('b6text').value.split(",").filter(x => x>'0' && x<'9').map(x => parseInt(x));
            let result="";
            if(arr.length==0){
                result+="Khong co ki tu so";
                return document.getElementById('b6ketqua').innerHTML=result;
            }
            arr.sort();
            let count=1;
            let temp=1;
            let selectnum=arr[0];
            for(let i=0;i<arr.length ;i++){
                if(arr[i]==arr[i+1]){
                    temp++;
                }else{
                    if(temp>count) {
                        count=temp;
                        temp=0;
                        selectnum=arr[i];
                    }
                }
            }
            result+="num "+selectnum+" occurs "+count+" times";
            return document.getElementById('b6ketqua').innerHTML=result;
        }

    function bai7(){
        let val=document.getElementById('b7text').value;
        let result=val.includes("java");
        return document.getElementById('b7ketqua').innerHTML=result;
    }
    function bai8(){
        let val=document.getElementById('b8text').value;
        let result="";
        let num=parseInt(val);
        var arrthang=["Thang Mot","Thang Hai","Thang Ba","Thang Tu","Thang Nam","Thang Sau","Thang Bay","Thang Tam","Thang Chin","Thang Muoi","THang Muoi Mot","Thang Muoi Hai"];
        if(num>=1 && num<=12){
            result+=arrthang[num-1];
        }else{
            result+="Vui long nhap lai !!!";
        }
        return document.getElementById('b8ketqua').innerHTML=result;
    }
    function bai9(){
        var val=document.getElementById('b9text').value.split(",");
        if(val[0]=="") return document.getElementById('b9ketqua').innerHTML="Vui long nhap lai !!!";
        var temp=0;
        var count=0;
        var result;
        for(let i=0;i<val.length;i++){
            temp=val[i].length;
            if(temp>count) {
                count=temp;
                result=val[i];
            }
        }
        return document.getElementById('b9ketqua').innerHTML=result;
    }
    
    function bai10(){
        let val=document.getElementById('b10text').value.split(",").map(x=> parseInt(x));
        let result="";
        for(let i=val[0];i<val[1];i++){
            if(isPrimenumber(i)) result+=i+" ";
        }
        if(result.length==0) result+="Khong ton tai so nguyen to giua hai so da nhap";
        return document.getElementById('b10ketqua').innerHTML=result;
    }
        function isPrimenumber(num){
        if(num==2) return true;
        if(num<=1 || num%2==0) return false;
        for(let i=3 ;i<=Math.sqrt(num);i+=2){
            if(num%i==0) return false;
        }
        return true;
    }
