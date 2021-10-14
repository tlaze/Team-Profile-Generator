const { test, expect } = require('@jest/globals');
const Manager = require('../lib/manager');

test('Creates Manager Object', () => {
    testManager = new Manager("Tom", "001", "tomlazore@gmail.com", '1');

    expect(testManager.name).toBe('Tom');
    expect(testManager.id).toBe('001');
    expect(testManager.email).toBe('tomlazore@gmail.com');
    expect(testManager.officeNumber).toBe('1');

});

test('Gets Office Number', () => {
    testManager = new Manager('Tom', '001', 'tomlazore@gmail.com', '1');
    expect(testManager.getOfficeNumber()).toBe('1');
});

test('Gets Manager Role', () => {
    testManager = new Manager('Tom', '001', 'tomlazore@gmail.com', '1');
    expect(testManager.getRole()).toBe("Manager");
});
