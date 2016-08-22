var bigObj = {
    aString: "First",
    aNumber: 123,
    anArray: [1,23,45],
    aBoolean: true,
    afunction: function(){ return 5; },
    anObject: {
        x: ["Second", {a:5, b:2, c:3} ],
        y: [1, 2, 3, 4, { abc:"Third" } ]
    },
    anotherObject: {
        x: { alpha: 123, beta: [1,2,"Fourth"]},
        y: {
            abc: "one",
            def: [1,2,3,{
                strength: {
                    x: 123,
                    y: "Fifth",
                    z: function() { return "Sixth"; }
                },
            }]
        }
    },
};

var a = bigObj.aString,
    b = bigObj.anObject.x[0],
    c = bigObj.anObject.y[4].abc,
    d = bigObj.anotherObject.x.beta[2]
    e = bigObj.anotherObject.y.def[3].strength.y
    f = bigObj.anotherObject.y.def[3].strength.z();

console.log(a,b,c,d,e,f);

var users = [{
    _id: 12592879252,
    first_name: "Bill",
    last_name: "Gates",
    email: "will@gates.com"
}, {
    _id: 25864387393,
    first_name: "Steve",
    last_name: "Jobs",
    email: "steve@jobs.com"
}, {
    _id: 73627827972,
    first_name: "Steve",
    last_name: "Wozniak",
    email: "steve@wozniak.com"
}, {
    _id: 34673720692,
    first_name: "Bjarne",
    last_name: "Stroustrup",
    email: "bjarne@stroustrup"
}];

for( var i = 0; i < users.length; i++ ) {
    var user = users[i];

    console.log(user.first_name + ' ' + user.last_name);
}
