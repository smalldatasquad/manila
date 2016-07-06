import requests
from flask import Flask, render_template, request


app = Flask(__name__)


@app.route('/get_tab')
def hello():
    return 'Hello, World'



@app.route('/test')
def data():
    # here we want to get the value of user (i.e. ?user=some-value)
    url = request.args.get('url')
    print url
    return 'butts'





if __name__ == "__main__":
    app.run(host='0.0.0.0')