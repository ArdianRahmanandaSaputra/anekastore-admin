"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Endpoint from "@/app/constant/constant";
import { useRouter } from "next/navigation";
import { useUserToken } from "@/app/context/UserTokenContext";

const FormCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const { token, setToken } = useUserToken();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nama Category:", categoryName);

    const postData = {
      name: categoryName,
      description: description,
      photo: photo,
    };
    axios
      .post(Endpoint.BASE_URL + Endpoint.SAVECATEGORY, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Tangani respons dari server di sini
        console.log("Response dari server:", response.data);
        router.back();
      })
      .catch((error) => {
        // Tangani error jika request gagal
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md w-full">
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
        <label className="block mb-2 text-gray-800" htmlFor="categoryName">
          Nama Kategori
        </label>
        <input
          type="text"
          id="categoryName"
          className="w-full px-4 py-2 border rounded-lg"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block mb-2 text-gray-800"
          htmlFor="categoryDescription"
        >
          Deskripsi
        </label>
        <input
          type="text"
          id="categoryDescription"
          className="w-full px-4 py-2 border rounded-lg"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {(!categoryName || !description) && (
        <p className="text-red-500">Nama Category dan Deskripsi harus diisi.</p>
      )}
      {!photo && <p className="text-red-500">Pilih Foto harus diisi.</p>}
      <div className="text-center">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          disabled={!categoryName || !description || !photo}
          style={{
            cursor:
              !categoryName || !description || !photo
                ? "not-allowed"
                : "pointer",
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormCategory;