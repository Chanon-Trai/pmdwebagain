'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/lib/auth';
import { API_ENDPOINTS } from '@/lib/api';

interface Article {
  id: number;
  title: string;
  text: string | null;
  hyperlink: string | null;
  created_at: string;
  updated_at: string;
}

interface Journal {
  id: number;
  month: string;
  title: string;
  text: string | null;
  hyperlink: string | null;
  created_at: string;
  updated_at: string;
}

interface Card {
  id: number;
  title: string;
  text: string | null;
  hyperlink: string | null;
  created_at: string;
  updated_at: string;
}

interface Order {
  id: number;
  year: string;
  title: string;
  category: string;
  date: string | null;
  link: string | null;
  file_path: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

type ContentType = 'articles' | 'journals' | 'cards' | 'orders';
type ContentItem = Article | Journal | Card | Order;

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ContentType>('articles');
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      // For orders, request all items with a high limit (admin doesn't need pagination)
      const endpoint = activeTab === 'orders' 
        ? `${API_ENDPOINTS[activeTab]}?limit=1000`
        : API_ENDPOINTS[activeTab];
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        // Handle paginated response (orders) vs direct array (articles, journals, cards)
        if (activeTab === 'orders' && data.data && Array.isArray(data.data)) {
          setItems(data.data);
        } else if (Array.isArray(data)) {
          setItems(data);
        } else {
          console.error('Unexpected data format:', data);
          setItems([]);
        }
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

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

    fetchItems();
  }, [fetchItems, router]);

  useEffect(() => {
    // Refresh items when window gains focus (user returns from edit page)
    const handleFocus = () => {
      fetchItems();
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchItems]);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const token = authService.getToken();
      const endpoint = `${API_ENDPOINTS[activeTab]}/${id}`;
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        fetchItems();
      } else {
        alert('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item');
    }
  };

  const handleEdit = (item: ContentItem) => {
    const url = `/admin/${activeTab}/${item.id}`;
    window.open(url, '_blank');
  };

  const handleAddNew = () => {
    const url = `/admin/${activeTab}/new`;
    window.open(url, '_blank');
  };

  const handleLogout = () => {
    authService.logout();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ฝ่ายบำรุงรักษาระบบไฟฟ้า (ฝบร.)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                ← Back to Homepage
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            {(['articles', 'journals', 'cards', 'orders'] as ContentType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-current'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                style={
                  activeTab === tab
                    ? { color: 'oklch(0.75 0.183 55.934)', borderColor: 'oklch(0.75 0.183 55.934)' }
                    : {}
                }
              >
                {tab === 'orders' ? 'Orders (คำสั่ง/ประกาศ)' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Add New Button */}
        <div className="mb-6">
          <button
            onClick={handleAddNew}
            className="px-4 py-2 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'oklch(0.75 0.183 55.934)' }}
            title="Opens in a new tab"
          >
            + Add New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).slice(0, -1)}
          </button>
        </div>

        {/* Items List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Loading...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">No items found</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Title
                  </th>
                  {activeTab === 'journals' && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Month
                    </th>
                  )}
                  {activeTab === 'orders' && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Year
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Category
                      </th>
                    </>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                      <div className="max-w-md truncate">{item.title}</div>
                    </td>
                    {activeTab === 'journals' && 'month' in item && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {item.month}
                      </td>
                    )}
                    {activeTab === 'orders' && 'year' in item && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {item.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                            item.category === 'คำสั่ง'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                            {item.category}
                          </span>
                        </td>
                      </>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(item)}
                        className="mr-3 text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                        title="Opens in a new tab"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

