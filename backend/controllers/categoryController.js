const {
  InsertCategory,
  DeleteCategory,
  UpdateCategory
} = require("../services/categoryService");

exports.insert_category = async (req, res, next) => {
  const { categoryName } = req.body;

  InsertCategory({ categoryName })
    .then((result) => {
      const { statusCode = 200, message, data } = result;
      res.status(statusCode).send({ message, data });
    })
    .catch((err) => {
      const { statusCode = 400, message, data } = err;
      res.status(statusCode).send({ message, data }) && next(err);
    });
};


exports.update_category = async (req, res, next) => {
  const { catId } = req.params;
  const { categoryName } = req.body;

  UpdateCategory({ catId, categoryName })
    .then((result) => {
      const { statusCode = 200, message, data } = result;
      res.status(statusCode).send({ message, data });
    })
    .catch((err) => {
      const { statusCode = 400, message, data } = err;
      res.status(statusCode).send({ message, data }) && next(err);
    });
};

exports.delete_category = (req, res, next) => {
  DeleteCategory(req.params)
    .then((result) => {
      const { statusCode = 200, message, data } = result;
      res.status(statusCode).send({ message, data });
    })
    .catch((err) => {
      const { statusCode = 400, message, data } = err;
      res.status(statusCode).send({ message, data }) && next(err);
    });
};
