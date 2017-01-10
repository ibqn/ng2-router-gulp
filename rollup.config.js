//jshint esversion: 6

import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify';

const entryPath = 'builds/release/';

const warnFilter = /The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten/;

// taken from https://github.com/rollup/rollup/blob/master/bin/src/runRollup.js
import chalk from 'chalk';
const seen = new Set();
if (!process.stderr.isTTY) chalk.enabled = false;
const warnSymbol = process.stderr.isTTY ? `⚠️   ` : `Warning: `;
const stderr = console.error.bind(console);
const handleWarning = warning => {
    const str = warning.toString();
    if (seen.has(str)) return;
    seen.add(str);
    stderr(`${warnSymbol}${chalk.bold( warning.message )}`);
    if (warning.url) {
        stderr(chalk.cyan(warning.url));
    }
    if (warning.loc) {
        stderr(`${warning.loc.file} (${warning.loc.line}:${warning.loc.column})`);
    }
    if (warning.frame) {
        stderr(chalk.dim(warning.frame));
    }
    stderr('');
};

//paths are relative to the execution path
export default {
    entry: entryPath + 'main-aot.js',
    dest: entryPath + 'js/build.js', // output a single application bundle
    sourceMap: false,
    //sourceMap: true,
    //sourceMapFile: entryPath + 'js/build.js.map',
    format: 'iife',
    onwarn: warning => {  // overwite the default warning function
        const str = warning.toString();
        if (warnFilter.test(str)) return;
        handleWarning(warning);
    },
    plugins: [
        nodeResolve({
            jsnext: true,
            module: true
        }),
        commonjs({
            include: ['node_modules/rxjs/**']
        }),
        uglify()
    ]
};
