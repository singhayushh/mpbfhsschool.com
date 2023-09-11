import { Types, Document } from "mongoose";

type ApplicationDto = {
    slug: string;
    year: number;
    serialNumber: number;
    for: string;
    applicant: Types.ObjectId,
    stream: string;
    optionalSubject: string;
    status: string;
    comments: { 
        from: Types.ObjectId,
        to: Types.ObjectId,
        message: string,
    }[];
    student: {
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        gender: string;
        category: string;
        aadhar: string;
        nationality: string;
        image: string;
    };
    address: {
        fullAddress: string;
        district: string;
        area: string;
        city: string;
        state: string;
        pin: number;
        residentialPhone: string;
        communicationPhone: string;
    };
    father: {
        name: string;
        personalPhone: string;
        personalEmail: string;
        qualification: string;
        degree: string;
        designation: string;
        company: string;
        companyAddress: string;
        income: string;
    };
    mother: {
        name: string;
        personalPhone: string;
        personalEmail: string;
        qualification: string;
        degree: string;
        designation: string;
        company: string;
        companyAddress: string;
        income: string;
    };
    guardian: {
        name: string;
        personalPhone: string;
        personalEmail: string;
        qualification: string;
        degree: string;
        designation: string;
        company: string;
        companyAddress: string;
        income: string;
    };
    marks: {
        subject: string;
        score: number;
    }[];
};

type ApplicationSchemaDto = ApplicationDto & Document;
type ApplicationUpdateDto = Partial<ApplicationDto>;

export { ApplicationDto, ApplicationSchemaDto, ApplicationUpdateDto };