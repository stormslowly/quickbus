"use strict";

module.exports = function (req, res, ok) {
    // User is allowed, proceed to controller
    if (req.session.authenticated) {
        return ok();
    }

    return res.send("You are not permitted to perform this action.", 403);

};