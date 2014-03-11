module.exports = {
    "development": {
        "mysql" : {
            "driver":   "mysql",
            "database": "test",
            "username": "test",
            "password": "test",
        },
        "mongodb" : {
            "driver": "mongodb",
            "database": "test",
            "username": "test",
            "password": "test"
        }
    },
    "test":
    { "driver":   "memory"
    }
    , "production":
    { "driver":   "memory"
    }
};
