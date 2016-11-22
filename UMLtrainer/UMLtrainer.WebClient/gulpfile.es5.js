/// <binding AfterBuild='build' ProjectOpened='css:watch, ts:startup' />

"use strict";

var gulp = require("gulp");
var plugins = require('gulp-load-plugins')();
var runSequence = require("run-sequence");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var tsify = require("tsify");
var merge = require("merge-stream");

/* Paths */

var extensionCss = "/**/*.css",
    extensionLess = "/**/*.less",
    extensionJs = "/**/*.js",
    extensionTs = "/**/*.ts";

var inputApp = "./App",
    inputHtml = "./",
    inpuptHtmlName = "index.html";

var outputFolder = "wwwroot",
    outputBase = "./" + outputFolder,
    outputApp = outputBase + "/app",
    outputCss = outputBase + "/css/",
    outputLib = outputBase + "/lib";

var customCssOutput = outputCss + extensionCss;

/* Config */

var tsFormatterConfig = {
    formatter: "msbuild"
},
    tsReporterConfig = {
    emitError: false,
    summarizeFailureOutput: true
};

var builder = browserify({
    basedir: "./",
    debug: true,
    entries: [inputApp + "/app.ts"],
    cache: {},
    packageCache: {},
    plugin: [tsify, watchify]
});

var bundle = function bundle(changedFiles) {
    plugins.util.log(plugins.util.colors.yellow("Starting ts build..."));

    var builderStream = builder.bundle().on('error', plugins.util.log).pipe(source('app.js')).pipe(gulp.dest(outputApp));

    if (changedFiles) {
        var lintStream = gulp.src(changedFiles).pipe(plugins.tslint(tsFormatterConfig)).pipe(plugins.tslint.report(tsReporterConfig));

        return merge(lintStream, builderStream);
    }

    return builderStream;
};

/* Main */

gulp.task("build", function () {
    return runSequence("clean", "css:less", "inject");
});

gulp.task("clean", function () {
    return gulp.src([outputCss], { read: false }).pipe(plugins.clean({ force: true }));
});

gulp.task("ts:startup", function () {
    builder.on("update", bundle);
    builder.on("log", plugins.util.log);
    bundle();
});

gulp.task("ts:build", function () {
    return bundle();
});

gulp.task("ts:lint", function () {
    return gulp.src(inputApp + extensionTs).pipe(plugins.tslint(tsFormatterConfig)).pipe(plugins.tslint.report(tsReporterConfig));
});

/* Less */

gulp.task("css:less", function () {
    return gulp.src(inputApp + extensionLess).pipe(plugins.less()).pipe(plugins.flatten())
    //.pipe(concat("bundle.css")) // for production only
    .pipe(gulp.dest(outputCss));
});

gulp.task("css:watch", function () {
    return gulp.watch(inputApp + extensionLess, ["css:less"]);
});

/* Inject */

gulp.task("inject", function () {
    return gulp.src(inputHtml + inpuptHtmlName)
    // css
    .pipe(plugins.inject(gulp.src(customCssOutput), {
        addRootSlash: false,
        ignorePath: outputFolder + "/"
    })).pipe(gulp.dest(outputBase));
});

