var MongoClient = require('mongodb');
var connectionUrl="mongodb://localhost:27017/bookstore";
//var collectionName="book_users";
var bookDAL = {};

bookDAL.userLogin = function (empId,password) {
    
    console.log("in login DAL")

    return MongoClient.connect(connectionUrl)
            .then(function (client){
                var collection = client.collection("book_users");

                return collection.find({"empId":empId,"password":password}).toArray()
                        .then(function(response){
                            if(response.length==1){
                                client.close();
                                console.log("correct credentials")
                                console.log(response)
                                return "Login Successful";
                            }
                            else {
                                var err= new Error();
                                err.status=404;
                                err.message="Login failed!"
                                throw err
                            }
                        });
            });
}



bookDAL.signupUser = function (credentials){
    console.log("in dal signup")
    return MongoClient.connect(connectionUrl)
            .then(function(client){
                var collect = client.collection("book_users");
                return collect.insert(credentials)
                    .then(function(res,err){
                        if(err){
                            throw new Error("couldn't sign you up!!!")
                        }else{
                        console.log("data>>>>"+res.insertedCount)
                        client.close()
                        return true;
                        }
                    })
            })
}

bookDAL.getBooks = function(type){
    console.log("in getbooks of dal"+type)
    return MongoClient.connect(connectionUrl)
            .then(function(client){
                var collect=client.collection(type);
                return collect.find().toArray()
                    .then(function(res,err){
                        if(err){
                            throw new Error("something is wrong!!")
                        }
                        else{
                            // console.log("books here are"+res)
                            return res
                        }
                    })
            })
}

module.exports=bookDAL;