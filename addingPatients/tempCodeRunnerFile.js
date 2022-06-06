diag.deleteMany({}, (error, res) => {
  console.log(res);
});
Messages.deleteMany({}, (error, res) => {
  console.log(res);
});
Patient.deleteMany({}, (error, res) => {
  console.log(res);
});
Visit.deleteMany({}, (error, res) => {
  console.log(res);
});
rooms.updateMany({isBusy:true},{$set:{isBusy:false}},(error,res)=>{})
