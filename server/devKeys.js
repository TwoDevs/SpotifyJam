//Put me in /server/ and frontend/spotifyjam/src/

module.exports = {
    "client_id": "584258b8c2324578be35f4d756f024ba",
    "client_secret": "436e0ecdff354cc78037c072b5e74aad",
    "devURLs": {
        "redirect_uri": "http://localhost:8000/callback",
        "frontend_url": "http://localhost:3000/verification/",
        "error_url": "http://localhost:3000/error/",
        "server_url": "http://localhost:8000",
    },
    "productionURLs": {
        "redirect_uri": "http://35.224.255.103:8000/callback",
        "frontend_url": "https://spotifyjam-299d8.firebaseapp.com/verification/",
        "error_url": "https://spotifyjam-299d8.firebaseapp.com/error/",
        "server_url": "http://35.224.255.103:8000"
    }
};