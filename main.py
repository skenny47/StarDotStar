from flask import Flask, render_template, send_from_directory, json
from flask_cors import CORS

server_globals = {
    "parts" : "4",
    "other" : "undefined"
}

app = Flask(__name__,static_url_path = "", static_folder = ".")
CORS(app)
app.config.from_pyfile('settings/development_settings.cfg')


@app.route("/performer", methods=['GET'])
def index():
    return send_from_directory('.','performer.html')
    
@app.route("/globals", methods=['GET'])
def globals():
    return json.dumps(server_globals)

if __name__ == "__main__":
    app.run(host = "0.0.0.0", debug = True, port = 4747)
