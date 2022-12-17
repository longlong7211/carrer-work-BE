const mysql = require('mysql')
const db = require('./../db')
var jwt = require('jsonwebtoken');
module.exports={
    get: (req, res) => {
        let data=req.body;
        let sql = `SELECT * FROM user WHERE email='${data.email}' and password='${data.password}'`;
        db.query(sql, (err, response) => {
            if (err) throw err
            console.log(response[0].email)
            res.json({jwt:jwt.sign({ email: response[0].email }, 'vantran'),userInfor:response[0]})
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM products WHERE id = ?'
        db.query(sql, [req.params.productId], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let id = req.params.userId;
        let sql = 'UPDATE user SET ? WHERE id = ?'
        console.log(req.headers.authorization);
        db.query(sql, [data, id], (err, response) => {
            if (err) throw err
            let query=`select * from user where id=${id}`
            db.query(query,null,(err,response)=>{
                res.json({userInfor:response[0]});
            })
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql=`INSERT INTO itsangta_career.user (email,password,role) value('${data.email}','${data.password}',${data.role})`;
        let checkUser=`select * from user where email='${data.email}'`

        try {
            db.query(checkUser,null,(err,response)=>{

                if (response.length>0){
                    return res.json({data:null,error:{code:-1,des:'user already'}})
                }else{
                    db.query(sql,null,(err,response)=>{
                        if (err) throw err
                        let token = jwt.sign({ email: data.email }, 'vantran');
                        res.json({data:{jwt:token}})
                    }) 
                }
            })

            
        } catch (error) {
            return res.json({data:null,error:err})
        }
         
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM products WHERE id = ?'
        db.query(sql, [req.params.productId], (err, response) => {
            if (err) throw err
            res.json({message: 'Delete success!'})
        })
    }
}