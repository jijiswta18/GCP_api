const express       = require('express');

const router        = express.Router();

const db            = require('../config/db'); // เรียกใช้งานเชื่อมกับ MySQL

const nodemailer    = require("nodemailer");

const path          = require('path');

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
            "cancel_order"      : req.body.cancel_order,
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

                const sql_select = 'SELECT name_th, lastname_th, email, course_name, check_course_other FROM register WHERE reference_no_1 = ? AND reference_no_2 = ? AND course_price'; 

                db.query(sql_select,[reference_no_1, reference_no_2, course_price],(error, results_data, fields) => {
    
                    if (error) return res.status(500).json({
                        "status": 500,
                        "message": "Internal Server Error" // error.sqlMessage
                    })
                    
                    results_data.forEach(row => {
                       
    
                        htmlContentPayment(row.email, row.check_course_other)
    
                    });
    
                })
                // }else{
            //     console.error('Error updating record:', false);
            }

            // let countReceipt = ''
          
            const sql_count = 'SELECT COUNT(*) as SUCCESS FROM  register WHERE reference_no_1 = ? AND reference_no_2 = ? AND course_price'; 

            db.query(sql_count,[reference_no_1, reference_no_2, course_price],(error, results, fields) => {
    
                if (error) return res.status(500).json({
                    "status": 500,
                    "message": "Internal Server Error" // error.sqlMessage
                })

                // countReceipt = results
    
                return res.json(results);
    
                
    
            })

            // const result = {

            //     "status": 200,
            //     "dataReceipt" : dataReceipt,
            //     "countReceipt" : countReceipt,
            // }


            // return res.json(result);
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

        const query = `
            SELECT A.*, 
            B.name AS registerTypeName, 
            C.name AS titleName,
            D.name AS educationName,
            E.name AS jobPositionName,
            F.name AS foodAllergyName,
            G.name AS foodName,
            H.name AS statusRegisterName,
            I.name AS statusReceiptName,
            J.name AS provinceName,
            K.name AS districtName,
            L.name AS subdistrictName,
            M.name AS cancelOrderName

            FROM register AS A
            
            LEFT JOIN select_list AS B ON A.register_type = B.select_code
            LEFT JOIN select_list AS C ON A.title_name = C.select_code
            LEFT JOIN select_list AS D ON A.education = D.select_code
            LEFT JOIN select_list AS E ON A.job_position = E.select_code
            LEFT JOIN select_list AS F ON A.food_allergy = F.select_code
            LEFT JOIN select_list AS G ON A.food = G.select_code
            LEFT JOIN select_list AS H ON A.status_register = H.select_code
            LEFT JOIN select_list AS I ON A.status_receipt = I.select_code
            LEFT JOIN province AS J ON A.province_id = J.province_code
            LEFT JOIN district AS K ON A.district_id = K.district_code 
            AND K.province_code = A.province_id 
            LEFT JOIN sub_district AS L ON A.subdistrict_id = L.sub_district_code 
            AND L.province_code = A.province_id 
            AND L.district_code = A.district_id  
            AND L.sub_district_code = A.subdistrict_id
            LEFT JOIN select_list AS M ON A.cancel_order = M.select_code

            ORDER BY A.id DESC
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

router.get('/Register/statusRegisterReceipt', (req, res) => {
    try {

        const query = `
            SELECT A.*, B.name AS  statusRegisterName, C.name AS statusReceiptName
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
            SELECT A.*, 
            B.name AS registerTypeName, 
            C.name AS titleName,
            D.name AS educationName,
            E.name AS jobPositionName,
            F.name AS foodAllergyName,
            G.name AS foodName,
            H.name AS statusRegisterName,
            I.name AS statusReceiptName,
            J.name AS provinceName,
            K.name AS districtName,
            L.name AS subdistrictName,
            M.type_register, M.course_type, M.course_price, M.course_seminar, M.course_detail

            FROM register AS A
            
            LEFT JOIN select_list AS B ON A.register_type = B.select_code
            LEFT JOIN select_list AS C ON A.title_name = C.select_code
            LEFT JOIN select_list AS D ON A.education = D.select_code
            LEFT JOIN select_list AS E ON A.job_position = E.select_code
            LEFT JOIN select_list AS F ON A.food_allergy = F.select_code
            LEFT JOIN select_list AS G ON A.food = G.select_code
            LEFT JOIN select_list AS H ON A.status_register = H.select_code
            LEFT JOIN select_list AS I ON A.status_receipt = I.select_code
            LEFT JOIN province AS J ON A.province_id = J.province_code
            LEFT JOIN district AS K ON A.district_id = K.district_code 
            AND K.province_code = A.province_id 
            LEFT JOIN sub_district AS L ON A.subdistrict_id = L.sub_district_code 
            AND L.province_code = A.province_id 
            AND L.district_code = A.district_id  
            AND L.sub_district_code = A.subdistrict_id
            LEFT JOIN select_list AS M ON A.course_id = M.select_code 
                
            WHERE A.id = ? 
        `;

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
                
                <p>เรียน ผู้เข้าร่วมการอบรมทุกท่าน</p>
                <p>ตามที่ท่านได้ลงทะเบียนเข้าร่วม การอบรมหลักสูตร " แนวทางปฏิบัติการวิจัยทางคลินิกที่ดี (Good Clinical Practice: GCP)" 2567 จัดโดย งานบริหารงานวิจัยคลินิก ฝ่ายพัฒนางานวิจัยทางคลินิก นั้น</p>
                <p>กำหนดการอบรมและสถานที่อบรม</p>
                <ul>
                <li>วันที่ 24-25 กรกฏาคม 2567</li>
                <li>เวลา 08.00 – 16.00 น.</li>
                <li>สถานที่จัดอบรม: ณ ห้องพระวิษณุ ชั้น 3 โรงแรมอัศวิน แกรนด์ คอนเวนชั่น</li>
                </ul>
                <p>ตรวจสอบรายชื่อผู้เข้าร่วมการอบรมได้ที่  <a href="http://172.20.5.233:83/"></a></p>
                <p>จึงเรียนมาเพื่อโปรดทราบ และดำเนินการเข้าร่วมการอบรมตามที่ได้แจ้งไว้ ณ ที่นี้</p>
              
            </div>`,
            

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
    // query = 'SELECT * FROM register WHERE email = ? OR employee_id = ?';
    query = `

    SELECT A.id, A.register_type, A.create_date, A.name_th, A.lastname_th, A.title_name, A.title_name_other, A.email, A.employee_id, A.status_register,
    B.name AS registerTypeName, 
    C.name AS titleName,
    D.name AS statusRegisterName
    FROM register AS A
    LEFT JOIN select_list AS B ON A.register_type = B.select_code
    LEFT JOIN select_list AS C ON A.title_name = C.select_code
    LEFT JOIN select_list AS D ON A.status_register = D.select_code

    WHERE A.email = ? OR A.employee_id = ?
    `;

    

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



