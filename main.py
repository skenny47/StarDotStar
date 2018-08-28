from flask import Flask, request, render_template, send_from_directory, json, jsonify
import datetime, httplib
import globals
import logging
from logging.handlers import TimedRotatingFileHandler
from flask import Flask

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
events.append(StarDotStarEvent(47,47,'',datetime.datetime.now()))
formatter = logging.Formatter("[%(asctime)s] %(message)s")
handler = TimedRotatingFileHandler('../LOG/Logfile', when='midnight',                                    interval=1, backupCount=5)
handler.setLevel(logging.INFO)
handler.setFormatter(formatter)
app.logger.addHandler(handler)

@app.route("/performer", methods=['GET'])
def index():
    return send_from_directory('.','performer.html')
    
@app.route("/globals", methods=['GET'])
def globals():
    response = jsonify(server_globals)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/getEvents", methods=['GET'])
def getEvents():
    #t = request.args.get('t') 
    e = events[-1]  # shortcut to last element
    app.logger.info('Sent Event : ' + str(e.x) + ',' + str(e.y) + ' Icon : ' + e.icon)
    returnJson = json.dumps(e.__dict__)
    response = jsonify(returnJson)  # The latest event
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    
@app.route('/newEvent')
def newEvent():
  x = request.args.get('x', default = 0, type = int) 
  y = request.args.get('y', default = 0, type = int)
  icon = request.args.get('icon', default = '*', type = str)
  events.append(StarDotStarEvent(x,y,icon,datetime.datetime.now()))
  app.logger.info('Appended Event : ' + str(x) + ',' + str(y) + ' Icon : ' + icon)
  return ('', 204)
  
if __name__ == "__main__":
    app.run(host = "0.0.0.0", debug = True, port = 4747)
