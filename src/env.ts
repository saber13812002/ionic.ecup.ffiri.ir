export const ENV = {
  name: "Development",
  api: {
    baseUrl: 'http://localhost:8000',
  },
  otp_api: {
    otp1_url : '/api/v1/otp1/',
    otp2_url : '/api/v1/otp2/',
  },
    webapp: {
      baseUrl: "https://masjedcloob.ir",
      //baseUrl: "https://masjedcloob.ir",
    socialUrl: "/social",
    avatarFolder: "/upload"
  },
  service: {
    baseUrl: "https://masjedcloob.ir"
  },
  security: {
    serverUrl: "https://masjedcloob.ir/blog",
    //serverUrl: "https://berimbasket.ir",
    jwtToken: "/wp-json/jwt-auth/v1/token",
    validate: "/validate",
    login: "/login",
    register: "/register"
  },
  googleMap: {
    apikey: "dsgasdfasdfsdf"
  },
  clientId:"",
  redirectUri:"",
  logError: true
};
