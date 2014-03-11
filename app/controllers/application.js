var Application = module.exports = function Application(init) {
    init.before(function protectFromForgeryHook(c) {
        c.protectFromForgery('6ff7ee0d4904368d73ffa0b83c469642e66be74d');
    });
};
