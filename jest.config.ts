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
  coveragePathIgnorePatterns: ['src/common/', 'src/database/', 'src/config'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  // resetMocks: true,
  // clearMocks: true,
};

export default config;
