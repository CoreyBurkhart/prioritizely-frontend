import { 
  ClientFunction,
 } from 'testcafe'

fixture `Example`
  .page `http://localhost:8080/signup`

const getLocation = ClientFunction(() => window.location);
const cred = {
  name: 'test name',
  email: Math.random().toString(36) + '@test.com',
  pass: 'testpassword',
};

test("Classic signup and authentication", async t => {
  // signup
  await t
    .typeText('#name', cred.name)
    .typeText('#email', cred.email)
    .typeText('#password', cred.pass)
    .click('button[type=submit]')

  // go back to signup and use 'signin' link to get to /signin
  await t
    .navigateTo('http://localhost:8080/signup')
    .click('a[data-testid=signin]')

  // signin
  await t
    .typeText('#email', cred.email)
    .typeText('#password', cred.pass)
    .click('button[type=submit]')

  // expect signin to be successful & redirect to home.
  // signout
  await t
    .click('button[data-testid="signout-button"]')

  await t
    .navigateTo('http://localhost:8080/')

  // click signin link
  await t
    .click('a[data-testid="signin-link"]')
    
  const location = await getLocation();

  // expect to be back at signin view
  await t
    .expect(location.href).match(/\/signin$/)
})