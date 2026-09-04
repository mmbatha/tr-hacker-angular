const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: `${process.env.NX_WORKSPACE_ROOT}/test-results`,
        outputName: `${process.env['NX_TASK_TARGET_PROJECT']}.junit.xml`
      }
    ]
  ],
  coverageReporters: ['lcov', 'html', 'cobertura']
}