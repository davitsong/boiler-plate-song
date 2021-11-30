if(process.env.NODE_ENV === 'production'){                // NODE_ENV 환경변수  production이면 prod.js 에서 가져오고 dev면 dev.js에서 가져온다.
    module.exports = require('./prod')
} else {
    module.exports = require('./dev')
}
