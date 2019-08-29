import {Document, Schema, Model, model} from "mongoose"
import mongoose from "mongoose"
import bcrypt from 'bcryptjs'

export interface UserDoc extends Document {
    nickname: string;
    avatar: string;
    mobile: string;
    password: string;
    createAt: String;
    contacts: string[];
    comparePassword: comparePasswordFunction;
}

export const UserSchema: Schema = new Schema({
    nickname: {
        type: String,
        required: true,
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
    createAt: {
        type: String,
        required: true,
    },
    contacts: { 
        type: Array
    },
})

UserSchema.pre("save", function save(next) {
    const user = this as UserDoc;
    if (!user.isModified("password")) { return next(); }
    bcrypt.genSalt(10, (err: any, salt: any) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash: any) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;


// const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
//     let that: any = this;
//     bcrypt.compare(candidatePassword, that.password, (err: mongoose.Error, isMatch: boolean) => {
//         cb(err, isMatch);
//     });
// };

UserSchema.methods = {
    comparePassword: function (candidatePassword: string, cb: Function) {
        bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
            cb(err, isMatch)
        })
    }
}

export const User = mongoose.model<UserDoc>("User", UserSchema);