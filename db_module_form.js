var MongoClient=require('mongodb').MongoClient;
var url='mongodb://localhost:27017';
console.log("MongoDB");

exports.updateData=function(name, email,mob,gen,cit, response){
    MongoClient.connect(url,function(err,db){ 
        if(err) throw err;
        var dbcon=db.db('prac');
        var obj={"mobile":mob};
        var obj1={$set:{"name":name , "email":email,"gender":gen,"city":cit}};
        dbcon.collection("customer").updateOne(obj,obj1,function(err,res){
            if(err)
            {
                console.log("eror")
            }
            else{
                msg="updated successfully"
            }

            response.write(msg)
            response.end()
            db.close()
        })
    })

}

exports.saveData= function (name, email,mob, gen,cit,response) {
    
    MongoClient.connect(url,function(err,db){ //Connection to server
    if(err) throw err;
    var dbcon=db.db('prac');  //opening the db
    var msg="";
    var myobj = {"name":name , "email":email ,"mobile":mob,"gender":gen,"city":cit}; 
    dbcon.collection("customer").insertOne(myobj,function(err,res){
        if (err)
        {
            console.log(err);
            msg="Data Not inserted";
        }
        else
        {
          msg="inserted successfully"
            console.log("Document inserted");
        }
    
        response.write(msg);
        response.end();
        db.close();
    });
    
    });
        
  }; 

  exports.showData= function (name,email,mob,gen,cit,response) {
    
    MongoClient.connect(url,function(err,db){ //Connection to server
    if(err) throw err;
    var dbcon=db.db('prac');  //opening the db
    var msg="";
    var query = {"email":email};  
    console.log(query);
    dbcon.collection("customer").find({}).toArray(function(err, result) {
        if (err)
        {
            console.log(err);
            msg="Error!!!";
        }
        else
        {
            console.log(result);
     
            var Length = result.length;
            console.log("Length:"+Length);
            msg=`<html>
                <head>
                <style>
                th, td {
                    padding: 8px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                  }
                </style>
                </head>
                <table style="border-collapse: collapse;width: 100%;">
                <tr><b>
                <td>S.No</td>
                <td>Name</td>
                <td>Email</td>
                <td>Mobile.no</td>
                <td>Gender</td>
                <td>city</td>
                </tr>`
            for(var i=0; i<Length; i++)
            {
                msg+="<tr><td>"+(i+1)+"</td><td>"+result[i].name+"</td><td>"+result[i].email+"</td><td>"+result[i].mobile+"</td><td>"+result[i].gender+"</td><td>"+result[i].city+"</td></tr>";
                 
            }
            msg+="</table>";
            console.log(msg);
        }
        response.write(msg);
        response.end();
        db.close();
     
      });
      
    
    });
        
  }; 
  exports.deleteData=function (name,email,mob,gen,cit,response){
    MongoClient.connect(url,function(err,db){ 
        if(err) throw err;
        var dbcon=db.db('prac');
        
        dbcon.collection("customer").remove({"email":email},function(err,res){
            if(err)
            {
                console.log("eror")
            }
            else{
                msg="deleted"
            }

            response.write(msg)
            response.end()
            db.close()
        })
    })
    
      

  }