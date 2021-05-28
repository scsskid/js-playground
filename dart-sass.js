import sass from "sass";
import fs from "fs";

// const chokidar = require("chokidar");

console.log(process.cwd());

sass.render(
  {
    file: `${process.cwd()}/src/styles.scss`,
    outFile: `${process.cwd()}/foo/styles.css`,
    sourceMap: true,
    sourceMapContents: true,
    outputStyle: "compressed",
  },
  function(error, result) {
    if (!error) {
      fs.writeFile("./build/foo.css", result.css, function(err) {
        if (!err) {
          //file written on disk
        } else {
          console.log(err);
        }
      });
    }
  }
);
