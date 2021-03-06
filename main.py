from flask import Flask, request, render_template, send_from_directory, json, jsonify
from glob import glob
from shutil import copyfile
import datetime, httplib
import os
import uuid
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
    for file in glob('/home/ubuntu/StarDotStar/TEMP*.html'):
        os.remove(file)
    unique_filename = str('TEMP'+uuid.uuid4().hex+'.html')
    copyfile('/home/ubuntu/StarDotStar/performer.html','/home/ubuntu/StarDotStar/'+unique_filename)
    return send_from_directory('.',unique_filename)
    
@app.route("/composer", methods=['GET'])
def composer():
    for file in glob('/home/ubuntu/StarDotStar/TEMP*.html'):
        os.remove(file)
    unique_filename = str('TEMP'+uuid.uuid4().hex+'.html')
    copyfile('/home/ubuntu/StarDotStar/performer.html','/home/ubuntu/StarDotStar/'+unique_filename)
    return send_from_directory('.',unique_filename)
    
@app.route("/globals", methods=['GET'])
def globals():
    response = jsonify(server_globals)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/getEvents", methods=['GET'])
def getEvents():
    e = events[-1]  # shortcut to last element
    app.logger.info('Sent Event : ' + str(e.x) + ',' + str(e.y) + ' Part : ' + str(e.part) + ' Icon : ' + e.icon)
    response = jsonify(vars(e))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    
@app.route('/newEvent')
def newEvent():
    global eventId
    x = request.args.get('x',default = ' ', type = str) 
    y = request.args.get('y', default = ' ', type = str)  # float : fraction of 1 (0.xxx)
    p = request.args.get('part', default = 0, type = int)
    icon = request.args.get('icon', default = '*', type = str)
    eventId = eventId + 1.0
    events.append(StarDotStarEvent(float(x),float(y),p,icon,datetime.datetime.now(),eventId))
    app.logger.info('Appended Event : ' + str(x) + ',' + y + ' Part : ' + str(p)+ ' Icon : ' + icon)
    return ('', 204)
  
if __name__ == "__main__":
    app.run(host = "0.0.0.0", debug = True, port = 4747)
