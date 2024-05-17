"use client"
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Endpoint from '@/app/constant/constant';
import { useRouter } from 'next/navigation';
import { useUserToken } from '@/app/context/UserTokenContext';
import FormEditDiscount from './formeditdiscount';
import { DiscountContext } from '@/app/context/DiscountContext';

const FormEditProduct = ({id}) => {
  const { discount, setDiscount } = useContext(DiscountContext);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [weight, setWeight] = useState('');
  const [photo, setPhoto] = useState(null);
  const { token, setToken } = useUserToken();
  const router = useRouter();

  const handleAddDiscount = () => {
    setDiscount([...discount, { constraint: 0, discount: 0, description: '' }]);
  };

  useEffect(() => {
        console.log(id)
        axios.get(Endpoint.BASE_URL + Endpoint.VIEWPRODUCT + '/' + id, { 
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log('Product:', response);
                const { product } = response.data;
                setProductName(product.name);
                setCategory(product.categori_id);
                setDescription(product.description);
                setPrice(product.price);
                setStock(product.stock);
                setWeight(product.weight);
                setDiscount(product.discounts.map((d) => ({ constraint: d.constraint, discount: d.discounts, description: d.description })));
                // setDiscount(product.discounts);
                // setDiscountDescription(product.discounts.map((d) => d.description));
                // setConstraintDiscount(product.discounts.map((d) => d.constraint));
            })
            .catch((error) => {
                console.error('Gagal melakukan permintaan:', error);
        });
  }, [id])

  useEffect(() => {
    axios.get(Endpoint.BASE_URL + Endpoint.CATEGORY, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        console.log(response.data.category);
        setCategoryList(response.data.category);
    })
    .catch((error) => {
        console.error('Gagal melakukan permintaan:', error);
    });
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nama Product:', productName);
    const formData = new FormData();

    formData.append('id', id);
    formData.append('name', productName);
    formData.append('categori_id', category);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('weight', weight);
    formData.append('description', description);
    formData.append('photo', photo);
    formData.append('discount', JSON.stringify(discount));
    console.log(formData.get('discount'))
    // formData.append('constraintDiscount', JSON.stringify(constraintDiscount));
    // formData.append('discount', JSON.stringify(discount));
    // formData.append('discountDescription', JSON.stringify(discountDescription));

    axios.post(Endpoint.BASE_URL + Endpoint.UPDATEPRODUCT, formData,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        }
    )
    .then((response) => {
        // Tangani respons dari server di sini
        console.log('Response dari server:', response.data);
        setDiscount([]);
        router.replace('/dashboard/products');
    })
    .catch((error) => {
        // Tangani error jika request gagal
        console.error('Error:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
    <div className='flex space-x-5'>
        <div className="w-[50%] mb-4 flex flex-col border-gray border-2 p-4">
            <div>
                <label className="block mb-2 text-gray-900 text-lg border-b-2" htmlFor="productName">
                Edit Data Product
                </label>
            </div>
            <div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-800" htmlFor="productName">
                    Nama Product
                    </label>
                    <input
                    type="text"
                    id="productName"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-800">Pilih Category</label>
                    <select
                    className="w-full px-4 py-2 border rounded-lg"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    >
                    <option value="" disabled>
                        Pilih Category
                    </option>
                    {categoryList.map((c) => (
                        <option key={c.id} value={c.id}>
                        {c.name}
                        </option>
                    ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-800" htmlFor="productName">
                    Deskripsi
                    </label>
                    <input
                    type="text"
                    id="productName"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-800">Pilih Foto</label>
                    <input
                        type="file"
                        id="photo"
                        className="w-full px-4 py-2 border rounded-lg"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-800" htmlFor="productName">
                    Harga Product ( Rupiah )
                    </label>
                    <input
                    type="number"
                    id="price"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-800" htmlFor="productName">
                    Berat Product ( gram )
                    </label>
                    <input
                    type="number"
                    id="weight"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-800" htmlFor="productName">
                    Stock Product
                    </label>
                    <input
                    type="number"
                    id="stock"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    />
                </div>
            </div>
        </div>
        <div className='w-[50%]'>
                <div className="mb-4 flex flex-col border-gray border-2 p-4 w-full">
                    <div className="mb-2 p-4 border-b-2 flex flex-row w-full justify-between">
                        <span className='text-gray-900 text-lg'>Diskon</span>
                        <span onClick={handleAddDiscount} className='px-4 py-2 bg-green-300 cursor-pointer'>Tambahkan Discount</span>
                    </div>
                    {discount && discount.map((d, index) => (
                    <div key={index}>
                        <FormEditDiscount
                        index={index}
                        />
                    </div>
                    ))}
                </div>
        </div>
    </div>        
        <div className="text-center">
            <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
            Submit
            </button>
        </div>
    </form>
  );
};

export default FormEditProduct;
