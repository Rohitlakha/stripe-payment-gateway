from flask import Flask, render_template, redirect, session, url_for

app = Flask(
    __name__,
    template_folder="templates"
)

# REQUIRED for session security
app.secret_key = "stripe_secure_secret_key"


# ==========================================
# HOME PAGE
# ==========================================
@app.route("/")
def home():
    return render_template("index.html")


# ==========================================
# SECURE SUCCESS ENTRY (Stripe redirect)
# ==========================================
@app.route("/set-success")
def set_success():

    session["payment_status"] = "success"

    return redirect(url_for("success"))


# ==========================================
# SECURE CANCEL ENTRY (Stripe redirect)
# ==========================================
@app.route("/set-cancel")
def set_cancel():

    session["payment_status"] = "cancel"

    return redirect(url_for("cancel"))


# ==========================================
# SUCCESS PAGE (protected)
# ==========================================
@app.route("/success")
def success():

    if session.get("payment_status") != "success":
        return redirect(url_for("home"))

    session.pop("payment_status", None)

    return render_template("success.html")


# ==========================================
# CANCEL PAGE (protected)
# ==========================================
@app.route("/cancel")
def cancel():

    if session.get("payment_status") != "cancel":
        return redirect(url_for("home"))

    session.pop("payment_status", None)

    return render_template("cancel.html")


# ==========================================
# RUN SERVER
# ==========================================
if __name__ == "__main__":

    print("===================================")
    print("Flask Payment Frontend Running")
    print("Open: http://localhost:5000")
    print("===================================")

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
