from flask import Blueprint, request, jsonify
from routes.BeatAnalyzer.YouTubeDescriptionAnalyzer import YouTubeDescriptionAnalyzer

analyzer_bp = Blueprint('analyzer_bp', __name__)
analyzer_client = YouTubeDescriptionAnalyzer()

@analyzer_bp.route('/analyzer/analyze', methods=['POST'])
def analyze():
    '''
    correct data format for being analyzed depends on the analyzer client type
    e.g. some analyzer clients might use a text description, some might use a path to an audio file, etc.
    '''
    if isinstance(analyzer_client, YouTubeDescriptionAnalyzer):
        #expects the youtube video description as requestdata
        description = request.get_json()['description']
        bpmStatus, bpm = analyzer_client.bpm(description)
        keyStatus, key, modality = analyzer_client.key(description)
        return jsonify({
            'bpm': bpm if bpmStatus == 200 else None,
            'key': key if keyStatus == 200 else None,
            'modality': modality if keyStatus == 200 else None
        }), 200 if bpmStatus == 200 or keyStatus == 200 else 204
    else:
        #TODO: add other analyzer client types
        return jsonify({'error': 'Other analyzer client types not supported yet'}), 400


