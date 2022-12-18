const mysql = require('mysql')
const db = require('./../db')
var jwt = require('jsonwebtoken');
module.exports = {
    get: (req, res) => {
        let data = req.body;
        let sql = `SELECT * FROM hiring-post order by update-at DESC`;
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json({ data: response[0] })
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
    },
    store: (req, res) => {
        let data = req.body;
        let token = req.headers.authorization;
        let decoded = '';
        if (token.split(" ")[1]) {
            decoded = jwt.verify(token.split(" ")[1], 'vantran');
        }
        let sql = `INSERT INTO itsangta_career.hiring_post(title,description,skills,company,location) values ('${data.title || null}','${data.description || null}','${data.skills || null}','${decoded.email|| null}','${data.location || null}')`;

        try {
            db.query(sql, null, (err, response) => {
                if (err ) {console.log(err); return;};
                res.json({data:{id:response.insertId}})
            })


        } catch (error) {
            return res.json({ data: null, error: err })
        }

    },
    delete: (req, res) => {
        let sql = 'DELETE FROM products WHERE id = ?'
        db.query(sql, [req.params.productId], (err, response) => {
            if (err) throw err
            res.json({ message: 'Delete success!' })
        })
    }
}