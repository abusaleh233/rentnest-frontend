'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface Category {
  id: string;
  name: string;
}

export default function EditPropertyPage() {
  const { id } = useParams();
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    categoryId: '',
    isAvailable: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [propertyRes, categoryRes] = await Promise.all([
        fetch(
          `https://rentnest-backend-sage.vercel.app/api/properties/${id}`
        ),
        fetch(
          `https://rentnest-backend-sage.vercel.app/api/categories`
        ),
      ]);

      const property = await propertyRes.json();
      const categories = await categoryRes.json();

      const data = property.data;

      setFormData({
        title: data.title,
        description: data.description,
        price: data.price.toString(),
        location: data.location,
        categoryId: data.categoryId,
        isAvailable: data.isAvailable,
      });

      setCategories(categories.data || []);
    } catch (err) {
      console.log(err);
      alert('Property Load Failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setUpdating(true);

    try {
      const token = Cookies.get('token');

      const res = await fetch(
        `https://rentnest-backend-sage.vercel.app/api/properties/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            price: Number(formData.price),
            location: formData.location,
            categoryId: formData.categoryId,
            isAvailable: formData.isAvailable,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      alert('Property Updated Successfully');

      router.push('/dashboard/owner/properties');
    } catch (err: any) {
      alert(err.message || 'Update Failed');
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-80 items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">
      <h1 className="mb-8 text-3xl font-bold">
        ✏️ Edit Property
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="mb-2 block font-semibold">
            Property Title
          </label>

          <input
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Description
          </label>

          <textarea
            rows={5}
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-semibold">
              Price
            </label>

            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Location
            </label>

            <input
              value={formData.location}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />
          </div>

        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Category
          </label>

          <select
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({
                ...formData,
                categoryId: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3"
          >
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={formData.isAvailable}
            onChange={(e) =>
              setFormData({
                ...formData,
                isAvailable: e.target.checked,
              })
            }
          />

          <label>Available</label>
        </div>

        <button
          disabled={updating}
          className="w-full rounded-lg bg-indigo-600 py-3 font-bold text-white hover:bg-indigo-700"
        >
          {updating ? 'Updating...' : 'Update Property'}
        </button>

      </form>
    </div>
  );
}