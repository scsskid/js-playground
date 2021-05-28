const bs = require("browser-sync").create();

bs.init({
  files: ["./build/**/*.js", "./build/**/*.css"],
  open: true,
  server: true,
  ghostMode: false
});

// bs.watch("src/**/*.js", function (event, file) {
//   require("esbuild")
//     .build(esbuildConfig)
//     .then(() => bs.reload())
//     .catch(() => process.exit(1));
// });
