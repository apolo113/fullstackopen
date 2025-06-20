const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://isisapolo13:${password}@cluster0.hnjlt81.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false);
mongoose.connect (url)

const pesonSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', pesonSchema);

console.log(process.argv);

if (process.argv.length > 3) {
    

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(result => {
        console.log('added', result.name, 'number', result.number, 'to phonebook');
        mongoose.connection.close();
    })

}
else if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('phonebook:');
        result.forEach(person => {
            console.log(person.name, person.number);
        })
        mongoose.connection.close();
    })
}