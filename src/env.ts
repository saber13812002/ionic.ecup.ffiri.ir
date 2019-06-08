export const ENV = {
  name: "Development",
  api: {
    baseUrl: 'http://ecupservice.ffiri.ir',
    baseUrl2: 'http://laravel:8000',
  },
  otp_api: {
    otp1_url: '/api/v1/otp1/',
    otp11_url: '/api/v1/otp11/',
    otp2_url: '/api/v1/otp2/',
    otp22_url: '/api/v1/otp22/',
  },
  webapp: {
    baseUrl: "https://ffiri.ir",
    socialUrl: "/social",
    avatarFolder: "/upload"
  },
  service: {
    baseUrl: "https://ffiri.ir",
    getMe: "/api/v1/info/me",
    getMePay: "/api/v1/pay",
    payment: "/payment"
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
