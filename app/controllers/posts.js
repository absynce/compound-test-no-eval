var Application = require('./application');

var PostController = module.exports = function PostController(init) {
    Application.call(this, init);

    init.before(loadPost, {
        only: ['show', 'edit', 'update', 'destroy']
    });
};

require('util').inherits(PostController, Application);

PostController.prototype['new'] = function (c) {
    this.title = 'New Post';
    this.Post = new (c.Post);
    c.render();
};

PostController.prototype.create = function create(c) {
    c.Post.create(c.body.Post, function (err, Post) {
        c.respondTo(function (format) {
            format.json(function () {
                if (err) {
                    c.send({code: 500, error: err});
                } else {
                    c.send({code: 200, data: Post.toObject()});
                }
            });
            format.html(function () {
                if (err) {
                    c.flash('error', 'Post can not be created');
                    c.render('new', {
                        Post: Post,
                        title: 'New Post'
                    });
                } else {
                    c.flash('info', 'Post created');
                    c.redirect(c.pathTo.posts);
                }
            });
        });
    });
};

PostController.prototype.index = function index(c) {
    this.title = 'Post index';
    c.Post.all(function (err, posts) {
        c.respondTo(function (format) {
            format.json(function () {
                c.send(err ? {
                    code: 500,
                    error: err
                }: {
                    code: 200,
                    data: posts
                });
            });
            format.html(function () {
                c.render({
                    posts: posts
                });
            });
        });
    });
};

PostController.prototype.show = function show(c) {
    this.title = 'Post show';
    var Post = this.Post;
    c.respondTo(function (format) {
        format.json(function () {
            c.send({
                code: 200,
                data: Post
            });
        });
        format.html(function () {
            c.render();
        });
    });
};

PostController.prototype.edit = function edit(c) {
    this.title = 'Post edit';
    c.render();
};

PostController.prototype.update = function update(c) {
    var Post = this.Post;
    var self = this;

    this.title = 'Post edit';

    Post.updateAttributes(c.body.Post, function (err) {
        c.respondTo(function (format) {
            format.json(function () {
                if (err) {
                    c.send({
                        code: 500,
                        error: Post && Post.errors || err
                    });
                } else {
                    c.send({
                        code: 200,
                        data: Post.toObject()
                    });
                }
            });
            format.html(function () {
                if (!err) {
                    c.flash('info', 'Post updated');
                    c.redirect(c.pathTo.Post(Post));
                } else {
                    c.flash('error', 'Post can not be updated');
                    c.render('edit');
                }
            });
        });
    });

};

PostController.prototype.destroy = function destroy(c) {
    this.Post.destroy(function (error) {
        c.respondTo(function (format) {
            format.json(function () {
                if (error) {
                    c.send({
                        code: 500,
                        error: error
                    });
                } else {
                    c.send({code: 200});
                }
            });
            format.html(function () {
                if (error) {
                    c.flash('error', 'Can not destroy Post');
                } else {
                    c.flash('info', 'Post successfully removed');
                }
                c.send("'" + c.pathTo.posts + "'");
            });
        });
    });
};

function loadPost(c) {
    var self = this;
    c.Post.find(c.params.id, function (err, Post) {
        if (err || !Post) {
            if (!err && !Post && c.params.format === 'json') {
                return c.send({code: 404, error: 'Not found'});
            }
            c.redirect(c.pathTo.posts);
        } else {
            self.Post = Post;
            c.next();
        }
    });
}
