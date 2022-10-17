import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  modulePaths: ['.'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coveragePathIgnorePatterns: [
    'src/common/',
    'src/database/',
    'src/config',
    '.module.ts',
    // we test the validator and dto in e2e test
    'src/utils',
    '.dto.ts',
    '.middleware.ts',
    'main.ts',
    '.entity.ts'
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  // resetMocks: true,
  // clearMocks: true,
};

export default config;
