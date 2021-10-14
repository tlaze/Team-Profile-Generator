const { test, expect } = require('@jest/globals');
const Employee = require('../lib/employee');

test('Creates Employee Object', () => {
    testEmployee = new Employee("Tom", "001", "tomlazore@gmail.com");

    expect(testEmployee.name).toBe('Tom');
    expect(testEmployee.id).toBe('001');
    expect(testEmployee.email).toBe('tomlazore@gmail.com');

});

test('Tests getName()', () => {
    testEmployee = new Employee('Tom', '001', 'tomlazore@gmail.com');
    expect(testEmployee.getName()).toBe('Tom');
});

test('Tests getId()', () => {
    testEmployee = new Employee('Tom', '001', 'tomlazore@gmail.com');
    expect(testEmployee.getId()).toBe('001');
});

test('Tests getEmail()', () => {
    testEmployee = new Employee('Tom', '001', 'tomlazore@gmail.com');
    expect(testEmployee.getEmail()).toBe('tomlazore@gmail.com');
});

test('Gets Employee Role', () => {
    testEmployee = new Employee('Tom', '001', 'tomlazore@gmail.com');
    expect(testEmployee.getRole()).toBe("Employee");
});
