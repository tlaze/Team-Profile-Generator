const { test, expect } = require('@jest/globals');
const Intern = require('../lib/Intern');

test('Creates Intern Object', () => {
    testIntern = new Intern("Tom", "001", "tomlazore@gmail.com", "GTech");

    expect(testIntern.name).toBe('Tom');
    expect(testIntern.id).toBe('001');
    expect(testIntern.email).toBe('tomlazore@gmail.com');
    expect(testIntern.school).toBe('GTech');
});

test('Tests getSchool()', () => {
    testIntern = new Intern('Tom', '001', 'tomlazore@gmail.com', 'GTech');
    expect(testIntern.getSchool()).toBe('GTech');
});


test('Gets Intern Role', () => {
    testIntern = new Intern('Tom', '001', 'tomlazore@gmail.com', 'GTech');
    expect(testIntern.getRole()).toBe("Intern")
});