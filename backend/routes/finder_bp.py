from flask import Blueprint, jsonify, request
from routes.BeatFinder.YouTubeRecents import YouTubeRecents

finder_bp = Blueprint('finder', __name__)
finder_client = YouTubeRecents()

@finder_bp.route('/finder/search', methods=['POST'])
def search():
    searchTerms = request.get_json()['searchTerms']
    status, links = finder_client.search(searchTerms)
    if status == 200:
        return jsonify(links), 200
    else:
        return jsonify({'error': 'Failed to search'}), 400
    
@finder_bp.route('/finder/beatInfo', methods=['GET'])
def beatInfo():
    link = request.args.get('link')
    status, info = finder_client.getBeatInfo(link)
    if status == 200:
        return jsonify(info), 200
    else:
        return jsonify({'error': 'Failed to get beat info'}), 400