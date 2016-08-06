import requests
from flask import Flask, render_template, request
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
    secret = request.args.get('secret')
    print secret  
    if (secret == 'heyboi'):

        print 'were in'

        client = MongoClient('mongodb://' + settings.mongouser + ':' + settings.mongopass + '@' + settings.mongourl)
        db = client['manila_db']
        collection_on_compose = db['urls']

        one_url = collection_on_compose.find()

        print one_url['url']
        return one_url['url']

    else:
        return "butts"






if __name__ == "__main__":
    app.run(host='0.0.0.0')
