from flask import Blueprint, jsonify, request, send_file, after_this_request
from routes.Downloader.YtDlpDownloader import YtDlpDownloader

downloader_bp = Blueprint('downloader', __name__)
downloader_client = YtDlpDownloader()
  
@downloader_bp.route('/downloader/download', methods=['GET'])
def download():
    url = request.args.get('url')
    title = request.args.get('title')
    status, path = downloader_client.download(url, title)

    @after_this_request
    def cleanup(response):
        downloader_client.cleanUp()
        return response
    
    if status == 200:
        return send_file(path, as_attachment=True), 200
    else:
        return jsonify({'error': 'Failed to download beat'}), 400

