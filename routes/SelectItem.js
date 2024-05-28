const express = require('express');

const router = express.Router();

const db  = require('../config/db'); // เรียกใช้งานเชื่อมกับ MySQL


// router.get('/getSelectTitleName', (req, res) => {
//     try {

//         const sql = "SELECT id, title_th FROM title_name "

//         db.query(sql,function(err, result, fields){

//             console.log(err);
            
//             if (err) res.status(500).json({
//                 "status": 500,
//                 "message": "Internal Server Error" // error.sqlMessage
//             })

//             res.status(200).json({
//                 data: result,
//                 message: "success"
//             }); 
//         })
//     } catch (error) {
//         console.log('selectTitleName',error);
//     }
// });

// router.get('/getSelectPositionName', (req, res) => {
//     try {

//         const sql = "SELECT * FROM position_work"

//         db.query(sql,  function(err, result, fields){

//             if (err) res.status(500).json({
//                 "status": 500,
//                 "message": "Internal Server Error" // error.sqlMessage
//             })

//             res.status(200).json({
//                 data: result,
//                 message: "success"
//             }); 
//         })
//     } catch (error) {
//         console.log('getProvince',error);
//     }
// });
// router.get('/getSelectEducationName', (req, res) => {
//     try {

//         const sql = "SELECT * FROM select_education"

//         db.query(sql,  function(err, result, fields){

//             if (err) res.status(500).json({
//                 "status": 500,
//                 "message": "Internal Server Error" // error.sqlMessage
//             })

//             res.status(200).json({
//                 data: result,
//                 message: "success"
//             }); 
//         })
//     } catch (error) {
//         console.log('getProvince',error);
//     }
// });


router.get('/getSelectCourses', (req, res) => {
    try {

        const sql = "SELECT * FROM course_list"

        db.query(sql,  function(err, result, fields){

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

router.get('/getProvince', (req, res) => {
    try {

        const sql = "SELECT * FROM province"

        db.query(sql,  function(err, result, fields){

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

router.route('/getDistricts')
.get(async (req, res, next) => {

    try {

        const { provinceId } = req.query;

        const sql = await "SELECT * FROM district WHERE province_code = " + `'${provinceId}'`

        db.query(sql, async function(err, result, fields){
            
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
        console.log(error);     
    }

});

router.route('/getSubdistricts')
.get(async (req, res, next) => {

    try {

        const { provinceId , districtId } = req.query;

        const sql = 'SELECT * FROM sub_district WHERE province_code = ? AND district_code = ?';

        db.query(sql, [provinceId, districtId], async function(err, result, fields){

            console.log(result);

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
        console.log(error);     
    }

});

router.route('/getRegisterStatus')
.get(async (req, res, next) => {

    try {


        const sql = 'SELECT * FROM register_status ';

        db.query(sql, async function(err, result, fields){
            
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
        console.log(error);     
    }


});
router.route('/getSelectList')
.get(async (req, res, next) => {

    try {


        const sql = 'SELECT * FROM select_list';

        db.query(sql, async function(err, result, fields){


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
        console.log(error);     
    }

});

module.exports = router;

