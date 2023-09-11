import { Model, Schema, model } from "mongoose";
import { ApplicationSchemaDto } from "../dto/application";

const applicationSchema: Schema<ApplicationSchemaDto> = new Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        year: {
            type: Number,
            required: true,
        },
        serialNumber: {
            type: Number,
            default: 0,
        },
        for: {
            type: String,
            required: true,
            enum: ["LKG", "KG", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "XI"]
        },
        applicant: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        stream: String,
        optionalSubject: String,
        status: {
            type: String,
            enum: ["AWAITING_PAYMENT", "SUBMITTED", "UNDER_REVIEW", "INCOMPLETE", "ON_HOLD", "ACCEPTED", "REJECTED", "INTERVIEW_SCHEDULED", "INTERVIEW_COMPLETE", "ENROLLED"],
            default: "INCOMPLETE"
        },
        comments: [{
            from: Schema.Types.ObjectId,
            to: Schema.Types.ObjectId,
            message: String,
        }],
        student: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
            dateOfBirth: {
                type: String,
                required: true,
            },
            gender: {
                type: String,
                required: true,
                enum: ["BOY", "GIRL"]
            },
            category: {
                type: String,
                required: true,
                enum: ["SC", "ST", "OBC", "GENERAL"]
            },
            aadhar: String,
            nationality: {
                type: String,
                required: true,
            },
            image: String,
        },
        address: {
            fullAddress: {
                type: String,
                required: true,
            },
            district: {
                type: String,
                required: true,
            },
            area: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            pin: {
                type: String,
                required: true,
            },
            residentialPhone: {
                type: String,
                required: true,
            },
            communicationPhone: {
                type: String,
                required: true,
            }
        },
        father: {
            name: String,
            personalPhone: String,
            personalEmail: String,
            qualification: {
                type: String,
                enum: ["POSTGRADUATE", "UNDERGRADUATE", "HIGH_SCHOOL", "DIPLOMA", "VOCATIONAL",  "OTHER"]
            },
            degree: String,
            designation: String,
            company: String,
            companyAddress: String,
            income: String,
        },
        mother: {
            name: String,
            personalPhone: String,
            personalEmail: String,
            qualification: {
                type: String,
                enum: ["POSTGRADUATE", "UNDERGRADUATE", "HIGH_SCHOOL", "DIPLOMA", "VOCATIONAL",  "OTHER"]
            },
            degree: String,
            designation: String,
            company: String,
            companyAddress: String,
            income: String,
        },
        guardian: {
            name: String,
            personalPhone: String,
            personalEmail: String,
            qualification: {
                type: String,
                enum: ["POSTGRADUATE", "UNDERGRADUATE", "HIGH_SCHOOL", "DIPLOMA", "VOCATIONAL",  "OTHER"]
            },
            degree: String,
            designation: String,
            company: String,
            companyAddress: String,
            income: String,
        },
        marks: [
            {
                subject: String,
                score: Number
            }
        ]
    },
    {
        timestamps: true,
    }
);

const counterSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    seq: {
        type: Number,
        default: 1,
    },
});

const Counter = model('Counter', counterSchema);

applicationSchema.pre('save', function(next) {
    if(!this.isNew) next();
    var doc = this;
    Counter.findByIdAndUpdate({_id: `${new Date().getFullYear()}`}, {$inc: { seq: 1} }, {new: true, upsert: true}, function(error, counter)   {
        if(error)
            return next(error);
        doc.serialNumber = counter ? counter.seq : 1;
        doc.slug = `${doc.year}-${String(doc.serialNumber).padStart(4, '0')}`
        next();
    });
});

const Application: Model<ApplicationSchemaDto> = model("Application", applicationSchema);

export { Application };