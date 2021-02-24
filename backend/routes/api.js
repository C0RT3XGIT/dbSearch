const express = require('express');

const app = express()
const router = express.Router();
const DBSchema = require('../models/model');

router.get('/', (req, res) => {
    DBSchema.find({}).then((data) => {
        res.json(data)    
    }).catch((error) => {
        console.log('error:',error)
    })
})

router.get('/save', (req, res) => {
    let data = {
        Name: 'Test save',
    }
    console.log(data)

    const newRecord = DBSchema(data)
    newRecord.save((error) => {
        if (error) {
            res.status(500).json({ msg: "There was an problem while saving data" });
            return;
        }
        return res.json({msg: 'Your data has been saved'})
    })

}) 

module.exports = router;