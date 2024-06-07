const express       = require('express');

const router        = express.Router();

const db            = require('../config/db'); // เรียกใช้งานเชื่อมกับ MySQL

const nodemailer    = require("nodemailer");

router.post('/Register/addRegister', (req,res) => {
    try {

        console.log(req.body);
        const sql = "INSERT INTO register SET ?"
        db.query(sql,req.body,(error, results, fields) => {

            console.log(error);
            
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })

            let data = [{'id':results.insertId, ...req.body}]

            const result = {
                "status": 200,
                "data":  data[0].id
            }
            console.log(result);

            return res.json(result)

        })
    } catch (error) {
        console.log('addRegister',error);
    }
})

router.post('/Register/editRegister', (req,res) => {
    try {

        const updateData =  {
            "title_name"                : req.body.title_name,
            "title_name_other"          : req.body.title_name_other,
            "name_th"                   : req.body.name_th,
            "lastname_th"               : req.body.lastname_th,
            "name_en"                   : req.body.name_en,
            "lastname_en"               : req.body.lastname_en,
            "education"                 : req.body.education,
            "receipt_name"              : req.body.receipt_name,
            "id_card_number"            : req.body.id_card_number,
            "confirm_receipt"           : req.body.confirm_receipt,
            "company_name"              : req.body.company_name,
            "company_address"           : req.body.company_address,
            "province_id"               : req.body.province_id,
            "district_id"               : req.body.district_id,
            "subdistrict_id"            : req.body.subdistrict_id,
            "postcode"                  :  req.body.postcode,
            "email"                     : req.body.email,
            "phone"                     : req.body.phone,
            "phone_other"               : req.body.phone_other,
            "employee_id"               : req.body.employee_id,
            "job_position"              : req.body.job_position,
            "job_position_other"        : req.body.job_position_other,
            "work_experience"           : req.body.work_experience,
            "food_allergy"              : req.body.food_allergy,
            "food_allergy_detail"       : req.body.food_allergy_detail,
            "food"                      : req.body.food,
            "food_other"                : req.body.food_other,
            "receipt_order"             : req.body.receipt_order, 
            "confirm_register"          : req.body.confirm_register,
            "modified_by"               : req.body.modified_by,
            "modified_date"             : req.body.modified_date,
       
        }

        const sql = 'UPDATE register SET ? WHERE id = ?';
        db.query(sql,[updateData, req.body.register_id],(error, results, fields) => {

            console.log(error);
            
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })

            const result = {
                "status": 200,
            }


            return res.json(result)

        })
    } catch (error) {
        console.log('addRegister',error);
    }
})


router.post('/Register/updateReferenceRegister', (req,res) => {
    try {

        const updateData =  {
            "reference_no_1"  : req.body.reference_no_1,
            "reference_no_2"  : req.body.reference_no_2
        }


        const sql = 'UPDATE register SET ? WHERE id = ?'; 
        db.query(sql,[updateData, req.body.id],(error, results, fields) => {

            console.log(error);
            
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })

            const result = {
                "status": 200,
            }


            return res.json(result)

        })
    } catch (error) {
        console.log('addRegister',error);
    }
})

router.post('/Register/updateStatusRegister', (req,res) => {
    try {


        updateData =  {
            "status_register"   : req.body.status_register,
            "modified_by"       : req.body.modified_by,
            "modified_date"     : req.body.modified_date
        }


        const sql = 'UPDATE register SET ? WHERE id = ?'; 
        db.query(sql,[updateData, req.body.register_id],(error, results, fields) => {

            console.log(error);
            
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })

            const result = {
                "status": 200,
            }


            return res.json(result)

        })
    } catch (error) {
        console.log('addRegister',error);
    }
})
router.post('/Register/updateStatusReceipt', (req,res) => {
    try {


        updateData =  {
            "status_receipt"   : req.body.status_receipt,
            "modified_by"       : req.body.modified_by,
            "modified_date"     : req.body.modified_date
        }


        const sql = 'UPDATE register SET ? WHERE id = ?'; 
        db.query(sql,[updateData, req.body.register_id],(error, results, fields) => {

            console.log(error);
            
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })

            const result = {
                "status": 200,
            }


            return res.json(result)

        })
    } catch (error) {
        console.log('addRegister',error);
    }
})

