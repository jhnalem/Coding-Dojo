var path       = require("path");
var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');


var DuckSchema = new mongoose.Schema({
    name: {type: String},
    color: {type: String}
}, {timestamps: true});

mongoose.connect('mongodb://localhost/ducks');
mongoose.model('Duck', DuckSchema);

var Duck = mongoose.model('Duck');


var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, "./static")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(request, response) {
    // Displays all of the duck.
    var context = {
        ducks: []
    };

    var allDucks = [];

    Duck.find({}, function(error, ducks) {
        if( error ) {
            console.error(error);
            response.render("index");
        } else {
            context.ducks = ducks;
            response.render("index", context);
        }
    });
});


app.get('/ducks/new', function(request, response) {
    // Displays a form for making a new duck.
    response.render("new");
});


app.post('/ducks', function(request, response) {
    // Should be the action attribute for the form in the above route (GET '/duck/new').
    var duck = new Duck();
    duck.name = request.body.name;
    duck.color = request.body.color;

    duck.save(function(error) {
        if( error ) {
            // response.redirect('/duck/new');
            response.send("Something went wrong! " + error);
        } else {
            response.redirect('/');
        }
    });
});


app.get('/ducks/:id', function(request, response) {
    // Displays information about one duck.
    Duck.findOne({_id: request.params.id}, function(error, duck) {
        if( error ) {
            response.send("Something went wrong! " + error);
        } else {
            response.render('show', {duck: duck});
        }
    });
});


app.get('/ducks/:id/edit', function(request, response) {
    // Should show a form to edit an existing duck.
    Duck.findOne({_id: request.params.id}, function(error, duck) {
        if( error ) {
            response.send("Something went wrong! " + error);
        } else {
            response.render('edit', {duck: duck});
        }
    });
});


app.post('/ducks/:id', function(request, response) {
    // Should be the action attribute for the form in the above route (GET '/duck/:id/edit').

    Duck.findOne({_id: request.params.id}, function(error, duck) {
        if( error ) {
            response.send("Something went wrong! " + error);
        } else {
            duck.name = request.body.name;
            duck.color = request.body.color;
            duck.save(function(err) {
                if( err ) {
                    response.send("Something went wrong! " + err);
                } else {
                    response.redirect('/ducks/' + request.params.id + '/edit');
                }
            });

        }
    });
});


app.get('/ducks/:id/destroy', function(request, response) {
    // Should delete the duck from the database by ID.

    Duck.remove({_id: request.params.id}, function(err){
        if( err ) {
            response.send("Something went wrong! " + err);
        } else {
            response.redirect('/');
        }
    })
});


app.listen(8000);
