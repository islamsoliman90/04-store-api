const Product = require("../models/product");

const getAllProductStatic = async (req, res) => {
  const search = "ab";
  const product = await Product.find({
    name: { $regex: search, $options: "i" },
  }).select("name");
  res.status(200).json({ product, nbHits: product.length });
};
const getAllProduct = async (req, res) => {
  const { featured, company, name, sort, field, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured == "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
    };
    const regEx = /\b(<|>|<=|>=|=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options=['price', 'rating']
    filters = filters.split(",").forEach(item => {
      
      const[faild,operator,value]= item.split('-')
      if(options.includes(faild)){
        queryObject[faild] = { [operator] : Number( value) }; 
      }
    });
  }
  const result = Product.find(queryObject);
  if (sort) {
    // console.log(sort);
    const sortList = sort.split(",").join(" ");
    result.sort(sortList);
  } else {
    result.sort("createdAt");
  }
  if (field) {
    // console.log(sort);
    const fieldList = field.split(",").join(" ");
    result.select(fieldList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  let product = await result.skip(skip).limit(limit);
  res.status(200).json({ product, nbHits: product.length });
};
module.exports = { getAllProductStatic, getAllProduct };
