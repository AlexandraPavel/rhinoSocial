const mongoose = require('mongoose')
const databaseName = ""
const connect = async() => {
    try{
 await mongoose.connect(`mongodb+srv://<username>:<password>@clusterrinocer.dva9c.mongodb.net/${databaseName}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
} catch(error){
    console.log(error)
}
}
connect ()
