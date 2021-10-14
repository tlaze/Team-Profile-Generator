const { test, expect } = require('@jest/globals');
const Engineer = require('../lib/engineer');

test('Creates Engineer Object', () => {
    testEngineer = new Engineer("Tom", "001", "tomlazore@gmail.com", "_tlaze");

    expect(testEngineer.name).toBe('Tom');
    expect(testEngineer.id).toBe('001');
    expect(testEngineer.email).toBe('tomlazore@gmail.com');
    expect(testEngineer.github).toBe('_tlaze');
});

test('Tests getGithub()', () => {
    testEngineer = new Engineer('Tom', '001', 'tomlazore@gmail.com', '_tlaze');
    expect(testEngineer.getGithub()).toBe('_tlaze');
});


test('Gets Engineer Role', () => {
    testEngineer = new Engineer('Tom', '001', 'tomlazore@gmail.com', '_tlaze');
    expect(testEngineer.getRole()).toBe("Engineer");
});