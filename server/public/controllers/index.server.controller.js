"use strict";
class IndexController {
    constructor() {
        this.renderIndex = (req, res) => {
            console.log('=================================================');
            console.log('Rendering index... (index.server.controller.ts 34)');
            console.log('=================================================');
            res.render('index', {
                title: 'Be SMART DOIT',
                user: JSON.stringify(req.user)
            });
        };
    }
}
module.exports = IndexController;
