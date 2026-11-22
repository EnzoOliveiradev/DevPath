// Executa o código do estudante fora da página principal (Web Worker),
// com tempo limite para interromper laços infinitos.
//
// O núcleo fica como texto (RUNNER_SOURCE) para que o bundler não o transforme:
// o mesmo código roda no Worker do navegador e nos testes em Node.

export interface CodeTest { call: string; expected: unknown }
export interface TestResult { call: string; expected: string; actual: string; pass: boolean }
export interface RunResult { logs: string[]; results: TestResult[]; error?: string }

export const RUN_TIMEOUT_MS = 2000;

export const RUNNER_SOURCE = String.raw`
function executeCode(code, tests) {
  var logs = [];
  function show(v) {
    if (typeof v === 'string') return v;
    if (v === undefined) return 'undefined';
    if (typeof v === 'function') return '[Function]';
    if (typeof v === 'number' || typeof v === 'boolean' || v === null) return String(v);
    try { var s = JSON.stringify(v); return s === undefined ? String(v) : s; } catch (e) { return String(v); }
  }
  function serialize(v) {
    if (v === undefined) return 'undefined';
    try { var s = JSON.stringify(v); return s === undefined ? String(v) : s; } catch (e) { return String(v); }
  }
  function describe(e) {
    return e && e.name ? e.name + ': ' + e.message : String(e);
  }
  function log() { logs.push(Array.prototype.map.call(arguments, show).join(' ')); }
  var sandboxConsole = { log: log, info: log, warn: log, error: log };
  var list = tests || [];
  var calls = list.map(function (t) { return t.call; });
  var raw;
  try {
    var fn = new Function('console', '__calls',
      '"use strict";\n' + code +
      '\n;return __calls.map(function (__c) { try { return { ok: true, value: eval(__c) }; } catch (__e) { return { ok: false, error: (__e && __e.name ? __e.name + ": " + __e.message : String(__e)) }; } });');
    raw = fn(sandboxConsole, calls);
  } catch (e) {
    return { logs: logs, results: [], error: describe(e) };
  }
  var results = list.map(function (t, i) {
    var r = raw[i];
    if (!r.ok) return { call: t.call, expected: t.expected, actual: r.error, pass: false };
    var actual = serialize(r.value);
    return { call: t.call, expected: t.expected, actual: actual, pass: actual === t.expected };
  });
  return { logs: logs, results: results };
}
`;

function serializeExpected(value: unknown): string {
  return value === undefined ? 'undefined' : JSON.stringify(value);
}

/** Navegador: executa em um Worker descartável, encerrado após o tempo limite. */
export function runInWorker(code: string, tests: CodeTest[] = [], timeoutMs = RUN_TIMEOUT_MS): Promise<RunResult> {
  return new Promise(resolve => {
    const source = RUNNER_SOURCE + '\nself.onmessage = function (e) { self.postMessage(executeCode(e.data.code, e.data.tests)); };';
    const url = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
    const worker = new Worker(url);
    let settled = false;
    const finish = (result: RunResult) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve(result);
    };
    const timer = setTimeout(() => finish({
      logs: [], results: [],
      error: `Tempo limite de ${timeoutMs / 1000}s excedido. Verifique se há um laço infinito.`
    }), timeoutMs);
    worker.onmessage = event => finish(event.data as RunResult);
    worker.onerror = event => { event.preventDefault(); finish({ logs: [], results: [], error: event.message || 'Erro ao executar o código.' }); };
    worker.postMessage({ code, tests: tests.map(t => ({ call: t.call, expected: serializeExpected(t.expected) })) });
  });
}
