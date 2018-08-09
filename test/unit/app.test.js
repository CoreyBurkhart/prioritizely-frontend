import App from '../../src/client/App.jsx'

describe("App.js", () => {
  test("example", () => {
    expect(new App()).toBeInstanceOf(App)
  })
})