router.post('/Register/MapStatusReceipt', (req,res) => {

    try {


        updateData =  {
            "status_register"   : req.body.status_register,
            "modified_by"       : req.body.modified_by,
            "modified_date"     : req.body.modified_date
        }

        const sql = 'UPDATE register SET ? WHERE reference_no_1 = ? AND reference_no_2 = ? AND course_price = ? AND status_register = ?'; 

        db.query(sql,[updateData, req.body.reference_no_1, req.body.reference_no_2, req.body.course_price, '12001'],(error, results, fields) => {


            let reference_no_1 = ''
            let reference_no_2 = ''
            let course_price = ''

            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })

           

            if(results.changedRows === 1){

                reference_no_1  = req.body.reference_no_1
                reference_no_2  = req.body.reference_no_2
                course_price  = req.body.course_price

            // }else{
            //     console.error('Error updating record:', false);
            }

          

       
            const sql_count = 'SELECT COUNT(*) as SUCCESS FROM  register WHERE reference_no_1 = ? AND reference_no_2 = ? AND course_price'; 

            db.query(sql_count,[reference_no_1, reference_no_2, course_price],(error, results, fields) => {
    
                if (error) return res.status(500).json({
                    "status": 500,
                    "message": "Internal Server Error" // error.sqlMessage
                })

                
    
                return res.json(results);
    
                
    
            })

            // const result = {
            //     "status": 200,
            // }


            // return res.json(result)

        })
    } catch (error) {
        console.log('addRegister',error);
    }
})

router.post('/Register/MapRefAndAmount', (req,res) => {

    try {


        console.log(req.body);

        const sql = 'SELECT COUNT(*) as SUCCESS FROM  register WHERE reference_no_1 = ? AND reference_no_2 = ? AND course_price'; 

        db.query(sql,[req.body.reference_no_1, req.body.reference_no_2, req.body.course_price],(error, results, fields) => {

            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })

            return res.json(results);

            

        })
    } catch (error) {
        console.log('addRegister',error);
    }
})


router.get('/Register/getRegister', (req, res) => {
    try {

        // const sql = "SELECT * FROM register"
        
        const query = `
        SELECT register.*,
        (SELECT name FROM select_list WHERE select_list.select_code = register.title_name) AS titleName,
        (SELECT name FROM select_list WHERE select_list.select_code = register.education) AS educationName,
        (SELECT name FROM select_list WHERE select_list.select_code = register.job_position) AS jobPositionName,
        (SELECT name FROM select_list WHERE select_list.select_code = register.food_allergy) AS foodAllergyName, 
        (SELECT name FROM select_list WHERE select_list.select_code = register.food) AS foodName,
        (SELECT name FROM select_list WHERE select_list.select_code = register.status_register) AS statusRegisterName,
        (SELECT name FROM province WHERE province.province_code = register.province_id) AS provinceName,
        (SELECT name FROM district WHERE district.province_code = register.province_id AND district.district_code = register.district_id ) AS districtName,
        (SELECT name FROM sub_district WHERE sub_district.province_code = register.province_id AND sub_district.district_code = register.district_id AND sub_district.sub_district_code = register.subdistrict_id ) AS subdistrictName
        FROM register
    `;

        db.query(query,  function(err, result, fields){

            console.log(query);

            if (err) res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })

            res.status(200).json({
                data: result,
                message: "success"
            }); 
        })

    } catch (error) {
        console.log('getProvince',error);
    }
});
router.get('/Register/statusRegisterReceipt', (req, res) => {
    try {

        const query = `
            SELECT A.*, B.name AS  statusRegister, C.name AS statusReceipt
            FROM register AS A
            LEFT JOIN select_list AS B
            ON  A.status_register = B.select_code
            LEFT JOIN select_list AS C
            ON A.status_receipt = C.select_code
            WHERE A.status_register = '12003'
        `;

        db.query(query,  function(err, result, fields){

            if (err) res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })

            res.status(200).json({
                data: result,
                message: "success"
            }); 
        })

    } catch (error) {
        console.log('getProvince',error);
    }
});


