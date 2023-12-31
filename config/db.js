import mongoose from "mongoose"

const conectarDb = async () => {
    try {
        const connection = await mongoose.connect(
            process.env.MONGO_URI,
            {

                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        const url = `${connection.connection.host}: ${connection.connection.port}`;
        console.log(`Mongoose Conectado en: ${url}`);

    } catch (error) {
        console.error(`error:{error.message} `)
        process.exit(1)

    }
}

export default conectarDb;