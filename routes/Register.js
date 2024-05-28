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


router.post('/Register/updateReferenceRegister', (req,res) => {
    try {

        console.log(req.body);

        updateData =  {
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

router.post('/Register/MapStatusReceipt', (req,res) => {

    try {


        console.log(req.body);

        updateData =  {
            "status_register"   : req.body.status_register,
            "modified_by"       : req.body.modified_by,
            "modified_date"     : req.body.modified_date
        }

        const sql = 'UPDATE register SET ? WHERE reference_no_1 = ? AND reference_no_2 = ? AND course_price'; 

        db.query(sql,[updateData, req.body.reference_no_1, req.body.reference_no_2, req.body.course_price],(error, results, fields) => {

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

router.post('/Register/MapRefAndAmount', (req,res) => {

    try {


        console.log(req.body);

        // updateData =  {
        //     "status_register"   : req.body.status_register,
        //     "modified_by"       : req.body.modified_by,
        //     "modified_date"     : req.body.modified_date
        // }

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
        SELECT A.* , B.name AS  statusRegisterName    
            FROM register AS A
            LEFT JOIN select_list AS B
            ON B.select_code = A.status_register
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

// router.route('/Register/sendMail')
// .post(async (req, res, next) => {



//     var smtp = await {
//         host: 'smtp.office365.com', //set to your host name or ip
//         port: 587, //25, 465, 587 depend on your 
//         secure: false, // use SSL\
//         auth: {
//             user: 'sawitta.sri@cra.ac.th', // your Outlook email address
//             pass: 'Jiji180939*' // your Outlook email password
//           }  
//     };

//     var smtpTransport = await nodemailer.createTransport(smtp);

    

//     let mailOptions = await {}

//     mailOptions = await {
//         from: "sawitta.sri@cra.ac.th",
//         to: req.body.mail,
//         subject: 'File Attachment Example',
//         html: `<p>ทดสอบการส่งอีเมล</p>` +
//         `<b>หมายเหตุ : </b> <span>ข้อความและ e-mail นี้เป็นการสร้างอัตโนมัติจากระบบฯ ไม่ต้องตอบกลับ </span>` ,
//     };

//     await smtpTransport.sendMail(mailOptions, function(error, response){
//         smtpTransport.close();
//         if(error){
//             console.log('sent mail follow',error);
//         //error handler
//         }else{
//         //success handler 
//         console.log('send email success');
//         }
//     });

//     return res.json('success')

// })


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
            subject: 'Test Example',
            html: `<p>ทดสอบการส่งอีเมล</p>` +
            `<b>หมายเหตุ : </b> <span>ข้อความและ e-mail นี้เป็นการสร้างอัตโนมัติจากระบบฯ ไม่ต้องตอบกลับ </span>` ,
        });
    
        res.status(200).json({ message: 'Email sent successfully' });
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
      }

});


module.exports = router;
