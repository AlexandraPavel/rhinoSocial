const mongoose = require('mongoose')
const databaseName = 'Rinocer'
const connect = async() => {
    try{
 await mongoose.connect(`mongodb+srv://rinocer:portocaliu@clusterrinocer.dva9c.mongodb.net/${databaseName}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
} catch(error){
    console.log(error)
}
}
connect ()