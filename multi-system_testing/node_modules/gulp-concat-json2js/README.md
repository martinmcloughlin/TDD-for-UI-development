Concat JavaScript files from JSON Arrays
========================================

This is a simple tool for gulp that will convert a json file with an array of file names into a single concatinated file.

Multiple json files will result in multiple js files.

```
var concat = require('concat-json2js');

gulp.src('path/to/js/**.json')
	.pipe(concat-json2js())
	.pipe(gulp.dest('public/js'));
```

main.json
```
[
	"file1.js",
	"file2.js",
	"file3.js"
]
```

This will generate a main.js file containing file1.js, file2.js and file3.js in that order.

License
----------

gulp-concat-json2js is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)