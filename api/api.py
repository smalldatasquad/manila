from flask import Flask, request
import pymongo
from pymongo import MongoClient
import settings
import datetime


app = Flask(__name__)


@app.route('/')
def index():
    return 'Hi! use either /get_tab or /set_tab'


@app.route('/get_tab')
def get_tab():
    # get the most recent tab, given tabroom
    tabroom = request.args.get('tabroom')
    print tabroom  
    if (tabroom):

        client = MongoClient('mongodb://' + settings.mongouser + ':' + settings.mongopass + '@' + settings.mongourl)
        db = client['manila_db']
        collection_on_compose = db['tabs']

        try:
            # sort in descending order by date/time, so that  we get the most recent
            one_tab = collection_on_compose.find({"tabroom": tabroom}).sort('datetime',pymongo.DESCENDING).limit(1)[0]
            if(one_tab['url']):
                print one_tab['url']
                return one_tab['url']
        except Exception:
            print "error: no url"
            return "error: no url"

    else:
        return "error: no tabroom"


@app.route('/set_tab')
def set_tab():
    # set a tab, given tabroom and url
    tabroom = request.args.get('tabroom')
    url = request.args.get('url')
    if (tabroom and url):

        client = MongoClient('mongodb://' + settings.mongouser + ':' + settings.mongopass + '@' + settings.mongourl)
        db = client['manila_db']
        collection_on_compose = db['tabs']

        tab = {'tabroom': tabroom, 'url': url, 'datetime': datetime.datetime.utcnow()}

        try:
            result = collection_on_compose.insert_one(tab)

            print "Inserted: ", result.inserted_id, " >> ", tabroom, " : ", url
            return "Inserted: " + str(result.inserted_id)
        except Exception:
            print "error: not inserted", tab
            return "error: not inserted", tab

    else:
        return "error: no tabroom or url"



if __name__ == "__main__":
    app.run(host='0.0.0.0')
