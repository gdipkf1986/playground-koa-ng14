'use strict';
const os = require('os');
const parse = require('co-busboy');
const fs = require('fs');
const path = require('path');
const meter = require('stream-meter');


const list = ()=> [];

const isValidFile = (fileOriName, mime, fileSize)=> true;

Object.assign(exports, {
    index: function*(next) {
        this.status = 200;
        this.body = [];
    },
    list: function*(next) {
        this.status = 200;
        this.body = list();
        yield next;
    },
    get: function*(next) {
        this.status = 200;
        this.body = {};
        yield next;
    },
    post: function*(next) {

        if (!this.request.is('multipart/*')) {
            this.status = 400;
            this.body = {message: 'unknown file'};
            return yield next;
        }

        const parts = parse(this);
        let part = null;

        const ctrl = this;

        while (part = yield parts) {
            const targetName = Math.random().toString();
            const m = meter();
            const stream = fs.createWriteStream(path.join(path.join(__dirname, '..', '..', '..', 'uploaded'), targetName));
            const fileOriName = part.filename;
            const mime = part.mime;
            part.pipe(m).pipe(stream).on('finish', ()=> {
                const fileSize = m.bytes;
                const targetPath = stream.path;
                if (isValidFile(fileOriName, mime, fileSize)) {
                    ctrl.body = {};
                    const conn = ctrl.conn;
                    const a = 1;
                } else {
                    ctrl.status = 400;
                    ctrl.body = {'message': 'invalid file'}
                }
            });
            console.log('uploading %s -> %s', part.filename, stream.path);
        }

        yield next;

    },
    put: function*(next) {

    },
    destroy: function*(next) {

    }
});
