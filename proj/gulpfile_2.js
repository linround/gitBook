const gulp =  require("gulp")
const browserify = require("browserify")// 打包成浏览器可用的脚本
const source = require("vinyl-source-stream")
const terser = require("gulp-terser")// 压缩代码
const tsify = require("tsify") // 解析ts
const sourcemaps = require("gulp-sourcemaps")// 添加sourcemap文件
const buffer = require("vinyl-buffer")
const paths = {
    pages:["src/*.html"]
}

gulp.task("copy-html",function (){
    return gulp.src(paths.pages).pipe(gulp.dest("dist"))
})

gulp.task(
    "default",
    gulp.series(gulp.parallel("copy-html"),function (){
        return browserify({
            basedir:'.',
            debug:true,
            entries:["src/main.ts"],
            cache:{},
            packageCache: {}
        })
            .plugin(tsify)
            .bundle()
            .pipe(source("bundle.js"))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps:true}))
            .pipe(terser()) // terser对代码进行压缩，主要就是去掉空格，缩短命名
            .pipe(sourcemaps.write("./sourcemap/"))// 在对应文件下输出sourcemap
            .pipe(gulp.dest("dist"));
    })
)