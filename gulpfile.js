let project_folder = "dev";
let source_folder = "src";

let path = {
    build: {
        pug: project_folder + "/",
        sass: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/assets/images/",
        font: project_folder + "/assets/fonts/",
    },
    src: {
        pug: source_folder + "/*.html",
        sass: source_folder + "/sass/*.sass",
        js: source_folder + "/js/main.js",
        img: source_folder + "/assets/images/**/*.{jpg,png,svg,gif,ico,webp}",
        font: source_folder + "/assets/fonts/*/.ttf",
    },
    watch: {
        pug: source_folder + "/**/*.html",
        sass: source_folder + "/sass/**/*.sass",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/assets/images/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + project_folder + "/"
};

let {src,dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create();
    del = require("del");
    sass = require("gulp-sass");
    pug = require('gulp-pug');
    autoprefixer = require('gulp-autoprefixer');
    group_media = require('gulp-group-css-media-queries');
    imagemin = require('gulp-imagemin');

function  browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + '/'
        },
        port: 3000,
        notify:false
    })
}
function html(){
    return src(path.src.pug)
        /*.pipe(
            pug({
                doctype: 'html',
                pretty: false
            })
        )*/
        .pipe(dest(path.build.pug))
        .pipe(browsersync.stream())
}

function css(){
    return src(path.src.sass)
        .pipe(
            sass()
        )
        .pipe(
            group_media()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 5 versions'],
                cascade: true
            })
        )
        .pipe(dest(path.build.sass))
        .pipe(browsersync.stream())
}


function js(){
    return src(path.src.js)
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}


function images(){
    return src(path.src.img)
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false}],
                interlaced: true,
                otimizationLevel: 3
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function watchFiles(params){
    gulp.watch([path.watch.pug],html);
    gulp.watch([path.watch.sass],css);
    gulp.watch([path.watch.js],js);
    gulp.watch([path.watch.img],images);

}

function clean(params){
    return del(path.clean);
}


let build =gulp.series(clean,gulp.parallel(css,html,js,images));
let watch = gulp.parallel(build,watchFiles,browserSync);



exports.wath = watch;
exports.default = watch;
exports.build = build;
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
