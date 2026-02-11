from flask import Flask, render_template, jsonify
import os

# ==========================================
# Flask App Configuration
# ==========================================

app = Flask(
    __name__,
    template_folder="templates",
    static_folder="static"
)

# Disable caching during development
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


# ==========================================
# Routes
# ==========================================

# Home page
@app.route("/")
def home():
    return render_template("index.html")


# Payment success page
@app.route("/success")
def success():
    return render_template("success.html")


# Payment cancel page
@app.route("/cancel")
def cancel():
    return render_template("cancel.html")


# Health check route (for testing / deployment)
@app.route("/health")
def health():
    return jsonify({
        "status": "ok",
        "service": "Flask Frontend",
        "payment_gateway": "connected"
    })


# ==========================================
# Error Handling
# ==========================================

@app.errorhandler(404)
def page_not_found(e):
    return render_template("index.html"), 404


@app.errorhandler(500)
def server_error(e):
    return {
        "error": "Internal Server Error"
    }, 500


# ==========================================
# Main Entry Point
# ==========================================

if __name__ == "__main__":

    PORT = int(os.environ.get("PORT", 5000))

    print("\n===================================")
    print("Flask Payment Frontend Running")
    print(f"Open: http://localhost:{PORT}")
    print("===================================\n")

    app.run(
        host="0.0.0.0",
        port=PORT,
        debug=True
    )
