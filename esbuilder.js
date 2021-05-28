const esbuild = require("esbuild");
const chokidar = require("chokidar");

const build = async () => {
  console.log("Building...");
  try {
    const timerStart = Date.now();

    // Build code
    await esbuild.build({
      entryPoints: ["src/main.js"],
      format: "iife",
      bundle: true,
      minify: true,
      outdir: "build/",
      sourcemap: true,
      //this stops esbuild from trying to resolve these things in css, may need to add more types
      external: ["*.svg", "*.woff", "*.css", "*.jpg", "*.png"],
    });

    const timerEnd = Date.now();
    console.log(`Done! Built in ${timerEnd - timerStart}ms.`);
  } catch (error) {
    console.log(error);
  }
};

//watch it?
if (process.argv.includes("--watch")) {
  //chokidar will watch theme files for changes to trigger rebuild
  // const watcher = chokidar.watch(["js/**/*.js", "css/**/*.scss", "**/*.php"]);
  const watcher = chokidar.watch(["src/**/*.js"]);
  console.log("Watching files... \n");

  //first build
  build();
  //build on changes
  watcher.on("change", () => {
    build();
  });
} else {
  //no watch flag, just build it and be done
  build();
}
