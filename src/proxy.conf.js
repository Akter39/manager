const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/api/sign-up"
    ],
    target: "https://localhost:7024",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
