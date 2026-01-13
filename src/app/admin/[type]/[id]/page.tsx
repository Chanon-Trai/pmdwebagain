'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { authService } from '@/lib/auth';
import { API_ENDPOINTS } from '@/lib/api';

type ContentType = 'articles' | 'journals' | 'cards' | 'orders';

interface FormData {
  title: string;
  text: string;
  hyperlink: string;
  month: string;
  year: string;
  category: string;
  date: string;
  display_order: string;
}

export default function EditContentPage() {
  const router = useRouter();
  const params = useParams();
  const type = params.type as ContentType;
  const id = params.id as string;
  const isEdit = id !== 'new';

  const [formData, setFormData] = useState<FormData>({
    title: '',
    text: '',
    hyperlink: '',
    month: '',
    year: '',
    category: 'คำสั่ง',
    date: '',
    display_order: '0',
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [existingFile, setExistingFile] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication
    const token = authService.getToken();
    if (!token) {
      router.push('/admin/login');
      return;
    }

    // Verify token
    authService.verifyToken(token).then((isValid) => {
      if (!isValid) {
        authService.logout();
        router.push('/admin/login');
      }
    });

    // Fetch item if editing
    if (isEdit) {
      fetchItem();
    }
  }, [type, id, router]);

  const fetchItem = async () => {
    try {
      const endpoint = `${API_ENDPOINTS[type]}/${id}`;
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          title: data.title || '',
          text: data.text || '',
          hyperlink: data.hyperlink || '',
          month: 'month' in data ? data.month : '',
          year: 'year' in data ? data.year : '',
          category: 'category' in data ? data.category : 'คำสั่ง',
          date: 'date' in data ? data.date : '',
          display_order: 'display_order' in data ? String(data.display_order) : '0',
        });
        if ('file_path' in data && data.file_path) {
          setExistingFile(data.file_path);
        }
      } else {
        alert('Failed to fetch item');
        router.push('/admin');
      }
    } catch (error) {
      console.error('Error fetching item:', error);
      alert('Error fetching item');
      router.push('/admin');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = authService.getToken();
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const endpoint = isEdit
        ? `${API_ENDPOINTS[type]}/${id}`
        : API_ENDPOINTS[type];

      const method = isEdit ? 'PUT' : 'POST';

      if (type === 'orders') {
        // Handle orders with file upload
        const formDataToSend = new FormData();
        formDataToSend.append('year', formData.year);
        formDataToSend.append('title', formData.title);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('date', formData.date || '');
        formDataToSend.append('display_order', formData.display_order);
        if (formData.hyperlink) {
          formDataToSend.append('link', formData.hyperlink);
        }
        if (selectedFile) {
          formDataToSend.append('file', selectedFile);
        }

        const response = await fetch(endpoint, {
          method,
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formDataToSend,
        });

        if (response.ok) {
          alert(isEdit ? 'Order updated successfully!' : 'Order created successfully!');
          window.close();
          setTimeout(() => {
            router.push('/admin');
          }, 100);
        } else {
          const error = await response.json();
          alert(error.error || `Failed to ${isEdit ? 'update' : 'create'} order`);
        }
        setSaving(false);
        return;
      }

      // Handle other types (articles, journals, cards)
      const body: any = {
        title: formData.title,
        text: formData.text || null,
        hyperlink: formData.hyperlink || null,
      };

      if (type === 'journals') {
        body.month = formData.month;
      }

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert(isEdit ? 'Item updated successfully!' : 'Item created successfully!');
        // Close this tab/window
        window.close();
        // If window.close() doesn't work, redirect to admin
        setTimeout(() => {
          router.push('/admin');
        }, 100);
      } else {
        const error = await response.json();
        alert(error.error || `Failed to ${isEdit ? 'update' : 'create'} item`);
      }
    } catch (error) {
      console.error('Error saving item:', error);
      alert(`Error ${isEdit ? 'updating' : 'creating'} item`);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    window.close();
    setTimeout(() => {
      router.push('/admin');
    }, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  const typeName = type === 'orders' ? 'Order' : type.charAt(0).toUpperCase() + type.slice(1).slice(0, -1);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isEdit ? 'Edit' : 'Create New'} {typeName}
            </h1>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {type === 'orders' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="e.g., 2568"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  >
                    <option value="คำสั่ง">คำสั่ง</option>
                    <option value="ประกาศ">ประกาศ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="e.g., 15 มกราคม 2568"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Document File (PDF, DOC, DOCX, XLS, XLSX)
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  {existingFile && !selectedFile && (
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Current file: <a href={existingFile.startsWith('http') ? existingFile : `http://localhost:3000${existingFile}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{existingFile.split('/').pop()}</a>
                    </p>
                  )}
                  {selectedFile && (
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    OR External URL / Link
                  </label>
                  <input
                    type="text"
                    value={formData.hyperlink}
                    onChange={(e) => setFormData({ ...formData, hyperlink: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="e.g., http://example.com/order.pdf or #order-link"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Note: If you upload a file, it will be used. Otherwise, this URL will be used.
                  </p>
                </div>
              </>
            )}
            {type === 'journals' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Month <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="e.g., เมษายน 2567"
                />
                {!isEdit && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Note: You can add multiple journal entries for the same month. They will be displayed together in the same card on the homepage.
                  </p>
                )}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Content (Text)
              </label>
              <textarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                URL Slug / Hyperlink
              </label>
              <input
                type="text"
                value={formData.hyperlink}
                onChange={(e) => setFormData({ ...formData, hyperlink: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                placeholder="e.g., #april-update or https://example.com"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 text-sm font-semibold text-white rounded-lg transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: 'oklch(0.75 0.183 55.934)' }}
              >
                {saving ? 'Saving...' : (isEdit ? 'Update' : 'Create')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