router.get('/Register/getRegisterById/:id', (req, res) => {
    try {


        const query = `
            SELECT register.*, 
            (SELECT name FROM select_list WHERE select_list.select_code = register.register_type) AS registerTypeName,
            (SELECT name FROM select_list WHERE select_list.select_code = register.title_name) AS titleName,
            (SELECT name FROM select_list WHERE select_list.select_code = register.education) AS educationName,
            (SELECT name FROM select_list WHERE select_list.select_code = register.job_position) AS jobPositionName,
            (SELECT name FROM select_list WHERE select_list.select_code = register.food_allergy) AS foodAllergyName, 
            (SELECT name FROM select_list WHERE select_list.select_code = register.food) AS foodName,
            (SELECT name FROM select_list WHERE select_list.select_code = register.status_register) AS statusRegisterName,
            (SELECT name FROM select_list WHERE select_list.select_code = register.status_receipt) AS statusReceiptName,
            (SELECT name FROM province WHERE province.province_code = register.province_id) AS provinceName,
            (SELECT name FROM district WHERE district.province_code = register.province_id AND district.district_code = register.district_id ) AS districtName,
            (SELECT name FROM sub_district WHERE sub_district.province_code = register.province_id AND sub_district.district_code = register.district_id AND sub_district.sub_district_code = register.subdistrict_id ) AS subdistrictName

            FROM register
            WHERE register.id = ? 
        `;

        
      
        // const sql = "SELECT * FROM register WHERE id = " + `'${req.params.id}'`
        const register_id = req.params.id
  
        db.query(query, register_id, function(err, result, fields){

            console.log(err);

            if (err) res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })

            res.status(200).json({
                data: result,
                message: "success"
            }); 
        })

    } catch (error) {
        console.log('getProvince',error);
    }
});

router.post('/Register/sendMail', async (req, res) => {
    
    var smtp = await {
        host: 'smtp.office365.com', //set to your host name or ip
        port: 587, //25, 465, 587 depend on your 
        secure: false, // use SSL\
        auth: {
            user: 'sawitta.sri@cra.ac.th', // your Outlook email address
            pass: 'Jiji180939*' // your Outlook email password
          }  
    };

    var transporter = await nodemailer.createTransport(smtp);

    try {
        // Send email
        await transporter.sendMail({
            from: "sawitta.sri@cra.ac.th",
            to: req.body.mail,
            subject: 'แจ้งรายละเอียดและยืนยันการเข้าร่วม การอบรมหลักสูตร " แนวทางปฏิบัติการวิจัยทางคลินิกที่ดี (Good Clinical Practice: GCP)" 2567',
            html: `<div class="container">
                <h2>Confirmation of GCP Training Registration</h2>
                <p>Dear Participant,</p>
                <p>Thank you for registering for the "Good Clinical Practice: GCP" training course.</p>
                <p>กำหนดการอบรมและสถานที่อบรม</p>
                <ul>
                <li>วันที่ 24-25 กรกฏาคม 2567</li>
                <li>เวลา 08.00 – 16.00 น.</li>
                <li>สถานที่จัดอบรม: ณ ห้องพระวิษณุ ชั้น 3 โรงแรมอัศวิน แกรนด์ คอนเวนชั่น</li>
                </ul>
                <p>ตรวจสอบรายชื่อผู้เข้าร่วมการอบรมได้ที่  <a href="https://daa/gcp2024">here</a></p>
                <p>จึงเรียนมาเพื่อโปรดทราบ และดำเนินการเข้าร่วมการอบรมตามที่ได้แจ้งไว้ ณ ที่นี้</p>
            </div>`,
            // html: `<p>ทดสอบการส่งอีเมล</p>` +
            // `<b>หมายเหตุ : </b> <span>ข้อความและ e-mail นี้เป็นการสร้างอัตโนมัติจากระบบฯ ไม่ต้องตอบกลับ </span>` ,


        });


    
        res.status(200).json({ message: 'Email sent successfully' });
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
      }

});

router.get('/Register/checkEmail', (req, res) => {
    
    const { email } = req.query;
    let query;
    let parameters = [];

    // ตรวจสอบว่ามีการส่ง email มาหรือไม่
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    // กำหนด query ให้เป็นการค้นหาโดยใช้ email หากมี email ถูกส่งมา
    // หากไม่มี email ถูกส่งมา ให้ใช้ employee_id แทน
    query = 'SELECT * FROM register WHERE email = ? OR employee_id = ?';

    // ใส่ค่า email ลงใน parameters
    parameters.push(email);

    // ใส่ค่า email ลงใน parameters อีกครั้ง เพื่อใช้ในการค้นหาโดยใช้ employee_id ถ้ามี
    parameters.push(email);

    db.query(query, parameters, function(error, results, fields){

        console.log(results);

        if (error) {
            console.error('Error checking email:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (results.length > 0) {
                // Email หรือ Employee ID มีอยู่แล้ว
                res.json({ exists: true, message: 'Email or Employee ID already exists in the database', data: results });
            } else {
                // Email หรือ Employee ID ไม่มีอยู่ในฐานข้อมูล
                res.json({ exists: false, message: 'Email or Employee ID does not exist in the database' });
            }
        }

    });

});


