"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Endpoint from '@/app/constant/constant';
import { useRouter } from 'next/navigation';
import { useUserToken } from '@/app/context/UserTokenContext';

const FormProduct = () => {
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

    formData.append('name', productName);
    formData.append('categori_id', category);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('weight', weight);
    formData.append('description', description);
    formData.append('photo', photo);

    axios.post(Endpoint.BASE_URL + Endpoint.SAVEPRODUCT, formData,
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
        router.back();
    })
    .catch((error) => {
        // Tangani error jika request gagal
        console.error('Error:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md w-full">
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

export default FormProduct;
