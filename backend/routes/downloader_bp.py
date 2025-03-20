from flask import Blueprint, jsonify, request, send_file, after_this_request
from routes.Downloader.YtDlpDownloader import YtDlpDownloader

downloader_bp = Blueprint('downloader', __name__)
downloader_client = YtDlpDownloader()

@downloader_bp.route('/downloader/download', methods=['GET'])
def download():
    url = request.args.get('url')
    status, path = downloader_client.download(url)
    if status == 200:
        return send_file(path, as_attachment=True), 200
    else:
        return jsonify({'error': 'Failed to download beat'}), 400
    
@downloader_bp.route('/downloader/downloadWithInfo', methods=['GET'])
def downloadWithInfo():
    url = request.args.get('url')
    key = request.args.get('key')
    bpm = request.args.get('bpm')
    title = request.args.get('title').replace(" ", "_")
    beatInfo = {
        "key": key,
        "bpm": bpm,
        "title": title
    }
    status, path = downloader_client.download(url, beatInfo)

    @after_this_request
    def cleanup(response):
        downloader_client.cleanUp()
        return response
    
    if status == 200:
        return send_file(path, as_attachment=True), 200
    else:
        return jsonify({'error': 'Failed to download beat'}), 400

