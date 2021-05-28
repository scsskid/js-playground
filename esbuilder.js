const esbuild = require("esbuild");
const sassPlugin = require("esbuild-plugin-sass");
const chokidar = require("chokidar");
const browserSync = require("browser-sync").create();

const build = async () => {
  console.log("Building...");
  const service = esbuild;
  try {
    const timerStart = Date.now();

    // Build code
    await service.build({
      entryPoints: ["src/main.js"],
      format: "iife",
      bundle: true,
      minify: true,
      outdir: "build/",
      plugins: [sassPlugin()],
      sourcemap: true,
      //this stops esbuild from trying to resolve these things in css, may need to add more types
      external: ["*.svg", "*.woff", "*.css", "*.jpg", "*.png"],
    });

    const timerEnd = Date.now();
    console.log(`Done! Built in ${timerEnd - timerStart}ms.`);
  } catch (error) {
    console.log(error);
  } finally {
    // service.stop();

  }
};

//watch it?
if (process.argv.includes("--watch")) {
  //chokidar will watch theme files for changes to trigger rebuild
  // const watcher = chokidar.watch(["js/**/*.js", "css/**/*.scss", "**/*.php"]);
  const watcher = chokidar.watch(["src/**/*.js", "src/**/*.scss"]);
  console.log("Watching files... \n");

  //first build
  build();
  //build on changes
  watcher.on("change", () => {
    build();
  });

  //browserSync will trigger livereload when build files are updated
  browserSync.init({
    //TODO: make these values passed in by `npm run dev`
    port: 3334,
    // proxy: "localhost:3333",
    files: ["build/*"],
    server: true
  });
} else {
  //no watch flag, just build it and be done
  build();
}
