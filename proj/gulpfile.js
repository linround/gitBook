const gulp = require('gulp')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const tsify = require('tsify')
const paths = {
    pages:["src/*.html"]
}

// 这就是一个复制html的任务
gulp.task("copy-html", function () {
    return gulp.src(paths.pages).pipe(gulp.dest("dist"));
});

gulp.task(
    "default",
    gulp.series(
        gulp.parallel("copy-html"),function () { //
        return browserify({ // 为使用tsify 插件而调用  browserify，而不是gulp=typescript
            basedir:".",
            debug:true,// 开启源映射可以在浏览器中调试typescript代码，而不是javascript代码
            entries:["src/main.ts"],
            cache:{},
            packageCache:{}
        })
            .plugin(tsify) // tsify 是一个 Browserify 插件，与 gulp-typescript 一样，可以访问 TypeScript 编译器
            .bundle()
            .pipe(source("bundle.js")) //命名输出的包
            .pipe(gulp.dest("dist")) // 最终输出到dist文件
    }))



