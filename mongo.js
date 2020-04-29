const mongoose = require('mongoose')


if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://kalpis:${password}@cluster0-utaof.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'GET and POST are the most important methods of HTTP protocol',
  date: new Date(),
  important: true,
})
/*   console.log(note)
  note.save().then(response => {
    console.log('note saved!')
    mongoose.connection.close()
  }) */
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})