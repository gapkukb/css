const src = '.'
const dist = './dist'
const config = {
    devPrefixUrl: 'http://www.baidu.com',
    buildPrefixUrl: 'http://www.google.com',
    src,
    dist,
    html: {
        src: src + '/*.html',
        dist: dist
    },
    css: {
        engin: 'stylus',
        watch:src + '/stylus/*',
        src: src + '/stylus/index.styl',
        dist: dist,
        exclude:['test'],
        merge: true,
        mergeName: 'gm.min.css',
        compress: true,
        autoprefixer:{browsers: ['last 2 versions','ie >=10','ios 8']}
    },
    js: {
        src: src + '/js/**/*.js',
        dist: dist + '/js',
        compress: false,
        exclude: ['zepto.js']
    },
    images: {
        src: src + '/images/**/*.*',
        dist: dist + '/images',
    },
    copy: {
        src: [src + '/font/*'],
        dist
    }
}


module.exports = config