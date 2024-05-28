const express = require('express');

const router = express.Router();

const multer  = require('multer');

const path = require('path');

const db  = require('../config/db'); // เรียกใช้งานเชื่อมกับ MySQL


// กำหนดตำแหน่งที่จะเก็บไฟล์
const uploadDir = path.join(__dirname, 'uploads');

// กำหนด options สำหรับ multer
const upload = multer({ dest: 'uploads/' });

router.put('/Receipt/uploadFile', upload.single('file'), async (req, res) => {
   
    try {
        const file = req.file;
        // อัปเดตฐานข้อมูล
        await File.update(
          { status: 'uploaded' }, // อัปเดตสถานะไฟล์เป็น 'uploaded'
          { where: { path: file.path } } // ตามเงื่อนไขที่ต้องการ ในที่นี้เป็นตาม path
        );
        res.json({ message: 'อัปโหลดไฟล์และอัปเดตสถานะเรียบร้อยแล้ว' });
      
          // ในที่นี้คุณสามารถดำเนินการกับไฟล์ที่อัปโหลดได้ตามต้องการ เช่น เก็บลงในฐานข้อมูล หรือประมวลผล
    const filePath = req.file.path;

    console.log(filePath);
    // ทำสิ่งที่ต้องการกับ filePath ต่อไปนี้

    res.status(200).json({ message: 'อัปโหลดไฟล์เรียบร้อยแล้ว', filePath });
    
    
    
    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการอัปโหลดหรืออัปเดตสถานะ' });
      }
   
   
    if (!req.file) {
        return res.status(400).json({ error: 'ไม่พบไฟล์' });
    }
    
  
});

module.exports = router;