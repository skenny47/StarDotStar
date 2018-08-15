from flask import Flask, render_template, send_from_directory


app = Flask(__name__)
app.config.from_pyfile('settings/development_settings.cfg')


@app.route("/game", methods=['GET'])
def index():
    return send_from_directory('.','index.html')


if __name__ == "__main__":
    app.run(host = "0.0.0.0", debug = True, port = 4747)
