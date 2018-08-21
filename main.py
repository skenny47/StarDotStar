from flask import Flask, render_template, send_from_directory, json, jsonify
import datetime
import globals

server_globals = globals.server_globals

class StarDotStarEvent():
    def __init__(self,x,y,icon,time):
        self.x = x
        self.y = y
        self.icon = icon
        self.time = time
    

events = [ ]

app = Flask(__name__,static_url_path = "", static_folder = ".")
app.config.from_pyfile('settings/development_settings.cfg')
#CORS(app)

@app.route("/performer", methods=['GET'])
def index():
    return send_from_directory('.','performer.html')
    
@app.route("/globals", methods=['GET'])
#@cross_origin(origin='*')
def globals():
    response = jsonify(server_globals)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/newEvent')
def newEvent():
  x = request.args.get('x', default = 0, type = int)
  y = request.args.get('y', default = 0, type = int)
  icon = request.args.get('icon', default = '*', type = str)
  events.append(StarDotStarEvent(x,y,icon,datetime.datetime.now()))
  return
  
if __name__ == "__main__":
    app.run(host = "0.0.0.0", debug = True, port = 4747)
