const { src, dest, parallel, series, watch } = require("gulp");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const sass = require("gulp-sass")(require("sass"));
const fileInclude = require("gulp-file-include");
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
const imagecomp = require("compress-images");
const del = require("del");

function browsersync() {
    browserSync.init({
        // Инициализация Browsersync
        server: { baseDir: "app/" }, // Указываем папку сервера
        notify: false, // Отключаем уведомления
        online: true, // Режим работы: true или false
    });
}

function fileinclude() {
    return src(["app/html/index.min.html"])
        .pipe(
            fileInclude({
                prefix: "@@",
                basepath: "@file",
            })
        )
        .pipe(concat("index.html"))
        .pipe(dest("app/"))
        .pipe(browserSync.stream());
}

function scripts() {
    return (
        src([
            // Берем файлы из источников
            // 'node_modules/jquery/dist/jquery.min.js', // Пример подключения библиотеки
            // "node_modules/nouislider/dist/nouislider.min.js",
            "app/**/*.js",
            // "!app/**/*.min.js", // Пользовательские скрипты, использующие библиотеку, должны быть подключены в конце
        ])
            // .pipe(concat("app.min.js")) // Конкатенируем в один файл
            // .pipe(uglify()) // Сжимаем JavaScript
            // .pipe(dest("app/js/")) // Выгружаем готовый файл в папку назначения
            .pipe(browserSync.stream())
    ); // Триггерим Browsersync для обновления страницы
}

function startwatch() {
    // Выбираем все файлы JS в проекте, а затем исключим с суффиксом .min.js
    watch(["app/**/*.js", "!app/**/*.min.js"], scripts);
    watch("app/**/*.scss", styles);
    watch("app/html/*.html", fileinclude);
    watch("app/index.html").on("change", browserSync.reload);
    watch("app/img/src/**/*", images);
}

function styles() {
    return (
        src("app/scss/main.scss") // Берем файлы из источников
            .pipe(eval(sass)())
            .pipe(concat("app.css")) // Конкатенируем в файл app.css
            // .pipe(concat("app.min.css")) // Конкатенируем в файл app.min.css
            .pipe(autoprefixer({ overrideBrowserslist: ["last 10 versions"], grid: true })) // Создадим префиксы с помощью Autoprefixer
            // .pipe(cleancss({ level: { 1: { specialComments: 0 } } /* , format: 'beautify' */ })) // Минифицируем стили
            .pipe(dest("app/css/")) // Выгрузим результат в папку "app/css/"
            .pipe(browserSync.stream())
    ); // Сделаем инъекцию в браузер
}

async function images() {
    imagecomp(
        "app/img/**/*", // Берём все изображения из папки источника
        "app/img/dest/", // Выгружаем оптимизированные изображения в папку назначения
        { compress_force: false, statistic: true, autoupdate: true },
        false, // Настраиваем основные параметры
        { jpg: { engine: "mozjpeg", command: ["-quality", "75"] } }, // Сжимаем и оптимизируем изображеня
        { png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
        function (err, completed) {
            // Обновляем страницу по завершению
            if (completed === true) {
                browserSync.reload();
            }
        }
    );
}

function cleanimg() {
    return del("app/img/dest/**/*", { force: true }); // Удаляем все содержимое папки "app/images/dest/"
}

// function buildcopy() {
//     return src([ // Выбираем нужные файлы
//         'app/css/**/*.min.css',
//         'app/js/**/*.min.js',
//         'app/img/**/*',
//         'app/**/*.html',
//     ], { base: 'app' }) // Параметр "base" сохраняет структуру проекта при копировании
//         .pipe(dest('dist')) // Выгружаем в папку с финальной сборкой
// }

// function cleandist() {
//     return del('dist/**/*', { force: true }) // Удаляем все содержимое папки "dist/"
// }

exports.browsersync = browsersync;
exports.fileinclude = fileinclude;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;
// exports.cleandist = cleandist;
exports.default = parallel(styles, scripts, browsersync, startwatch, fileinclude);
// exports.build = series(cleandist, styles, scripts, images, buildcopy);
