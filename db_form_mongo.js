var module = require('./db_module_form');
var url = require('url');
var querystring = require('querystring');
var http = require('http');

http.createServer(function(request, response) {
var data1 = '';

request.on('data', function(chunk) {
            data1 += chunk;
        });

request.on('end', function() {
var name = querystring.parse(data1)["username"];
console.log(name);
var email = querystring.parse(data1)["email"];
console.log(email);
var mob=querystring.parse(data1)["mobile"];
console.log(mob);
var gen=querystring.parse(data1)["gender"]
var cit=querystring.parse(data1)["city"]





if (request.url === '/show') {
module.showData(name,email,mob,gen,cit ,response);
            } 
else if (request.url === '/save') {
module.saveData(name, email,mob,gen,cit, response);
            } 

else if(request.url === '/update'){
module.updateData(name, email,mob,gen,cit ,response);   
}
else if(request.url === '/delete'){
module.deleteData(name, email,mob,gen,cit, response);   
}
      });
      
    
}).listen(3000);
console.log("Server started");