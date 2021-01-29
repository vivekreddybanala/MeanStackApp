const express = require('express');
const port = 4000;
const app = express();
var cors = require('cors');

app.use(cors())

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const mongoose = require("mongoose");
var uri = "mongodb://localhost:27017/meanstackapp";

const employees = require('./models/job');

app.get('/employee', (req, res) => {
    employees.find({}, (err, data) => {
        if(err) {
            res.send({
                status: 'err',
                message: err
            })
        }
        res.send(data);
    });
});

app.get('/employee/:id', (req, res) => {
    employees.find({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.send({
                status: 'err',
                message: err
            })
        }
        console.log(data);
        res.send(data);
    });
});

app.post('/employee', (req, res) => {
    const employee = new employees(req.body);
    employees.find().sort({ _id: -1 }).limit(1).exec((err, data) => {
        if (err) {
            res.send({
                status: 'err',
                message: err
            })
        }
        if(data[0]){
            employee._id = Number(data[0]['_id']) + 1;

        } else {
            employee._id = 0;
        }
        employees.insertMany(employee, (err, data) => {
            if (err) {
                res.send({
                    status: 'err',
                    message: err
                })
            }
            res.send({ status: 'ok' });
        });
    });
});

app.post('/update/:id', (req, res) => {
    const ID = { _id: req.params.id };
    const setValue = { $set: req.body };
    employees.update(ID, setValue, ((err, data) => {
        if (err) {
            res.send({
                status: 'err',
                message: err
            })
        }
        res.send({ status: 'ok' })
    }));
});

app.get('/delete/:id', (req, res) => {
    const ID = { _id: req.params.id };
    const deleteValue = { _id: ID };
    employees.deleteOne(deleteValue, ((err, data) => {
        if (err) {
            res.send({
                status: 'err',
                message: err
            })
        }
        res.send({ status: 'ok' })
    }));
});


mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function () {
    console.log('MongoDB database connection established successfully');
});

app.listen(port, function () {
    console.log("Server is running on Port: " + port);
});

module.exports = app;