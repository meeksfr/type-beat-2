from flask import Blueprint, jsonify
from routes.UserTaste.Spotify import SpotifyTaste

taste_bp = Blueprint('taste', __name__)
taste_client = SpotifyTaste()

@taste_bp.route('/taste/auth', methods=['POST'])
def auth():
    status, token, expires_in = taste_client.authorize()
    if status == 200:
        return jsonify({
            'status': 'success',
            'token': token,
            'expires_in': expires_in
        }), 200
    else:
        return jsonify({
            'status': 'error',
            'message': 'Failed to authenticate with Spotify'
        }), 401 