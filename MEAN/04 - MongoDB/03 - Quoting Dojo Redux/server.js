var path       = require("path");
var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');


var QuoteSchema = new mongoose.Schema({
    author: {type: String},
    text: {type: String},
    likes: {type: Number}
}, {timestamps: true});

mongoose.connect('mongodb://localhost/quotes')
mongoose.model('Quote', QuoteSchema);

var Quote = mongoose.model('Quote');


var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static('./static'));
app.use(express.static('./bower_components'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(request, response) {

    return response.render('index');
});

app.get('/quotes', function(request, response) {
    Quote.find({}, null, {sort:'-likes'}, function(error, results) {
        if( error ) { console.error( error ); }

        return response.render('quotes', {quotes: results});
    });
});

app.post('/quotes', function(request, response) {
    var post = request.body;

    var quote = new Quote();
    quote.author = post.name;
    quote.text = post.quote;
    quote.likes = 1;

    quote.save(function(error) {
        if( error ) {
            response.send("Something went wrong!\n" + error);
        } else {
            response.redirect('/quotes');
        }
    });
});

app.get('/quotes/:id/like', function(request, response) {
    Quote.findOneAndUpdate({_id: request.params.id}, {$inc: {likes:1}})
        .exec(function(error, quote) {
            if( error ) { console.error(error); }

            return response.redirect('/quotes');
        });
});

app.listen(8000);
