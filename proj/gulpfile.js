const gulp = require("gulp")
const browserify = require("browserify")
const source = require("vinyl-source-stream")
const tsify  = require("tsify")
const sourcemaps = require("gulp-sourcemaps")
const buffer = require("vinyl-buffer")
const paths = {
    pages:["src/*.html"]
}
//  定义一个复制html文件的任务
gulp.task(
    "copy-html",
    function (){
        return gulp.src(paths.pages).pipe(gulp.dest("dist"))
    }
)
gulp.task(
    "default",
    gulp.series(gulp.parallel("copy-html"),function (){
        return browserify({
            basedir:".",
            debug:true,
            entries:["src/main.ts"],
            cache:{},
            packageCache: {}
        })
            .plugin(tsify)
            // 使用babelify将一些语法转为更为兼容的模式；
            // 在bundle_no_babel sayHello 函数拼接字符串的方式时es6
            // 而在 bundle_babel中，sayHello 函数拼接字符串的方式时字符串"+"号拼接
            .transform("babelify",{
                presets:["es2015"],
                extensions:[".ts"]
            })
            .bundle()
            .pipe(source(("bundle_no_babel.js")))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps:true}))
            .pipe(sourcemaps.write("./"))
            .pipe(gulp.dest("dist"))
    })
)


