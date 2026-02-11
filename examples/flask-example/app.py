from flask import Flask, render_template, redirect, session

app = Flask(__name__, template_folder="templates")

app.secret_key = "stripe_secure_secret_key"


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/set-success")
def set_success():

    session["payment_status"] = "success"

    return redirect("/success")


@app.route("/set-cancel")
def set_cancel():

    session["payment_status"] = "cancel"

    return redirect("/cancel")


@app.route("/success")
def success():

    if session.get("payment_status") != "success":
        return redirect("/")

    return render_template("success.html")


@app.route("/cancel")
def cancel():

    if session.get("payment_status") != "cancel":
        return redirect("/")

    return render_template("cancel.html")


@app.route("/clear")
def clear():

    session.clear()

    return "cleared"


if __name__ == "__main__":

    app.run(port=5000, debug=True)
