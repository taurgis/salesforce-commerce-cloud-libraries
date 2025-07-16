/**
 * A script that executes webpack watch and B2C tools watch commands in parallel.
 * Provides proper error handling, process cleanup, and graceful shutdown.
 *
 * Usage: node ./bin/watch.js
 *
 * @fileoverview Development watch script for parallel webpack and B2C tools execution
 */

const { spawn } = require('child_process');

/**
 * Configuration object for the watch processes
 * @typedef {Object} WatchConfig
 * @property {string} command - The command to execute
 * @property {string[]} args - Command arguments
 * @property {string} label - Display label for logging
 * @property {string} errorLabel - Error label for logging
 */

/** @type {WatchConfig[]} */
const WATCH_PROCESSES = [
    {
        command: 'node',
        args: ['./bin/b2c-tools.js', 'code', 'watch'],
        label: 'Upload',
        errorLabel: 'Upload error'
    }
];

/** @type {import('child_process').ChildProcess[]} */
const activeProcesses = [];

/**
 * Creates and configures a child process with proper event handlers
 *
 * @param {WatchConfig} config - Process configuration
 * @returns {import('child_process').ChildProcess} Configured child process
 */
const createWatchProcess = (config) => {
    const process = spawn(config.command, config.args, {
        stdio: 'pipe',
        shell: true
    });

    process.stdout.on('data', (data) => {
        console.log(`${config.label}: ${data.toString().trim()}`);
    });

    process.stderr.on('data', (data) => {
        console.error(`${config.errorLabel}: ${data.toString().trim()}`);
    });

    process.on('error', (error) => {
        console.error(`${config.errorLabel}: Process failed to start - ${error.message}`);
        cleanup();
    });

    process.on('exit', (code, signal) => {
        if (code !== 0) {
            console.error(`${config.errorLabel}: Process exited with code ${code} and signal ${signal}`);
            cleanup();
        }
    });

    return process;
};

/**
 * Gracefully terminates all active processes
 */
const cleanup = () => {
    console.log('Cleaning up processes...');

    activeProcesses.forEach((process) => {
        if (process && !process.killed) {
            process.kill('SIGTERM');
        }
    });

    setTimeout(() => {
        process.exit(1);
    }, 2000);
};

/**
 * Sets up process signal handlers for graceful shutdown
 */
const setupSignalHandlers = () => {
    process.on('SIGINT', () => {
        console.log('\nReceived SIGINT, shutting down gracefully...');
        cleanup();
    });

    process.on('SIGTERM', () => {
        console.log('\nReceived SIGTERM, shutting down gracefully...');
        cleanup();
    });
};

/**
 * Main execution function that starts all watch processes
 */
const startWatchProcesses = () => {
    console.log('Starting watch processes...\n');

    WATCH_PROCESSES.forEach((config) => {
        const childProcess = createWatchProcess(config);
        activeProcesses.push(childProcess);
    });

    setupSignalHandlers();
};

// Start the watch processes
startWatchProcesses();
