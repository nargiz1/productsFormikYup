import './App.css';
import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';

function App() {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get('https://northwind.vercel.app/api/categories')
      .then(res => setCategories(res.data))
  }, [])

  console.log(categories)

  const formik = useFormik({
    initialValues: {
      categoryId: '',
      name: '',
      unitPrice: 0,
      unitsInStock: 0,
      discounted: false,
      quantityPerUnit: ''
    },
    validationSchema: Yup.object({
      categoryId: Yup.string()
        .required('Required'),
      name: Yup.string()
        .min(3, 'Must be at least 3 characters')
        .required('Required'),
      unitPrice: Yup.number()
        .required('Required'),
      unitsInStock: Yup.number()
        .required('Required'),
      discounted: Yup.bool()
        .required('Required'),
      quantityPerUnit: Yup.string()
        .required('Required'),
    }),
    onSubmit: (values) => {
      axios.post(`https://northwind.vercel.app/api/products`, values)
        .then(res => console.log(res))
    }
  })


  return (
    <div style={{ width: '87%', margin: 'auto', paddingTop: '20px' }}>
      <form onSubmit={formik.handleSubmit}>
        <h2>Add product</h2>
        <div style={{ marginBottom: '10px' }}>
          <select {...formik.getFieldProps('categoryId')}>
            {
              categories?.map((category) => (
                <option value={category.id} key={category.id}>{category.name}</option>
              ))
            }
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input type='text' name='name' placeholder='name...' {...formik.getFieldProps('name')} />
          {formik.touched.name && formik.errors.name ? (
            <p style={{color: 'red'}}>{formik.errors.name}</p>
          ) : null}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input type='number' name='unitPrice' placeholder='unit price' {...formik.getFieldProps('unitPrice')} />
          {formik.touched.unitPrice && formik.errors.unitPrice ? (
            <p style={{color: 'red'}}>{formik.errors.unitPrice}</p>
          ) : null}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input type='number' name='unitsInStock' placeholder='unitsInStock' {...formik.getFieldProps('unitsInStock')} />
          {formik.touched.unitsInStock && formik.errors.unitsInStock ? (
            <p style={{color: 'red'}}>{formik.errors.unitsInStock}</p>
          ) : null}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label for='discounted' >Discounted</label>
          <input type='checkBox' id='discounted' name='discounted' placeholder='quantityPerUnit' {...formik.getFieldProps('discounted')} />
          {formik.touched.discounted && formik.errors.discounted ? (
            <p style={{color: 'red'}}>{formik.errors.discounted}</p>
          ) : null}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input type='text' name='quantityPerUnit' placeholder='quantityPerUnit' {...formik.getFieldProps('quantityPerUnit')} />
          {formik.touched.quantityPerUnit && formik.errors.quantityPerUnit ? (
            <p style={{color: 'red'}}>{formik.errors.quantityPerUnit}</p>
          ) : null}
        </div>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
}

export default App;
