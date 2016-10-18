from flask import Flask, request
from flask_cors import CORS, cross_origin
import boto
from boto.s3.connection import S3Connection
from boto.s3.key import Key
import base64

import pymongo
from pymongo import MongoClient
import settings
import datetime

app = Flask(__name__)
CORS(app)


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
                return flask.jsonify(**one_tab)
                return one_tab['url']
        except Exception, e:
            print "error:"
            return "error:" + str(e)

    else:
        return "error: no tabroom"


@app.route('/set_tab')
def set_tab():
    # set a tab, given tabroom and url
    tabroom = request.args.get('tabroom')
    url = request.args.get('url')
    if (tabroom and url):


        submit_tab_to_db(tabroom, url)

    else:
        return "error: no tabroom or url"


def submit_tab_to_db(tabroom, url, scribbleimgurl=None):
    client = MongoClient('mongodb://' + settings.mongouser + ':' + settings.mongopass + '@' + settings.mongourl)
    db = client['manila_db']
    collection_on_compose = db['tabs']

    tab = {'tabroom': tabroom, 'url': url, 'datetime': datetime.datetime.utcnow(), 'scribbleimgurl': scribbleimgurl}

    try:
        result = collection_on_compose.insert_one(tab)

        print "Inserted: ", result.inserted_id, " >> ", tabroom, " : ", url
        return "Inserted: " + str(result.inserted_id)
    except Exception:
        print "error: not inserted", tab
        return "error: not inserted", tab


@app.route('/set_scribbled_tab', methods=['POST'])
def set_scribbled_tab():
    if('imgBase64' in request.form):

        tabroom = request.form['tabroom']
        taburl = request.form['taburl']

        scribbledata = base64.b64decode(request.form['imgBase64'])

        scribbleimgurl = upload_to_s3(scribbledata)

        print scribbleimgurl

        return submit_tab_to_db(tabroom, taburl, scribbleimgurl)



def upload_to_s3(file_contents):

    # Connect to Amazon S3
    s3 = boto.connect_s3(settings.AWS_ACCESS_KEY, settings.AWS_SECRET_KEY)

    # Get a handle to the S3 bucket
    bucket_name = settings.AWS_BUCKET_NAME
    bucket = s3.get_bucket(bucket_name)

    k = Key(bucket)

    # Use Boto to upload the file to the S3 bucket
    k.key = settings.AWS_BUCKET_FOLDER_NAME + request.form['filename']
    print "Uploading some data to " + bucket_name + " with key: " + k.key
    k.set_contents_from_string(file_contents)
    url = k.generate_url(expires_in=0, query_auth=False)

    return url



if __name__ == "__main__":
    app.run(host='0.0.0.0')
