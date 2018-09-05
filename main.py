from flask import Flask, request, response, render_template, send_from_directory, json, jsonify
import datetime, httplib
import globals
import logging
from logging.handlers import TimedRotatingFileHandler
from flask import Flask

server_globals = globals.server_globals

class StarDotStarEvent():
    def __init__(self,x,y,part,icon,time,id):
        self.x = x
        self.y = y
        self.part = part
        self.icon = icon
        self.time = time
        self.id = id
    

events = [ ]

eventId = 0.0
app = Flask(__name__,static_url_path = "", static_folder = ".")
app.config.from_pyfile('settings/development_settings.cfg')
events.append(StarDotStarEvent(47,0.47,0,'',datetime.datetime.now(),0.0))

### Uncomment out this section below to add file logging
#formatter = logging.Formatter("[%(asctime)s] %(message)s")
#handler = TimedRotatingFileHandler('../LOG/Logfile', when='midnight',                                    interval=1, backupCount=5)
#handler.setLevel(logging.INFO)
#handler.setFormatter(formatter)
#app.logger.addHandler(handler)
############################################

def serialize(obj):
    """JSON serializer for objects not serializable by default json code"""
    if isinstance(obj, datetime):
        serial = obj.isoformat()
        return serial
    return obj.__dict__

@app.route("/performer", methods=['GET'])
def performer():
    return send_from_directory('.','performer.html')
    
@app.route("/composer", methods=['GET'])
def composer():
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
    app.logger.info('Sent Event : ' + str(e.x) + ',' + str(e.y) + ' Part : ' + str(e.part) + ' Icon : ' + e.icon)
    response = jsonify(vars(e))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    
@app.route('/newEvent')
def newEvent():
    global eventId
    x = request.args.get('x', default = 0, type = int) 
    y = request.args.get('y', default = ' ', type = str)  # float : fraction of 1 (0.xxx)
    p = request.args.get('part', default = 0, type = int)
    icon = request.args.get('icon', default = '*', type = str)
    eventId = eventId + 1.0
    events.append(StarDotStarEvent(x,float(y),p,icon,datetime.datetime.now(),eventId))
    app.logger.info('Appended Event : ' + str(x) + ',' + y + ' Part : ' + str(p)+ ' Icon : ' + icon)
    return ('', 204)
    
@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r
  
if __name__ == "__main__":
    app.run(host = "0.0.0.0", debug = True, port = 4747)
