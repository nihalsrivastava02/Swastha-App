let express = require('express');
let Router = express.Router();
let _ = require('lodash');

let manufactureInvoke = require('../blockchain_network/Manufacture/invoke');



Router.post('/manufacture_generate_po', (req, res) => {
    let manufacture_id = req.id;
    let body = _.pick(req.body, ['po_no', 'vendor_id', 'Material', 'expectedDate', 'totalAmt']);
    body["date"] = Date.now();
    body["timeline"] = []
    body.timeline.push({msg : "Purchase Order Created", date : Date.now(), updated_by : manufacture_id});
    body["created_by"] = manufacture_id;
    body["docType"] = "manufacture_po"
    manufactureInvoke.manufacture_generate_po(body, manufacture_id).then((result) => {
        res.status(200).json({msg: result}).end();
    }).catch(err => {
        res.status(500).json({msg: err}).end();
    });
});




module.exports = Router;