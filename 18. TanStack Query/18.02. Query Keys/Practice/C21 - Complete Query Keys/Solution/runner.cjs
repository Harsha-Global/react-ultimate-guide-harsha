const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const ts = require(process.env.COURSE_TYPESCRIPT_PATH || 'typescript');

async function run(source, tests) {
  const cases = [];
  const context = vm.createContext({
    URL,
    describe: (_name, fn) => fn(),
    it: (name, fn) => cases.push({ name, fn }),
    expect: value => ({
      toBe: expected => assert.equal(value, expected),
      toEqual: expected => assert.deepEqual(value, expected),
      not: {
        toBe: expected => assert.notEqual(value, expected),
        toEqual: expected => assert.notDeepEqual(value, expected)
      }
    })
  });
  const result = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None } });
  vm.runInContext(result.outputText + '\n' + tests, context, { timeout: 1500 });
  const results = [];
  for (const item of cases) {
    let timer;
    try {
      await Promise.race([
        Promise.resolve().then(item.fn),
        new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('The check did not finish.')), 1500); })
      ]);
      results.push({ name: item.name, passed: true });
    } catch (error) {
      results.push({ name: item.name, passed: false, error: error.message });
    } finally { clearTimeout(timer); }
  }
  return { passed: results.filter(x => x.passed).length, total: results.length, results };
}
module.exports = { run };
if (require.main === module) {
  const root = process.cwd();
  run(fs.readFileSync(path.join(root, 'exercise.ts'), 'utf8'), fs.readFileSync(path.join(root, 'evaluate.js'), 'utf8')).then(result => {
    for (const item of result.results) console.log((item.passed ? 'PASS ' : 'FAIL ') + item.name + (item.passed ? '' : '\n' + item.error));
    console.log(`${result.passed}/${result.total} checks passed.`);
    process.exitCode = result.passed === result.total ? 0 : 1;
  }).catch(error => { console.error(error); process.exitCode = 1; });
}
