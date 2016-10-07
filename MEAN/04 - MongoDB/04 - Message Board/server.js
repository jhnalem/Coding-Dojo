var path       = require("path");
var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');


var CommentSchema = new mongoose.Schema({
    author: {type: String, required:true, minlength: 4},
    text: {type: String, required:true},
    _message: {type: mongoose.Schema.Types.ObjectId, ref:'Message'}
}, {timestamps: true});

var MessageSchema = new mongoose.Schema({
    author: {type: String, required:true, minlength: 4},
    text: {type: String, required:true},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true});

mongoose.connect('mongodb://localhost/messages');
mongoose.model('Comment', CommentSchema);
mongoose.model('Message', MessageSchema);

var Comment = mongoose.model('Comment');
var Message = mongoose.model('Message');


var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static('./static'));
app.use(express.static('./bower_components'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(request, response) {
    Message.find()
        .populate('comments')
        .exec(function(error, messages) {
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
            console.log(messages[0].comments);
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
            response.render('index', {messages: messages})
        });
});

app.post('/postMessage', function(request, response) {
    var message = new Message();
    message.author = request.body.name;
    message.text = request.body.message;

    message.save(function(error) {
        if( error ) {
            response.send("Something went wrong!\n" + error);
        } else {
            response.redirect('/');
        }
    });
});

app.post('/postComment/:id', function(request, response) {
    Message.findOne({_id: request.params.id}, function(err, message) {
        if( err ) { response.send('Something went wrong!\n' + err); }
        else {
            var comment = new Comment(request.body);

            comment.author = request.body.name;
            comment.text = request.body.message;
            comment._message = message._id;
            message.comments.push(comment);

            comment.save(function(error) {
                if( error ) {
                    response.send("Something went wrong!\n" + error);
                } else {
                    message.save(function(error) {
                        if( error) {
                            response.send("Something went wrong!\n" + error);
                        } else {
                            response.redirect('/');
                        }
                    });
                }
            });
        }
    });
});

app.listen(8000);
