from flask import Flask, render_template


app = Flask(__name__)
app.config.from_pyfile('settings/development_settings.cfg')


@app.route("/", methods=['GET'])
def index():
    return app.send_static_file('static/js/index.html')


if __name__ == "__main__":
    app.run(host = "0.0.0.0", debug = True, port = 4747)
