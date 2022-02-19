exports.option = {
    "parse_mode": "Markdown",
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [[{
            text: "My phone number",
            request_contact: true
        }], ["Cancel"]]
    }
};

exports.menu = {
    "parse_mode": "Markdown",
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [[{
            text: "Child delay",
        }],
        [{
            text: "Child absence",
        }],
        [{
            text: "Escort delay",
        }],
        ["Cancel"]]
    }
};

exports.absenceMenu = {
    "parse_mode": "Markdown",
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [[{
            text: "Sickness",
        }],
        [{
            text: "Other",
        }],
        ["Cancel"]]
    }
};
