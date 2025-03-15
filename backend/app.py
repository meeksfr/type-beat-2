from flask import Flask, request, jsonify
from routes.taste_bp import taste_bp
from routes.finder_bp import finder_bp
app = Flask(__name__)
app.register_blueprint(taste_bp)
app.register_blueprint(finder_bp)

@app.route("/test", methods=["GET", "POST"])
def test():
    if request.method == "POST":
        some_json = request.get_json()
        return jsonify({"you sent": some_json}), 201
    else:
        return jsonify({"about": "yipee"}), 200

if __name__ == "__main__":
    app.run(debug=True)
