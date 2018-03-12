module.exports = {
  client_id: "584258b8c2324578be35f4d756f024ba",
  client_secret: "436e0ecdff354cc78037c072b5e74aad",
  productionURLs: {
    redirect_uri: "https://lit-shelf-90391.herokuapp.com/callback",
    frontend_url: "https://spotifyjam-299d8.firebaseapp.com/verification/",
    error_url: "https://spotifyjam-299d8.firebaseapp.com/error/",
    server_url: "https://lit-shelf-90391.herokuapp.com",
    mode: "Production"
  },
  devURLs: {
    redirect_uri: "http://localhost:8000/callback",
    frontend_url: "http://localhost:3000/verification/",
    error_url: "http://localhost:3000/error/",
    server_url: "http://localhost:8000",
    mode: "Development"
  }
};
