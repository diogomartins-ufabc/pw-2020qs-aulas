
// Mongoshell script to create an empty profiles db

db = connect('127.0.0.1:27017/associated-consulting');
db.dropDatabase();
db = connect('127.0.0.1:27017/associated-consulting');
db.createCollection('profiles');
db.profiles.createIndex({'id': 1}, {unique: true});
db.createCollection('sequences');
db.sequences.insertOne({
    name: 'profile_id',
    value: 1
});
db.profiles.insertOne({
    "id": 1,
    "name": "joao silva",
    "birthyear": 1992,
    "career": "professional surfing",
    "bio": "<b>Joao Silva</b> is one the top surfers in Brazil.",
    "picture": "profile_1.jpg",
})
db.profiles.insertOne({
    "id": 2,
    "name": "maria santos",
    "birthyear": 1987,
    "career": "customer relationship management",
    "bio": "<em>Maria Santos</em> is a workaholic who loves cats.", 
    "picture": "profile_2.jpg"
})
db.createCollection('admins');
 db.admins.createIndex({'id': 1}, {unique: true});
 db.admins.createIndex({'email': 1}, {unique: true});
 db.admins.insertOne({
     id: 1,
     email: 'admin@email.com',
     name: 'Super Admin',
    //  password: 'admin123'
    password: '$2b$10$THQ1IzZ2pfh5zwaq/31nzeKCEHDwSnhhtMOrLFBQEYQWOyTAjyY/6'
 });






