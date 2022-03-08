module.exports = {
    testMatch: ["<rootDir>/src/**/*.spec.(ts|tsx)"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    coverageDirectory: "<rootDir>/test_result/coverage",
    coverageReporters: ["lcov", "text"],
    reporters: [
        "default",
        [
            "jest-junit",
            {
                outputDirectory: "<rootDir>/test_result",
                outputName: "junit.xml",
                usePathForSuiteName: "true",
            },
        ],
    ],
    setupFilesAfterEnv: ["./jest.setup.ts"],
};
