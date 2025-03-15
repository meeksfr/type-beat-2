from flask import Blueprint, jsonify, request
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
    
@taste_bp.route('/taste/source', methods=['GET'])
def searchForTasteSource():
    q = request.args.get('q')
    status, data = taste_client.getTasteSource(q)
    if status == 200:
        return jsonify({
            'status': 'success',
            'data': data
        }), 200
    else:
        return jsonify({
            'status': 'error',
            'message': f'Failed to get taste source'
        }), 401
    
@taste_bp.route('/taste/searchTerms', methods=['GET'])
def getSearchTerms():
    playlist_id = request.args.get('playlist_id')
    status, data = taste_client.getSearchTerms(playlist_id)
    if status == 200:
        return jsonify({
            'status': 'success',
            'data': data
        }), 200
    else:
        return jsonify({
            'status': 'error',
            'message': f'Failed to get search terms'
        }), 401 

