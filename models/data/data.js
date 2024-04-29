import 'dotenv/config.js'
import '../../config/database.js'
import { categories } from './categories.js'
import { departments } from './department.js'
import { products } from './products.js'
import { subCategories } from './subCategories.js'
import { users } from './users.js'
import Category from '../Category.js'
import Department from '../Department.js'
import Product from '../Product.js'
import Subcategory from '../subCategory.js'
import User from '../User.js'
import Discount from '../Discount.js'
import productSevices from '../../services/product.service.js'


/* const newDepartment = async (departments) => await Department.insertMany(departments)
const newUser = async (users) => await User.insertMany(users)

const newCategories = async (categories) => {
  for (const categorie of categories) {
    const department = await Department.findOne({ name: categorie.department_id })
    categorie.department_id = department._id
    await Category.create(categorie)
  }
}
const newSubCategories = async (subCategories) => {
  for (const sub of subCategories) {
    const category = await Category.findOne({ name: sub.category_id })
    sub.category_id = category._id
    await SubCategory.create(sub)
  }
} */

const newProduct = async (products) => {
  let i = 0
  for (const product of products) {
    i++
    console.log(i, product.name)
    const discount_id = await Discount.create({ active: false, percentage: 1 })
    const department = await Department.findOne({ name: product.department_id })
    const category = await Category.findOne({ name: product.category_id })
    const subCategory = await Subcategory.findOne({ name: product.subCategory_id})
    product.discount_id = discount_id._id
    product.department_id = department._id
    product.category_id = category._id
    product.subcategory_id = subCategory._id
    await productSevices.create(product)
    
    /* await Product.create(product) */
  }


}
const data = async () => {
  await newProduct(products);
}
/* const data = async () => {
  await newDepartment(departments)
  await newCategories(categories)
  await newUser(users)
  await newSubCategories(subCategories)
  await newProduct(products)
  console.log('Done!')
} */

data()
