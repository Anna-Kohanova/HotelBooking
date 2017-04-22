describe('Test login page', function() {

    beforeEach(function() {
    browser.get('/#/login');
});

it('should go to the Adminpage', function() {
    element(by.id('username')).sendKeys('admin');
    element(by.id('password')).sendKeys('1234');
    element(by.id('loginButton')).click();
    expect(browser.getCurrentUrl()).toBe('http://localhost:8080/#/admin');
});

it('should go to the Userpage', function() {
    element(by.id('username')).sendKeys('Anna');
    element(by.id('password')).sendKeys('1234');
    element(by.id('loginButton')).click();
    expect(browser.getCurrentUrl()).toBe('http://localhost:8080/#/user');
});

// it('should clear the form', () => {
//     let value = "Some text";
//     element(by.id('username')).sendKeys(value);
//     element(by.id('password')).sendKeys(value);
//     element(by.id('loginReset')).click();
//     expect(value).toContain('');
// });
});

