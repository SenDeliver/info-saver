module.exports = (router) => {
    return async (req, res, next) => {
        try {
            await router(req, res)
        } catch (e) {
            next(e);
        }
    };
};