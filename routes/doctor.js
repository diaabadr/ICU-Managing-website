// var express = require("express");
// const fs=require('fs');
// const patients = require("../Models/Patient");
// const vHistory = require("../Models/visitinghistory");
// const staff=require("../Models/staff");
// const dialyDiagnosis=require("../Models/dailyDiagnosis");
// var router = express.Router();
// router.get("/",(req,res,next)=>{
//  staff.findOne({isLogged:true},(error,doctor)=>{
//      if(error)
//      {
//          console.log(error);
//      }else 
//      {
//          console.log(doctor);
//          patients.find({lastDoctor:doctor.empSSN,isExist:true},(err,result)=>{
//           if(err)
//           {
//               console.log(err);
//           }
//           else {
//               //put them in array (ssn,name,age)
//               let ax=[];
//               for(var i=0; i<result.length; i++)
//               {
//                 vHistory.findOne({pSSN:result[i].pSSN,arrivalDate:result[i].arrivalDate},(error,ress)=>{
//                   if(error){
//                       console.log(error);
//                   }
//                   else 
//                   {
//                    ax.push(ress);
//                   }
//                 });
//                dialyDiagnosis
//               }
            
//           }
//          });
//      }
//  })
//  res.render("./user/doctor");
// });
// router.post("/docInfo",(req,res,next)=>{
//  console.log(req.body);
//  console.log(req.body.pSSN);

//  console.log(typeof(req.body.blood-type));

// //  if(typeof(req.body.blood-type))
// //  {
// //      console.log("maryammmmmm");
// //  }else 
// //  {
// //      console.log("diaaaa");
// //  }
// });

// module.exports = router;
////maryam