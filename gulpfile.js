const dev = require('./build/gulp.dev')
const prod = require('./build/gulp.prod')
process.env.NODE_ENV === "development" ? dev() : prod()