
 const {check,validationResult} = require("express-validator");

 exports.registerRules=()=>
    [
     check("name","Name is required").notEmpty(),
     check("LastName","lastName is required").notEmpty(),
     check("email","email is required").notEmpty().isEmail(),
     check("password","password's length between 5 and 20 charachters").isLength({min:5,max:20,}),
    ]
    
exports.validation=(req,res,next)=>{
   const  errors = validationResult(req);
   
    if (!errors.isEmpty()){
        return res.status(400).send({errors:errors.array().map((el) =>({msg : el.msg}))})
    }
    next();
};




exports.loginRules = () => 
    [ 
        check("email","email is required").notEmpty(),
        check("email","check email again").isEmail(),
        check("password","password's length between 5 and 20 charachters").isLength({
            min:5,
            max:20,
        }),
    ];
   