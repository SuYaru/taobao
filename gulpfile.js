const gulp=require('gulp');//加载gulp插件
const gulpsass=require('gulp-sass');
const html=require('gulp-minify-html');
const concat=require('gulp-concat');
const uglify=require('gulp-uglify');
const rename=require('gulp-rename');
const watch=require('gulp-watch');//添加此插件
const imagemin = require('gulp-imagemin');//图片压缩插件
const cleanCSS = require('gulp-clean-css');

//1.新建gulp任务
/* gulp.task('taskname',function(){//taskname:任务名称，如果任务名称设置为default，执行的时候，只需要gulp
	console.log('hello,gulp');
}); */

//2.将开放目录下面的文件复制到线上目录(无需插件)
//gulp.src():引入文件的目录
//gulp.dest() : 输出文件目录设置
//pipe() : 管道（流）
gulp.task('copyfile',function(){
	return gulp.src('src/*.html').pipe(gulp.dest('dist/'));
});


//3.sass编译--gulp-sass
gulp.task('runsass',function(){
	return gulp.src('src/sass/*.scss')
	.pipe(gulpsass({outputStyle:'compressed'}))//执行编译
	.pipe(gulp.dest('dist/css/'))
});

// 压缩 css 文件
gulp.task('csscompress', function() {
    // 1. 找到文件
  return  gulp.src('src/css/reset.css')
    // 2. 压缩文件
        .pipe(cleanCSS())
        // 3. 另存压缩后的文件
        .pipe(gulp.dest('dist/css/'));
});
// //4.压缩html
gulp.task('uglifyhtml',function(){
	return gulp.src('src/*.html')
	.pipe(html())//执行压缩
	.pipe(gulp.dest('dist/'));
})

// //5.合并压缩js
gulp.task('alljs',function(){
	return gulp.src('src/script/js/*.js')
	.pipe(concat('all.js'))//合并以及重命名
	.pipe(rename('all.min.js'))//重命名
	.pipe(uglify())//压缩
	.pipe(gulp.dest('dist/script/js/'));
})

// 封装第三方 插件
gulp.task('thirdjs',function(){
	return gulp.src('src/script/thirdplugins/*.js')
	/* .pipe(concat('thirdplugins.js'))//合并以及重命名
	.pipe(rename('all_thirdplugins.min.js'))//重命名 */
	.pipe(uglify())//压缩
	.pipe(gulp.dest('dist/script/thirdplugins/'));
})


// //6.图片的压缩
gulp.task('runimg',function(){
	return gulp.src('src/img/*')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/images/'));
});

// 7、字体转移/ 压缩
gulp.task('copyFonts',function(){
	return gulp.src('src/fonts/*').pipe(gulp.dest('dist/fonts/'));
});

// //最终监听的写法
// //监听需要任务执行一次之后进行操作。
gulp.task('default',function(){
	//watch的第一个参数监听的文件的路径，第二个参数是监听运行的任务名
	watch(['src/sass/*.scss','src/*.html','src/script/js/*.js','src/script/thirdplugins/*.js'],gulp.parallel('runsass','uglifyhtml','alljs','thirdjs'));
});


