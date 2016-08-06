from flask import Flask, request
import pymongo
from pymongo import MongoClient
import settings


app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hello, World'



@app.route('/test')
def test():
    # here we want to get the value of user (i.e. ?user=some-value)
    url = request.args.get('url')
    print url
    return 'butts'


@app.route('/get_tab')
def get_tab():
    # here we want to get the value of user (i.e. ?user=some-value)
    tabroom = request.args.get('tabroom')
    print tabroom  
    if (tabroom):

        client = MongoClient('mongodb://' + settings.mongouser + ':' + settings.mongopass + '@' + settings.mongourl)
        db = client['manila_db']
        collection_on_compose = db['tabs']

        try:
            one_tab = collection_on_compose.find({"tabroom": tabroom}).sort('date',pymongo.DESCENDING).limit(1)[0]
            if(one_tab['url']):
                print one_tab['url']
                return one_tab['url']
        except Exception:
            print "error: no url"
            return "error: no url"

    else:
        return "error: no tabroom"






if __name__ == "__main__":
    app.run(host='0.0.0.0')
