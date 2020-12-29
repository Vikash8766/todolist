//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true,useUnifiedTopology:true})

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const itemsSchema=new mongoose.Schema({
  name:String
})

const item=mongoose.model("item",itemsSchema);

const item1=new item({name:"Buy Food"})
const item2=new item({name:"Eat Food"})
const item3=new item({name:"Cook Food"})




app.get("/", function(req, res) {

item.find({},function(err,Founditems){
  if(Founditems.length===0){
    item.insertMany([item1,item2,item3],function(err){
      if(err){
        console.log(err);
      }else{
        console.log("sucessfully saved")
      }
    })
    res.redirect("/")
    
  }else{
  
      res.render("list", {listTitle: "Today", newListItems: Founditems});

  
  }
})

});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const  items=new item({
    name:itemName
  })
  items.save();
  res.redirect("/")
  
});
app.post("/delete",function(req,res){
  const checkedItemId=req.body.checkbox;
  item.findByIdAndRemove(checkedItemId,function(err){
    if(!err){
      console.log("successfully deleted")
      res.redirect("/")
    }
  })
})

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
