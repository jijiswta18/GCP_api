const express = require('express');

const router = express.Router();

const db  = require('../config/db'); // เรียกใช้งานเชื่อมกับ MySQL

router.post('/ManageEmployee/createEmployee', (req, res) => {

    try {
        let sql = "INSERT INTO employee SET ?"
        db.query(sql,req.body,(error,results,fields) => {

            console.log(error);

            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })


            let data = [{'id':results.insertId, ...data}]
            const result = {
                "status": 200,
                "data": data.id
            }

            return res.json(result)
        })
    } catch (error) {
        console.log('createEmployee',error);
    }
});

router.post('/ManageEmployee/updateEmployee', (req,res) => {
    try {

        console.log(req.body);

        let sql =  "SELECT employee_id, role_id , role.* FROM employee left join role on employee.role_id = role.id  WHERE employee_id = " + `'${req.body.employee_id}'`

        db.query(sql, async function(err, result, fields){ 
            if (err) res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })
            console.log(result);

            let employee = null

            if(result){

                employee = result

                

                let updateEmpSql =  "UPDATE employee SET ? WHERE employee_id = ?"; 

                let updateData = await {
                    "full_name"   :   req.body.full_name,
                    "mail"        :   req.body.mail,
                    "position"    :   req.body.position,

                }

                db.query(updateEmpSql, [updateData, employee[0].employee_id], async function (err, updateEmpResult, fields) {
   
                    let getData = {
                        "employee_id"               : employee[0].employee_id,
                        "full_name"                 : req.body.full_name,
                        "mail"                      : req.body.mail,
                        "position"                  : req.body.position,
                        "role_id"                   : employee[0].role_id,
                        "role_name"                 : employee[0].role_name,
                        "cancel_register"           : employee[0].cancel_register == '1'? true:false,
                        "cancel_receipt"            : employee[0].cancel_receipt== '1'? true:false,
                        "upload_receipt"            : employee[0].upload_receipt== '1'? true:false,
                        "check_register"            : employee[0].check_register== '1'? true:false,
                        "check_register_receipt"    : employee[0].check_register_receipt== '1'? true:false,
                        "check_register_admin"      : employee[0].check_register_admin== '1'? true:false,
                        "approve_receipt"           : employee[0].approve_receipt== '1'? true:false,
                        "approve_employee"          : employee[0].approve_employee== '1'? true:false,
                        "edit_receipt"              : employee[0].edit_receipt== '1'? true:false,
                        "refund_receipt"            : employee[0].refund_receipt== '1'? true:false,
                        "receive_receipt"           : employee[0].receive_receipt== '1'? true:false,
                        "preview_receipt"           : employee[0].preview_receipt== '1'? true:false,
                        "menu_register"             : employee[0].menu_register== '1'? true:false,
                        
                    }
                    
                    return res.json({
                        code: 200,
                        message: "success",
                        result:getData
                    })

                });

                console.log('==============');
            }else{

             
                return res.json({
                    code: 400,
                    message: "error : no user in the system",
                })
            }
        })

    } catch (error) {
        console.log('getEmployee',error);
    }
});


module.exports = router;

