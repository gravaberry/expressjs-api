
const express = require('express');
const router = express.Router();



// /npm install express-validator
const { body, validationResult } =  require('express-validator');

//import database
const connection = require('../config/database')

router.get('/', (request, response) =>{

    //query
    connection.query('select * from posts ORDER BY id desc ', function (err, rows){
        if(err){
            return response.status(500).json({
                status: false,
                message: 'Intenal server error',
            })
        }else{
            return response.status(200).json({
                status:true,
                message: 'List Data Posts',
                data:rows
            })
        }
    })
    
})


// Store Post
router.post('/store',[
    // validation
    body('title').notEmpty(),
    body('content').notEmpty()
], (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            errors:errors.array(),
        })
    }
    //define formdata
    let formData = {
        title : req.body.title,
        content: req.body.content
    }
    connection.query('insert into posts set?', formData, function (err, rows){
        if(err){
            return res.status(500).json({
                status:false,
                message: 'Internal Server Error',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Insert successfully',
                data: rows[0]
            })
        }
    })
})


// show detail data 

router.get('/:id', function (req, res) {
    let id = req.params.id

    connection.query(`select * from posts where id =${id}`, function (err, rows){
        if(err){
            return res.status(500).json({
                status:false,
                message: 'Internal Server Error',
            })
        }

        if(rows.length <= 0){
            return res.status(404).json({
                status:true,
                message:'Data post not found',
            })
        }
        else{
            return res.status(200).json({
                status:true,
                message: 'Details Data Post',
                data:rows[0]
            })
        }
    })
})

// update data ke data base
router.patch('/update/:id', [

    //validation
    body('title').notEmpty(),
    body('content').notEmpty()

], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //id post
    let id = req.params.id;

    //data post
    let formData = {
        title: req.body.title,
        content: req.body.content
    }

    // update query
    connection.query(`UPDATE posts SET ? WHERE id = ${id}`, formData, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Update Data Successfully!'
            })
        }
    })

})


router.delete('/delete/:id', (req, res) => {
    let id= req.params.id
    connection.query(`DELETE from posts where id = ${id}`, function(err,rows){
        if(err){
            return res.status(500).json({
                status:false,
                message: "internal server error",
            })
        }
        else 
        {
            return res.status(200).json({
                status:true,
                message:"Delete post successfully"
            })
        }
    })
})

module.exports = router;


// npm install express-validator