router.get('/Register/checkPhone', (req, res) => {

    let query;
    let parameters = [];

    // ตรวจสอบว่ามีการส่ง email และ phone มาหรือไม่
    if (!req.query.email || !req.query.phone) {
        return res.status(400).json({ error: 'Email and phone are required' });
    }

    // กำหนด query ให้เป็นการค้นหาโดยใช้ email หากมี email ถูกส่งมา
    // หากไม่มี email ถูกส่งมา ให้ใช้ employee_id แทน
    query = `SELECT * FROM register WHERE phone = ? AND (email = ? OR employee_id = ?)`;

    // ใส่ค่า phone, email, และ email อีกครั้ง (สำหรับ employee_id) ลงใน parameters
    parameters.push(req.query.phone);
    parameters.push(req.query.email);
    parameters.push(req.query.email);

    // เรียกใช้ query ในฐานข้อมูล
    db.query(query, parameters, function(error, results, fields){

        if (error) {
            console.error('Error checking Phone:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (results.length > 0) {
              // พบข้อมูลที่ตรงกับเบอร์โทรศัพท์และอีเมล์หรือไอดีของพนักงานที่ระบุ
              res.json({ success: true, message: 'Phone already exists in the database', data: results });
            } else {
              // ไม่พบข้อมูลที่ตรงกับเบอร์โทรศัพท์และอีเมล์หรือไอดีของพนักงานที่ระบุ
              res.json({ success: false, message: 'Phone does not exist in the database' });
            }
        }

    })

});

// router.get('/Register/checkEmail', (req, res) => {
    
//     const { email } = req.query;
    

//     const sql = 'SELECT * FROM register WHERE email = ? OR employee_id= ?"';
    
//     db.query(sql, email, function(error, results, fields){

//         console.log(results);

//         if (error) {
//             console.error('Error checking email:', error);
//             res.status(500).json({ error: 'Internal server error' });
//         } else {
//             if (results.length > 0) {
//               // Email มีอยู่แล้ว
//               res.json({ exists: true, message: 'Email already exists in the database', data: results });
//             } else {
//               // Email ไม่มีอยู่ในฐานข้อมูล
//               res.json({ exists: false, message: 'Email does not exist in the database' });
//             }
//         }

//     })

// });


// router.get('/Register/checkPhone', (req, res) => {
    
//     // const { phone, email } = req.query;


//     const sql = `SELECT * FROM register WHERE phone = ? AND email = ? `;

//     db.query(sql, [req.query.phone, req.query.email], function(error, results, fields){

// console.log('===========',req.query.phone);
// console.log('===========',req.query.email);
//         if (error) {
//             console.error('Error checking Phone:', error);
//             res.status(500).json({ error: 'Internal server error' });
//         } else {
//             if (results.length > 0) {
//               // Email มีอยู่แล้ว
//               res.json({ success: true, message: 'Phone already exists in the database', data: results });
//             } else {
//               // Email ไม่มีอยู่ในฐานข้อมูล
//               res.json({ success: false, message: 'Phone does not exist in the database' });
//             }
//         }

//     })

// });

router.get('/Register/getMenuRegisterOpening', (req, res) => {
    
    const { phone } = req.query;
    
    const query = `
    SELECT * 
    FROM register_opening_date 
    WHERE start_date >= NOW() AND end_date <= NOW();
    
    `

    db.query(query, phone, function(error, results, fields){

        console.log('===========',results);

        if (error) {
            console.error('Error checking Phone:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (!results) {
              // มีอยู่แล้ว
              res.json(true);
            } else {
              //ไม่มีอยู่ในฐานข้อมูล
              res.json(false);
            }
        }

    })

});


router.get('/Register/CounterRegister', async (req, res) =>{

    const sql = `
        SELECT Count(*) as COUNT,
        IFNULL( SUM(check_course_other) , 0) AS sum_check_course_other 
        from register  
        WHERE course_id in (1,4) AND end_date >= NOW() AND create_date <= NOW() AND status_register = '12003'
    `;

    // let sql = await "SELECT Count(*) as Count, from register  WHERE course_id in (1,4)";

    db.query(sql, async function (error,results,fields){

        console.log(sql);

        if (error) return res.status(500).json({
            "status": 500,
            "message": "Internal Server Error" // error.sqlMessage
        })

        // const result = {
        //     "status": 200,
          
        // }

        return res.json(results[0])
     
        
    })
    

})



module.exports = router;
