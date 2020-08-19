const mongoose = require('mongoose');

module.exports = {
    init: () => {
        mongoose.connect("mongodb+srv://chihab:openmind@openmind.i4ts5.mongodb.net/Data?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }) .then(() => { console.log("Connected to the Mongodb database.");
    }) .catch(err => { console.error("Unable to connect to the Mongodb database. Error:" + err);});
}
    }
