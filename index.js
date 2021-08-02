const Benchmark = require("benchmark");
const cheerio = require("cheerio");
const { cparser } = require("codsen-parser");
const fs = require("fs");

const content = fs.readFileSync(`${__dirname}/test.html`, "utf8");

const cheerioResults = runPerf("cheerio", () => {
  cheerio.load(content);
});
console.log(cheerioResults);

const cparserResults = runPerf("cparser", () => {
  cparser(content);
});
console.log(cparserResults);

fs.writeFileSync(
  `${__dirname}/results.txt`,
  `${cheerioResults}\n${cparserResults}`
);

function runPerf(name, cb) {
  const suite = new Benchmark.Suite();

  let result;
  suite
    .add(name, () => {
      cb();
    })
    .on("cycle", function (event) {
      result = String(event.target);
    })
    .run();

  return result;
}
