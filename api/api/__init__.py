from flask import Flask, request
import boto
from boto.s3.key import Key

import pymongo
from pymongo import MongoClient
import settings
import datetime

app = Flask(__name__)
app.config['FLASKS3_BUCKET_NAME'] = 'stoloniferous-manila'
s3 = FlaskS3(app)
"""
AKIAJ6O2S34J7KBANHEA
Secret Access Key:
    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"""


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

@app.route('/image_upload', methods=['POST'])
def image_upload(): 
    if request.method == 'POST' and request.files['file']:
	file = request.files['image']
	if file and allowed_file(file.filename):
	    n = secure_filename(file.filename)
	    FileStorage(stream=request.files['image']).save(os.path.join(".",'testpic.jpg'))
	    return redirect(url_for('index', p=n))


@app.route('/upload_file')
def upload_file():
    # Connect to Amazon S3
    s3 = boto.connect_s3()

    # Get a handle to the S3 bucket
    bucket_name = 'stoloniferous-manila'
    bucket = s3.get_bucket(bucket_name)
    k = Key(bucket)

    # Read the contents of the file
    file_contents = data_file.read()

    # Use Boto to upload the file to the S3 bucket
    k.key = data_file.filename
    print "Uploading some data to " + bucket_name + " with key: " + k.key
    k.set_contents_from_string(file_contents)


if __name__ == "__main__":
    app.run(host='0.0.0.0')
