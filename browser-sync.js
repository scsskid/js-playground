import bs from 'browser-sync';

bs.create().init({
  files: ["./build/**/*.js", "./build/**/*.css"],
  open: true,
  server: true,
  ghostMode: false,
});
