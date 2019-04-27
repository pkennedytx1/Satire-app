module.exports = function(app) {
    app.get("/", function(req, res) {
        res.render("landing");
    });
    
    app.get("/feed", function(req, res) {
        res.render("index");
    });

    app.get("/options", function(req, res) {
        res.render("options");
    });

    app.get("/savedarticles", function(req, res) {
        res.render("saved");
    });

    app.get("*", function(req, res) {
        res.render("404");
    });
}