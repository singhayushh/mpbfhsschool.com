import { Model, Schema, model } from "mongoose";
import { UserSchemaDto } from "../dto/user";
import { genSaltSync, hashSync } from "bcryptjs";

const userSchema: Schema<UserSchemaDto> = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        type: {
            type: String,
            required: true,
            enum: ["ADMIN", "PARENT"],
            default: "PARENT",
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", function (next) {
    // Check if password was modified
    if (!this.isModified("password") || !this.isNew) {
        next();
    } else this.isModified("password");

    // if password was modified then hash it using bcrypt module by salting it 10x times
    if (this.isModified("password") && this.password) {
        const salt = genSaltSync(10);
        this.password = hashSync(this.password.toString(), salt);
    }
    next();
});

const User: Model<UserSchemaDto> = model("User", userSchema);

export { User };