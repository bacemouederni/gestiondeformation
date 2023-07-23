const db = require('../database/database')
// const { User } = require('../../models/userSchema')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('admin123', salt);

(async () => {
    console.log("=> starting init script ...");
    const countUsers = await User.countDocuments();
    if (countUsers == 0) {
        const usersToInsert = [
            {
                name: 'bacem ouederni',
                email: 'bacem ouederni@gmail.com',
                password: hash,
                role: "admin"
            },
            {
                name: 'Emna Belhaj',
                email: 'emnabelhaj98@gmail.com',
                password: hash,
                role: "admin"
            },
            {
                name: 'Hazem Kaied',
                email: 'gaiedhazem@gmail.com',
                password: hash,
                role: "admin"
            }
        ]
       
        await User.insertMany(usersToInsert);
        console.log("=> Users added successfully.");
    }
    else {
        console.log("=> Users collection not empty!!")
    }
})()
