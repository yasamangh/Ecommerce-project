const db = require("../database/db");

exports.InsertCategory = async (params) => {
  const { categoryName } = params;
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO categories (title) VALUES (?)`,
      [categoryName],
      (err, result) => {
        if (err) reject({ message: err, statusCode: 500 });
          resolve({
            statusCode: 200,
            message: `دسته بندی با موفقیت ایجاد شد `
          });
        }
    );
  });
};


exports.UpdateCategory = async (params) => {
  const { catId, categoryName } = params;
  let message = '';
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE categories SET title = ? WHERE id = ?`,
      [categoryName ,catId],
      (err, result) => {
        if (err) reject({ message: err, statusCode: 500 });
          if(result.affectedRows > 0){
            message =  `دسته بندی با موفقیت اپدیت شد `
          }else{
            message = `دسته بندی پیدا نشد!`
          }
          resolve({
            statusCode: 200,
            message: message
          });
          console.log(result)
        }
    );
  });
};

exports.DeleteCategory = async (params) => {
  const { catId } = params;
  let message = '';
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM categories WHERE id = ?`,
      [catId],
      (err, result) => {
        if (err) reject({ message: err, statusCode: 500 });
          if(result.affectedRows > 0){
            message =  `دسته بندی با موفقیت حذف شد `
          }else{
            message = `دسته بندی پیدا نشد!`
          }
          resolve({
            statusCode: 200,
            message: message
          });
          console.log(result)
        }
    );
  });
};