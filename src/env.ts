export const ENV = {
  name: "Development",
  api: {
    baseUrl: 'https://fifa-web-api.liara.run',
  },
  otp_api: {
    otp1_url: '/api/v1/otp1/',
    otp2_url: '/api/v1/otp2/',
  },
  webapp: {
    baseUrl: "https://masjedcloob.ir",
    //baseUrl: "https://masjedcloob.ir",
    socialUrl: "/social",
    avatarFolder: "/upload"
  },
  service: {
    baseUrl: "https://masjedcloob.ir",
    getMe: "/api/v1/info/me"
  },
  security: {
    validate: "/api/v1/closed",
    login: "/login",
    register: "/register"
  },
  googleMap: {
    apikey: "dsgasdfasdfsdf"
  },
  clientId: "",
  redirectUri: "",
  logError: true
};
