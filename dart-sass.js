import sass from "sass";
import fs from "fs";
import chokidar from "chokidar";

console.log(process.cwd());

function build() {
  console.log('Building CSS');
  sass.render(
    {
      file: `${process.cwd()}/src/styles.scss`,
      outFile: `${process.cwd()}/build/styles.css`,
      sourceMap: true,
      sourceMapContents: true,
      outputStyle: "compressed",
    },
    function(error, result) {
      if (!error) {
        fs.writeFile("./build/styles.css", result.css, function(err) {
          if (!err) {
            console.log('CSS written...');
            //file written on disk
          } else {
            console.log(err);
          }
        });

        fs.writeFile("./build/styles.css.map", result.map, function(err) {
          if (!err) {
            console.log('CSS Map written...');
            //file written on disk
          } else {
            console.log(err);
          }
        });
      } else {
        console.log(error);
      }
    }
  );
}


//watch it?
if (process.argv.includes("--watch")) {
  //chokidar will watch theme files for changes to trigger rebuild
  // const watcher = chokidar.watch(["js/**/*.js", "css/**/*.scss", "**/*.php"]);
  const watcher = chokidar.watch(["src/**/*.scss"]);
  console.log("Watching SCSS files... \n");

  //first build
  build();
  //build on changes
  watcher.on("change", () => {
    build();
  });
} else {

  build();
}