router.get('/Register/getMenuRegisterOpening', (req, res) => {
    
    const { phone } = req.query;
    
    const query = `
    SELECT * 
    FROM register_opening_date 
    WHERE start_date >= NOW() AND end_date <= NOW();
    
    `

    db.query(query, phone, function(error, results, fields){
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

    // const sql = `
    //     SELECT Count(*) as COUNT,
    //     IFNULL( SUM(check_course_other) , 0) AS sum_check_course_other 
    //     from register  
    //     WHERE course_id in (1,4) AND end_date >= NOW() AND create_date <= NOW()
    // `;
    const sql = `
        SELECT Count(*) as COUNT,
        IFNULL( SUM(check_course_other) , 0) AS sum_check_course_other 
        from register  
        WHERE course_id in (17001,17002) AND status_register = '11001'
    `;

   

    db.query(sql, async function (error,results,fields){

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

router.post('/Register/sendMailRegister', async (req, res) => {
    
    var smtp = {
        host: 'smtp.office365.com', //set to your host name or ip
        port: 587, //25, 465, 587 depend on your 
        secure: false, // use SSL\
        auth: {
            user: 'sawitta.sri@cra.ac.th', // your Outlook email address
            pass: 'Jiji180939*' // your Outlook email password
          }  
    };

    const register_type         = req.body.register_type
    const course_type           = req.body.course_type
    const check_course_other    = req.body.check_course_other

    let subject                 = ''

    if(course_type === 'Onsite'  && check_course_other){
        subject = 'แจ้งรายละเอียดและยืนยันการเข้าร่วม การอบรมหลักสูตร " แนวทางปฏิบัติการวิจัยทางคลินิกที่ดี (Good Clinical Practice: GCP)" 2567 และ การอบรมเชิงปฏิบัติการ หัวข้อ " Data Analysis in Clinical Research Using R Programming'
    }else if(course_type === 'Onsite' && !check_course_other){
        subject = 'แจ้งรายละเอียดและยืนยันการเข้าร่วม การอบรมหลักสูตร " แนวทางปฏิบัติการวิจัยทางคลินิกที่ดี (Good Clinical Practice: GCP)" 2567'
    }else if(course_type === 'Online'){
        subject = 'แจ้งรายละเอียดและยืนยันการเข้าร่วม การอบรมหลักสูตร " แนวทางปฏิบัติการวิจัยทางคลินิกที่ดี (Good Clinical Practice: GCP)" 2567'
    }

    // let html = htmlContent()
    
    let html = htmlContent(register_type,course_type,check_course_other)

    const Path1 = path.join(__dirname, '../uploads', 'GCP01.png');
    const Path2 = path.join(__dirname, '../uploads', 'GCP02.png');
    const filePath1 = path.resolve(Path1);
    const filePath2 = path.resolve(Path2);

    // // สร้างตัวเลือกสำหรับอีเมล
    let mailOptions = {
        from: "sawitta.sri@cra.ac.th",
        to: req.body.email,
        subject: subject,
        html: html,
        attachments: [{
            filename: 'GCP01.jpg',
            path: filePath1,
            cid: 'GCP01' // same cid value as in the html img src
        },
        {
            filename: 'GCP02.jpg',
            path: filePath2,
            cid: 'GCP02' // same cid value as in the html img src
        }]
    };

    var transporter = await nodemailer.createTransport(smtp);

    try {
        // Send email
        
        await transporter.sendMail(mailOptions);

    
        res.status(200).json({ message: 'Email sent successfully' });
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
      }

});


function htmlContent(register_type,course_type,check_course_other) {

    let htmlContent = ''

    //สำหรับบุคลากรภายใน ผู้ลงทะเบียนอบรม GCP อย่างเดียว  (Onsite)
    if(register_type === '40001' && course_type === 'Onsite' && !check_course_other){

        htmlContent = `<div class="container">     
            <p><b>เรื่อง</b> 📣 แจ้งรายละเอียดและยืนยันการเข้าร่วม การอบรมหลักสูตร " แนวทางปฏิบัติการวิจัยทางคลินิกที่ดี (Good Clinical Practice: GCP)" 2567</p>    
            <p>เรียน ผู้เข้าร่วมการอบรมทุกท่าน</p>
            <p>ตามที่ท่านได้ลงทะเบียนเข้าร่วม การอบรมหลักสูตร " แนวทางปฏิบัติการวิจัยทางคลินิกที่ดี (Good Clinical Practice: GCP)" 2567 จัดโดย งานบริหารงานวิจัยคลินิก <br>ฝ่ายพัฒนางานวิจัยทางคลินิก นั้น</p>
            <p>กำหนดการอบรมและสถานที่อบรม</p>
            <ul>
                <li>วันที่ 24-25 กรกฏาคม 2567</li>
                <li>เวลา 08.00 – 16.00 น.</li>
                <li>สถานที่จัดอบรม: ณ ห้องพระวิษณุ ชั้น 3 โรงแรมอัศวิน แกรนด์ คอนเวนชั่น</li>
            </ul>
            <p>ตรวจสอบรายชื่อผู้เข้าร่วมการอบรมได้ที่  <a href="https://registergcpcrmu.cra.ac.th">https://registergcpcrmu.cra.ac.th</a></p>
            <p>จึงเรียนมาเพื่อโปรดทราบ และดำเนินการเข้าร่วมการอบรมตามที่ได้แจ้งไว้ ณ ที่นี้</p>
            <img src="cid:GCP01" style="width: 70%;">
        
        </div>`;

    // สำหรับบุคลากรภายใน ผู้ลงทะเบียนอบรม GCP และ Data Analysis  (Onsite)
    }else if(register_type === '40001' && course_type === 'Onsite' && check_course_other){
        htmlContent = `<div class="container">
            <p><b>เรื่อง</b> 📣 แจ้งรายละเอียดและยืนยันการเข้าร่วม การอบรมหลักสูตร " แนวทางปฏิบัติการวิจัยทางคลินิกที่ดี (Good Clinical Practice: GCP)" 2567 และ การอบรมเชิงปฏิบัติการ หัวข้อ " Data Analysis in Clinical Research Using R Programming</p>        
            <p>เรียน ผู้เข้าร่วมการอบรมทุกท่าน</p>
            <p>ตามที่ท่านได้ลงทะเบียนเข้าร่วม การอบรมหลักสูตร " แนวทางปฏิบัติการวิจัยทางคลินิกที่ดี (Good Clinical Practice: GCP)" 2567 และ การอบรมเชิงปฏิบัติการ หัวข้อ " Data Analysis in Clinical Research Using R Programming จัดโดย งานบริหารงานวิจัยคลินิก ฝ่ายพัฒนางานวิจัยทางคลินิก นั้น</p>
            <p>กำหนดการอบรมและสถานที่อบรม</p>
            <ul>
                <li>วันที่ 24-26 กรกฏาคม 2567</li>
                <li>เวลา 08.00 – 16.00 น.</li>
                <li>สถานที่จัดอบรม: ณ ห้องพระวิษณุ ชั้น 3 โรงแรมอัศวิน แกรนด์ คอนเวนชั่น</li>
            </ul>

            <table border="1" style=" border-collapse: collapse; width: 70%">
                <tbody>
                    <tr>
                    <td>
                        วันที่ 24-25 กรกฏาคม 2567 
                        <br>
                        เวลา 08.00 – 16.00 น.
                    </td>
                    <td>ห้องพระวิษณุ  ชั้น 3</td>
                    </tr>
                    <tr>
                    <td>
                        วันที่ 26 กรกฏาคม 2567 
                        <br>เวลา 08.00 – 16.00 น.
                    </td>
                    <td>ห้องพระอินทร์ 1-2 ชั้น 2</td>
                    </tr>
                </tbody>
            </table>

            <p>*สำหรับการอบรมเชิงปฏิบัติการ หัวข้อ " Data Analysis in Clinical Research Using R Programming*</p>
            <p style="color:#f4742b;">ผู้เข้าร่วมกรุณาเตรียม Notebook ส่วนตัวมาเอง</p>

            <p>🔎 ตรวจสอบรายชื่อผู้เข้าร่วมการอบรมได้ที่ <a href="https://registergcpcrmu.cra.ac.th">https://registergcpcrmu.cra.ac.th</a></p>
            <p>จึงเรียนมาเพื่อโปรดทราบ และดำเนินการเข้าร่วมการอบรมตามที่ได้แจ้งไว้ ณ ที่นี้</p>
            <img src="cid:GCP01"  style="width: 70%;"><br>
            <img src="cid:GCP02"  style="width: 70%;">

        
        </div>`;

    // //สำหรับบุคลากรภายนอก ผู้ลงทะเบียนอบรม GCP อย่างเดียว  (Onsite)
    }else if(register_type === '40002' && course_type === 'Onsite' && !check_course_other){
        htmlContent = `<div class="container">
            <p><b>เรื่อง</b> 📣 แจ้งรายละเอียดและยืนยันการเข้าร่วม การอบรมหลักสูตร " แนวทางปฏิบัติการวิจัยทางคลินิกที่ดี (Good Clinical Practice: GCP)" 2567</p>         
            <p>เรียน ผู้เข้าร่วมการอบรมทุกท่าน</p>
            <p>ตามที่ท่านได้ลงทะเบียนเข้าร่วม การอบรมหลักสูตร " แนวทางปฏิบัติการวิจัยทางคลินิกที่ดี (Good Clinical Practice: GCP)" 2567 จัดโดย งานบริหารงานวิจัยคลินิก <br>ฝ่ายพัฒนางานวิจัยทางคลินิก นั้น</p>
            <p><b>กำหนดการอบรมและสถานที่อบรม</b></p>
            <ul>
            <li>วันที่ 24-25 กรกฏาคม 2567</li>
            <li>เวลา 08.00 – 16.00 น.</li>
            <li>สถานที่จัดอบรม: ณ ห้องพระวิษณุ ชั้น 3 โรงแรมอัศวิน แกรนด์ คอนเวนชั่น</li>
            </ul>

            <table border="1" style=" border-collapse: collapse; width: 70%">
            <thead>
                <tr><th colspan="2">อัตราค่าสมัครเข้าอบรม สำหรับบุคลากรภายนอก</th></tr>
            </thead>
            <tbody>
                <tr>
                <td>Onsite (รับสมัคร 80 ท่าน)</td>
                <td>Online (ไม่จำกัดจำนวน)</td>
                </tr>
                <tr>
                <td>ท่านละ 1,500 บาท<br>( รวมอาหารกลางวัน )</td>
                <td>ท่านละ 1,000 บาท</td>
                </tr>
            </tbody>
            </table style=" border-collapse: collapse; width: 70%">
            <p>🔎 ตรวจสอบรายชื่อผู้เข้าร่วมการอบรม <span style="color: #ff0000;">และพิมพ์ใบชำระค่าสมัครเข้าอบรมด้วยตนเองได้ที่</span> <a href="https://registergcpcrmu.cra.ac.th">https://registergcpcrmu.cra.ac.th</a></p>
            <p>จึงเรียนมาเพื่อโปรดทราบ และดำเนินการเข้าร่วมการอบรมตามที่ได้แจ้งไว้ ณ ที่นี้</p>
            <img src="cid:GCP01" style="width: 70%;">
        </div>`;
    // }else if(register_type === '40002' && course_type === 'Online (บุคลากรภายนอก)'){
        //สำหรับบุคลากรภายนอก ผู้ลงทะเบียนอบรม GCP อย่างเดียว  (Online)
        htmlContent = `<div class="container">
        <p><b>เรื่อง</b> 📣 แจ้งรายละเอียดและยืนยันการเข้าร่วม การอบรมหลักสูตร " แนวทางปฏิบัติการวิจัยทางคลินิกที่ดี (Good Clinical Practice: GCP)" 2567</p>         
        <p>เรียน ผู้เข้าร่วมการอบรมทุกท่าน</p>
        <p>ตามที่ท่านได้ลงทะเบียนเข้าร่วม การอบรมหลักสูตร " แนวทางปฏิบัติการวิจัยทางคลินิกที่ดี (Good Clinical Practice: GCP)" 2567 จัดโดย งานบริหารงานวิจัยคลินิก <br>ฝ่ายพัฒนางานวิจัยทางคลินิก นั้น</p>
        <table border="1" style=" border-collapse: collapse; width: 70%">
        <thead>
            <tr><th colspan="2">อัตราค่าสมัครเข้าอบรม สำหรับบุคลากรภายนอก</th></tr>
        </thead>
        <tbody>
            <tr>
            <td>Onsite (รับสมัคร 80 ท่าน)</td>
            <td>Online (ไม่จำกัดจำนวน)</td>
            </tr>
            <tr>
            <td>ท่านละ 1,500 บาท<br>( รวมอาหารกลางวัน )</td>
            <td>ท่านละ 1,000 บาท</td>
            </tr>
        </tbody>
        </table>
        <p>🔎 ตรวจสอบรายชื่อผู้เข้าร่วมการอบรม <span style="color: #ff0000;">และพิมพ์ใบชำระค่าสมัครเข้าอบรมด้วยตนเองได้ที่</span><a href="https://registergcpcrmu.cra.ac.th"> https://registergcpcrmu.cra.ac.th</a></p>
        <p>💻  อบรมออนไลน์ผ่านระบบ Microsoft Teams (โดยจะมี E-mail เชิญเข้าลิ้งค์อบรมผ่าน E-mail ที่ลงทะเบียนไว้ในระบบ)</p>
        <p>จึงเรียนมาเพื่อโปรดทราบ และดำเนินการเข้าร่วมการอบรมตามที่ได้แจ้งไว้ ณ ที่นี้</p>
        <img src="cid:GCP01"  style="width: 70%;">

        </div>`;

    }else if(register_type === '40002' && course_type === 'Onsite' && check_course_other){
    // //สำหรับบุคลากรภายนอก ผู้ลงทะเบียนอบรม GCP และ Data Analysis  (Onsite)
        htmlContent = `<div class="container">
        <p><b>เรื่อง</b> 📣 แจ้งรายละเอียดและยืนยันการเข้าร่วม การอบรมหลักสูตร " แนวทางปฏิบัติการวิจัยทางคลินิกที่ดี (Good Clinical Practice: GCP)" 2567 และ การอบรมเชิงปฏิบัติการ หัวข้อ " Data Analysis in Clinical Research Using R Programming</p>         
        <p>เรียน ผู้เข้าร่วมการอบรมทุกท่าน</p>
        <p>ตามที่ท่านได้ลงทะเบียนเข้าร่วม การอบรมหลักสูตร " แนวทางปฏิบัติการวิจัยทางคลินิกที่ดี (Good Clinical Practice: GCP)" 2567 และ การอบรมเชิงปฏิบัติการ หัวข้อ " Data Analysis in Clinical Research Using R Programming จัดโดย งานบริหารงานวิจัยคลินิก ฝ่ายพัฒนางานวิจัยทางคลินิก นั้น</p>
        <p><b>กำหนดการอบรมและสถานที่อบรม</b></p>
        <ul>
            <li>วันที่ 24-26 กรกฏาคม 2567</li>
            <li>เวลา 08.00 – 16.00 น.</li>
            <li>สถานที่จัดอบรม: ณ โรงแรมอัศวิน แกรนด์ คอนเวนชั่น</li>
        </ul>

        <table border="1" style=" border-collapse: collapse; width: 70%">
            <tbody>
                <tr>
                <td>
                    วันที่ 24-25 กรกฏาคม 2567 
                    <br>
                    เวลา 08.00 – 16.00 น.
                </td>
                <td>ห้องพระวิษณุ  ชั้น 3</td>
                </tr>
                <tr>
                <td>
                    วันที่ 26 กรกฏาคม 2567 
                    <br>เวลา 08.00 – 16.00 น.
                </td>
                <td>ห้องพระอินทร์ 1-2 ชั้น 2</td>
                </tr>
            </tbody>
        </table>
        <p>*สำหรับการอบรมเชิงปฏิบัติการ หัวข้อ " Data Analysis in Clinical Research Using R Programming*</p>
        <p style="color:#f4742b;">ผู้เข้าร่วมกรุณาเตรียม Notebook ส่วนตัวมาเอง</p>
        
        <table border="1" style=" border-collapse: collapse; width: 70%;">
            <thead>
                <tr><th colspan="2">อัตราค่าสมัครเข้าอบรม สำหรับบุคลากรภายนอก</th></tr>
            </thead>
            <tbody>
                <tr>
                <td>Onsite (รับสมัคร 80 ท่าน)</td>
                <td>Online (ไม่จำกัดจำนวน)</td>
                </tr>
                <tr>
                <td>ท่านละ 1,500 บาท<br>( รวมอาหารกลางวัน )</td>
                <td>ท่านละ 1,000 บาท</td>
                </tr>
            </tbody>
        </table>

        <p>🔎 ตรวจสอบรายชื่อผู้เข้าร่วมการอบรม <span style="color: #ff0000;">และพิมพ์ใบชำระค่าสมัครเข้าอบรมด้วยตนเองได้ที่ <a href="https://registergcpcrmu.cra.ac.th">https://registergcpcrmu.cra.ac.th</a></p>
        <p>จึงเรียนมาเพื่อโปรดทราบ และดำเนินการเข้าร่วมการอบรมตามที่ได้แจ้งไว้ ณ ที่นี้</p>
        <img src="cid:GCP01" style="width: 70%;">
        <br>
        <img src="cid:GCP02" style="width: 70%;">
    </div>`;

    }else{
        htmlContent = `<div class="container">
        <p><b>เรื่อง</b> 📣 แจ้งรายละเอียดและยืนยันการเข้าร่วม การอบรมหลักสูตร " แนวทางปฏิบัติการวิจัยทางคลินิกที่ดี (Good Clinical Practice: GCP)" 2567</p>         
        <p>เรียน ผู้เข้าร่วมการอบรมทุกท่าน</p>
        <p>  ตามที่ท่านได้ลงทะเบียนเข้าร่วม การอบรมหลักสูตร " แนวทางปฏิบัติการวิจัยทางคลินิกที่ดี (Good Clinical Practice: GCP)" 2567 จัดโดย งานบริหารงานวิจัยคลินิก ฝ่ายพัฒนางานวิจัยทางคลินิก นั้น</p>
        <table border="1" style=" border-collapse: collapse; width: 70%">
        <thead>
            <tr><th colspan="2">อัตราค่าสมัครเข้าอบรม สำหรับบุคลากรภายนอก</th></tr>
        </thead>
        <tbody>
            <tr>
            <td>Onsite (รับสมัคร 80 ท่าน)</td>
            <td>Online (ไม่จำกัดจำนวน)</td>
            </tr>
            <tr>
            <td>ท่านละ 1,500 บาท<br>( รวมอาหารกลางวัน )</td>
            <td>ท่านละ 1,000 บาท</td>
            </tr>
        </tbody>
        </table style=" border-collapse: collapse; width: 70%">
        <p>🔎 ตรวจสอบรายชื่อผู้เข้าร่วมการอบรม <span style="color: #ff0000;">และพิมพ์ใบชำระค่าสมัครเข้าอบรมด้วยตนเองได้ที่</span> <a href="https://registergcpcrmu.cra.ac.th">https://registergcpcrmu.cra.ac.th</a></p>
        <p>💻 อบรมออนไลน์ผ่านระบบ Microsoft Teams (โดยจะมี E-mail เชิญเข้าลิ้งค์อบรมผ่าน E-mail ที่ลงทะเบียนไว้ในระบบ)</p>
        <p>จึงเรียนมาเพื่อโปรดทราบ และดำเนินการเข้าร่วมการอบรมตามที่ได้แจ้งไว้ ณ ที่นี้</p>
        <img src="cid:GCP01" style="width: 70%;">
    </div>`;
    }

    return htmlContent;

}

// router.post('/Register/sendMailPayment', async (req, res) => {
    
//     var smtp = await {
//         host: 'smtp.office365.com', //set to your host name or ip
//         port: 587, //25, 465, 587 depend on your 
//         secure: false, // use SSL\
//         auth: {
//             user: 'sawitta.sri@cra.ac.th', // your Outlook email address
//             pass: 'Jiji180939*' // your Outlook email password
//           }  
//     };

//     const course_name           = req.body.course_name
//     const check_course_other    = req.body.check_course_other


//     // let html = htmlContentPayment(email, course_name, check_course_other)


//     // // สร้างตัวเลือกสำหรับอีเมล
//     let mailOptions = {
//         from: "sawitta.sri@cra.ac.th",
//         to: "sawitta.sri@cra.ac.th",
//         subject: 'Test Email with Image',
//         html: html,
//     };

//     var transporter = await nodemailer.createTransport(smtp);

//     try {
//         // Send email
        
//         await transporter.sendMail(mailOptions);

    
//         res.status(200).json({ message: 'Email sent successfully' });
//       } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ message: 'Failed to send email' });
//       }

// });


function htmlContentPayment(email, check_course_other) {

    var smtp =  {
        host: 'smtp.office365.com', //set to your host name or ip
        port: 587, //25, 465, 587 depend on your 
        secure: false, // use SSL\
        auth: {
            user: 'sawitta.sri@cra.ac.th', // your Outlook email address
            pass: 'Jiji180939*' // your Outlook email password
          }  
    };

    const register_email                 = email
    const register_check_course_other    = check_course_other
    
    let html = ''

    let subject = ''


    if(!register_check_course_other || register_check_course_other === null){

        subject = 'แจ้งผลการทำรายการชำระค่าสมัครเข้าอบรม GCP 2567 (สำเร็จ)'

        // 	สำหรับบุคลากรภายนอก ผู้ลงทะเบียนอบรม GCP และ Data Analysis  (Onsite + Online)

        html = `<div class="container">     
        <p><b>เรื่อง</b> แจ้งผลการทำรายการชำระค่าสมัครเข้าอบรม GCP 2567 (สำเร็จ)</p>    
        <p>เรียน ผู้เข้าร่วมการอบรม</p>
        <p>ท่านได้ทำรายการชำระค่าสมัครเข้าอบรม การอบรมหลักสูตร " แนวทางปฏิบัติการวิจัยทางคลินิกที่ดี (Good Clinical Practice: GCP)" 2567 เรียบร้อยแล้ว</p>
        <p>รายละเอียดของการตรวจสอบสถานะการชำระเงิน</p>
        <p>ผู้สมัครที่ทำการชำระเงิน ในระหว่างวันจันทร์ – วันพฤหัสบดี จะได้รับการยืนยันสถานะการชำระเงินในภายในวันศุกร์</p>
        <p>ผู้สมัครที่ทำการชำระเงิน ในระหว่างวันศุกร์ – วันอาทิตย์ จะได้รับการยืนยันการชำระเงินในภายในวันจันทร์</p>
        <p>สามารถตรวจสอบใบเสร็จรับเงินได้ที่ <a href="https://registergcpcrmu.cra.ac.th">https://registergcpcrmu.cra.ac.th</a></p>
        <p>สอบถามข้อมูลเพิ่มเติมได้ที่:</p>
        <p>ฝ่ายพัฒนางานวิจัยทางคลินิก งานบริหารงานวิจัยคลินิก </p>
        <p>โทร. 02-576-6000 ต่อ 6409</p>
        <p>ขอแสดงความนับถือ</p>
        <p>ฝ่ายพัฒนางานวิจัยทางคลินิก งานบริหารงานวิจัยคลินิก</p>
        </div>`;
    }else{

        subject = 'แจ้งผลการทำรายการชำระค่าสมัครเข้าอบรม GCP และ Data Analysis 2567 (สำเร็จ)'
      
          //	สำหรับบุคลากรภายนอก ผู้ลงทะเบียนอบรม GCP และ Data Analysis  (Onsite)
          
          html = `<div class="container">     
          <p><b>เรื่อง</b> แจ้งผลการทำรายการชำระค่าสมัครเข้าอบรม GCP และ Data Analysis 2567 (สำเร็จ)</p>    
          <p>เรียน ผู้เข้าร่วมการอบรม</p>
          <p>ท่านได้ทำรายการชำระค่าสมัครเข้าอบรม การอบรมหลักสูตร " แนวทางปฏิบัติการวิจัยทางคลินิกที่ดี (Good Clinical Practice: GCP)" 2567 และ การอบรมเชิงปฏิบัติการ หัวข้อ " Data Analysis in Clinical Research Using R Programming เรียบร้อยแล้ว</p>
          <p>รายละเอียดของการตรวจสอบสถานะการชำระเงิน</p>
          <p>ผู้สมัครที่ทำการชำระเงิน ในระหว่างวันจันทร์ – วันพฤหัสบดี จะได้รับการยืนยันสถานะการชำระเงินในภายในวันศุกร์</p>
          <p>ผู้สมัครที่ทำการชำระเงิน ในระหว่างวันศุกร์ – วันอาทิตย์ จะได้รับการยืนยันการชำระเงินในภายในวันจันทร์</p>
          <p>สามารถตรวจสอบใบเสร็จรับเงินได้ที่ <a href="https://registergcpcrmu.cra.ac.th">https://registergcpcrmu.cra.ac.th</a></p>
          <p>สอบถามข้อมูลเพิ่มเติมได้ที่:</p>
          <p>ฝ่ายพัฒนางานวิจัยทางคลินิก งานบริหารงานวิจัยคลินิก </p>
          <p>โทร. 02-576-6000 ต่อ 6409</p>
          <p>ขอแสดงความนับถือ</p>
          <p>ฝ่ายพัฒนางานวิจัยทางคลินิก งานบริหารงานวิจัยคลินิก</p>
      </div>`;
    }

     // // สร้างตัวเลือกสำหรับอีเมล
     let mailOptions = {
        from: "sawitta.sri@cra.ac.th",
        to: register_email,
        subject: subject,
        html: html,
    };

    var transporter = nodemailer.createTransport(smtp);

    try {
        // Send email
        
        transporter.sendMail(mailOptions);


        return 'Email sent successfully'
    
        // res.status(200).json({ message: 'Email sent successfully' });
      } catch (error) {

        return error + 'Failed to send email'
     
        // res.status(500).json({ message: 'Failed to send email' });
      }

}






module.exports = router;
