import { Selector } from 'testcafe'

fixture `Example`
  .page `http://localhost:8080`

test("example test", t => {
  console.log("example test ran")
})