from flask import Flask, render_template, send_from_directory, json, jsonify
#from flask_cors import CORS, cross_origin

server_globals = {
    "parts" : "4",
    "other" : "undefined"
}

app = Flask(__name__,static_url_path = "", static_folder = ".")
app.config.from_pyfile('settings/development_settings.cfg')
#CORS(app)

@app.route("/performer", methods=['GET'])
def index():
    return send_from_directory('.','performer.html')
    
@app.route("/globals", methods=['GET'])
#@cross_origin(origin='*')
def globals():
    response = jsonify(json.dumps(server_globals))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    app.run(host = "0.0.0.0", debug = True, port = 4747)
