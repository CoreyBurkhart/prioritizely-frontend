import { 
  // Selector,
  ClientFunction,
 } from 'testcafe'

fixture `Example`
  .page `http://localhost:8080/signup`

const getLocation = ClientFunction(() => window.location);

test("example test", async t => {
  await t
    .typeText('#email', 'testemail@test.com')
    .typeText('#password', 'testpassword')
    .click('input[type=submit]')

  const location = await getLocation();

  await t
    .expect(location.href).notMatch(/\/signup/);
})