import { Selector } from 'testcafe'

fixture `Example`
  .page `http://localhost:8080`

test("example test", async t => {
  await t.expect(Selector('#test').innerText).notEql('hello')
})