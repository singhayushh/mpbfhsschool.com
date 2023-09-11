import mongoose from "mongoose";

const isValidConnectionURI = (connectionURI: string): boolean => {
    if (
        connectionURI.substring(0, 14) !== "mongodb+srv://" &&
        connectionURI.substring(0, 10) !== "mongodb://"
    )
        return false;
    return true;
};

const ConnectDB = async (connectionURI: string): Promise<typeof mongoose> => {
    if (!isValidConnectionURI(connectionURI)) 
        throw new Error ("Invalid DB URI");
    mongoose.set("strictQuery", false);
    return mongoose.connect(connectionURI);
};

export { ConnectDB };
