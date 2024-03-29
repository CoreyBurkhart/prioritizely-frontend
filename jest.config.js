module.exports = {
  verbose: true,
  testURL: "http://localhost/",
  moduleNameMapper: {
    /*
     * File and style import mocks 
     */
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/test/__mocks__/fileMock.js",
    "\\.(css|sass|scss|less)$": "<rootDir>/test/__mocks__/styleMock.js",
    /*
     * Map the "@" webpack resolve.alias to the correct directory
     */
    "^@/(.*)": "<rootDir>/src/$1"
  }
}