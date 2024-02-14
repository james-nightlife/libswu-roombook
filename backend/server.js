import express from "express";
import cors from "cors";
import CryptoJS from "crypto-js";

import { MongoClient } from "mongodb";
const mongodb_con = new MongoClient(process.env.MONGODB_URI);

var app = express();
app.use(express.json());
app.use(cors())

app.listen(9000, () => {
    console.log('Application is running on port 9000')
})

// ยืนยันตัวตน
app.post('/user/login', async (req, res, next) => {
    const data = req.body;
    try{
        const db = mongodb_con.db('libswu');
        const col = db.collection('users');
        const result = await col.findOne({
            username: data.username,
        })
        if(result){
            const decrypt = CryptoJS.AES.decrypt(result.password, 'libswu');
            const password = CryptoJS.enc.Utf8.stringify(decrypt);
                if(data.password === password){
                    res.status(200).json({
                        message: `ยินดีต้อนรับ ${result.name}`,
                        payload: {
                            user: {
                                username: result.username,
                            },
                        },
                        fullname: result.name,
                        role: result.role,
                    });
                }
                else{
                    res.status(400).json({
                        message: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง',
                    });
                }
        }else{
            res.status(400).json({
                message: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง',
            });
        }       
    }finally{

    }  
})

// รับข้อมูลผู้ใช้
app.post('/get-user', async (req, res, next) => {
    let result;
    const data = req.body;
    if(data.username){
        try{
            const db = mongodb_con.db('libswu');
            const col = db.collection('users');
            result = await col.findOne({
                username: data.username
            })    
        }finally{

        }
        if(result){
            res.json({
                status: '200',
                message: 'พบผู้ใช้งาน',
                user: {
                    username: result.username,
                    uni_id: result.uni_id,
                    name: result.name,
                    faculty: result.faculty,
                    status: result.status,
                    role: result.role,
                }
            })
        }else{
            res.json({
                status: '406',
                message: 'ไม่พบผู้ใช้งาน',
            })
        }
    }else if(data.uni_id){
        try{
            const db = mongodb_con.db('libswu');
            const col = db.collection('users');
            result = await col.findOne({
                uni_id: data.uni_id
            })    
        }finally{

        }
        if(result){
            res.json({
                status: '200',
                message: 'พบผู้ใช้งาน',
                user: {
                    username: result.username,
                    uni_id: result.uni_id,
                    name: result.name,
                    faculty: result.faculty,
                    status: result.status,
                    role: result.role,
                }
            })
        }else{
            res.json({
                status: '406',
                message: 'ไม่พบผู้ใช้งาน',
            })
        }
    }
})

app.post('/check-daily-booking-count', async (req, res, next) => {
    const data = req.body;
    const db = mongodb_con.db('libswu');
    const col = db.collection('bookings');
    if(
        data.username &&
        data.date
    ){
        const result = await col.find({
            start_time: {
                $gte: new Date(`${data.date} 00:00:00`),
                $lte: new Date(`${data.date} 23:59:59`),
            }, 
            booker: data.username
        }).toArray(); 
        if(result.length > 0){
            res.json({
                status: '200',
                message: 'ใช้สิทธิ์ครบแล้ว',
                count: result.length
            });
        }else{
            res.json({
                status: '200',
                message: 'สิทธิ์ว่าง',
                count: result.length
            });
        }
    }else{
        res.json({
            status: '406',
            message: 'ข้อมูลไม่ครบ'
        });
    }
})