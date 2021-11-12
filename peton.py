from flask import Flask, request, render_template, session
from datetime import datetime
import codecs

app = Flask(__name__)
app.secret_key = "o03af53aUrJHZAjD0eKWgWVTqS7XL7FU"

data_portals_focused = {}
data_focused = {}

lastVisit = {"user": "N/A", "time": "N/A"}
log = []
book = 'N/A'


def open_html_file(file_name):
    f = codecs.open(file_name, "r", 'utf-8')
    txt = f.read()
    f.close()
    return txt


def open_image(img):
    with open(img, "rb") as image_file:
        return image_file.read()


@app.route('/<js_file>.js')
def open_js(js_file):
    return open_html_file("assets/" + js_file + ".js")


@app.route('/<css_file>.css')
def open_css(css_file):
    return open_html_file("assets/" + css_file + ".css")


@app.route('/imgs/<image>')
def back_png(image):
    return open_image('imgs/' + image)


@app.route('/<html_file>')
def open_html(html_file):
    if 'username' in session:
        try:
            return render_template(html_file + ".html")
        except:
            return "404 Not found!"
    else:
        return render_template("login.html")


@app.route('/')
def index():
    if 'username' in session:
        # return render_template("index.html")
        return render_template("index.html")
    else:
        return render_template("login.html")


@app.route("/home", methods=['POST'])
def send_log():
    receivedData = (request.get_json(force=True))

    print(receivedData)
    if receivedData["job"] == "log_me_out":
        session.pop('username', None)
        return "successfully logged out"
    else:
        global lastVisit, log
        sendBack = {"user": session['username'], "last": lastVisit["user"], "time": lastVisit["time"], "log": log,
                    "update": False}
        if receivedData["job"] == "update":
            lastVisit["user"] = session['username']
            lastVisit["time"] = f'Took {book} at {datetime.now().strftime("%H:%M %d/%m/%Y")}'
            log.insert(0, {'user': lastVisit["user"], 'content':lastVisit["time"]})
            sendBack["update"] = True
        elif receivedData["job"] == "newLog":
            if receivedData["position"] == 0:
                if len(log) == 1:
                    lastVisit["user"] = "N/A"
                    lastVisit["time"] = ""
                else:
                    lastVisit["user"] = log[1]["user"]
                    lastVisit["time"] = log[1]["content"]
            log.pop(receivedData["position"])
        return sendBack


@app.route('/login_me', methods=['POST'])
def login():
    if (("boob" == request.get_json(force=True)["Password"]) and (
            request.get_json(force=True)["Username"] == "Popick" or request.get_json(force=True)[
        "Username"] == "Pazy")):
        session['username'] = request.get_json(force=True)["Username"]
        send = {"accepted": "True", "Username": session["username"]}
        ip_address = request.remote_addr
        print("IP registered: " + ip_address + " under the name: " + session["username"])
        return send
    else:
        send = {"accepted": "False"}
        return send


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=80, debug=True)
