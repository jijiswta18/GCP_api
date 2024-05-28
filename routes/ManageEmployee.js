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

        let sql =  "SELECT employee_id, roles FROM employee WHERE employee_id = " + `'${req.body.employee_id}'`

        db.query(sql, async function(err, result, fields){ 
            if (err) res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })

            let employee = null

            if(result){

                employee = result[0]

                let updateEmpSql =  "UPDATE employee SET ? WHERE employee_id = ?"; 

                let updateData = await {
                    "full_name"   :   req.body.full_name,
                    "mail"        :   req.body.mail,
                    "position"    :   req.body.position,

                }

                db.query(updateEmpSql, [updateData, employee.employee_id], async function (err, updateEmpResult, fields) {
   
                    let getData = {
                        "employee_id" : employee.employee_id,
                        "full_name"   : req.body.full_name,
                        "mail"        : req.body.mail,
                        "position"    : req.body.position,
                        "roles"       : employee.roles,
                    }
                    
                    return res.json({
                        code: 200,
                        message: "success",
                        result:getData
                    })

                });

                console.log('==============');
            }else{
                res.status(400).send("error : no user in the system");
            }
        })

    } catch (error) {
        console.log('getEmployee',error);
    }
});


module.exports = router;

