const Benchmark = require("benchmark");
const cheerio = require("cheerio");
const { cparser } = require("codsen-parser");

const content = require("fs").readFileSync(`${__dirname}/test.html`, "utf8");

runPerf("cheerio", () => {
  cheerio.load(content);
});

runPerf("cparser", () => {
  cparser(content);
});

function runPerf(name, cb) {
  const BENCH = true;

  // add tests
  // ---------------------------------------------------------------------------

  const suite = new Benchmark.Suite();

  return (
    suite
      .add("t1", () => {
        cb();
      })
      .on("complete", function () {
        //                                  |
        //                                  |
        //                                  |
        //                                  |
        //                               \  |  /
        //                                \ | /
        //                                 \|/
        //                                  V
        const optsPerSec = this[0].hz;

        if (BENCH) {
          console.log(`${name},${optsPerSec}`);
        }
      })
      // run async
      .run({ async: true })
  );
}
