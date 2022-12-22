const config = {
    local: {
        DB: {
            HOST: "localhost",
            PORT: "27017",
            DATABASE: "pratikshaladke",
            MONGOOSE: {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            },
            username: "pratikshaladke",
            password: "pratikshaladke45"
        },
        PORTNO: 8085,
    },
    
    staging: {
        DB: {
            HOST: "172.10.1.3",
            PORT: "27017",
            DATABASE: "pratikshaladke",
            MONGOOSE: {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            },
            username: "pratikshaladke",
            password: "pratikshaladke45"
        },

        email: {
            host: "smtp.gmail.com",
            port: 465,
            user: "pratikshaladke56@gmail.com",
            pass: "keddsrwusdefrnvg"
        },

        PORTNO: 2000,
    }
}

export const get = function get(env) {
    return config[env];
}