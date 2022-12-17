const mysql = require('mysql')
const db = require('./../db')
var jwt = require('jsonwebtoken');
module.exports={
    get: (req, res) => {
        let sql = 'SELECT * FROM user WHERE '
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
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
        let productId = req.params.productId;
        let sql = 'UPDATE products SET ? WHERE id = ?'
        db.query(sql, [data, productId], (err, response) => {
            if (err) throw err
            res.json({message: 'Update success!'})
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