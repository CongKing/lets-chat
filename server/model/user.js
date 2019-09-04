const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const SALT_FACTOR = 5;

const UserSchema = new Schema({
    nickname: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    contacts: { 
        type: Array
    },
    meta:{
        createdAt:{
            type:Date,
            default:Date.now()
        },updateAt:{
            type:Date,
            default:Date.now()
        }
    }
})

// save 前处理
UserSchema.pre("save", function save(next) {
    const user = this

    // 更新修改时间
    if(user.isNew) {
        user.meta.createAt = new Date()
    } else {
        user.meta.updateAt = Date.now()
    }
    
    // 密码修改
    if (!user.isModified("password")) { return next() }
    
    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) { return next(err) }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) { return next(err) }
            user.password = hash
            next()
        });
    });
});

// 静态方法
UserSchema.methods = {
    comparePassword: function (candidatePassword) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
                if(err) {
                    reject(err)
                    return
                }
                resolve(isMatch)
            })
        })
    }
}

module.exports = mongoose.model('User', UserSchema)