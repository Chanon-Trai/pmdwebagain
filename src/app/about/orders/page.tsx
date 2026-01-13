'use client';

import Navigation from '@/components/Navigation';
import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '@/lib/api';

// Order type definition
type Order = {
  id: number;
  year: string;
  title: string;
  category: 'คำสั่ง' | 'ประกาศ';
  date: string;
  link: string;
  file_path?: string | null;
  display_order?: number;
};

export default function OrdersPage() {
  const [ordersByYear, setOrdersByYear] = useState<Record<string, Order[]>>({});
  const [years, setYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(API_ENDPOINTS.orders + '/by-year');
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        
        const data = await response.json();
        setOrdersByYear(data);
        
        // Extract and sort years
        const yearList = Object.keys(data).sort((a, b) => parseInt(b) - parseInt(a));
        setYears(yearList);
        
        // Set default selected year to most recent
        if (yearList.length > 0 && !selectedYear) {
          setSelectedYear(yearList[0]);
        }
        setCurrentPage(1); // Reset to page 1 when data loads
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
        // Fallback to empty state
        setOrdersByYear({});
        setYears([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const selectedOrders = ordersByYear[selectedYear] || [];
  
  // Pagination calculations
  const totalPages = Math.ceil(selectedOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = selectedOrders.slice(startIndex, endIndex);
  
  // Reset to page 1 when year changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedYear]);
  
  // Update link to use file_path if available
  const getOrderLink = (order: Order) => {
    if (order.file_path) {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      return order.file_path.startsWith('http') ? order.file_path : `${baseUrl}${order.file_path}`;
    }
    return order.link || '#';
  };

  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* Hero */}
        <section
          className="relative py-20 px-4 flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: "url('/Relay.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
          <div className="relative max-w-4xl mx-auto text-center text-white">
            <p className="text-sm uppercase tracking-[0.5em] text-indigo-200 mb-4">
              ประกาศ / คำสั่ง ฝบร. 
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow">
              ประกาศ / คำสั่ง ฝ่ายบำรุงรักษาระบบไฟฟ้า
            </h1>
            <p className="text-lg text-gray-100 drop-shadow">
              สรุปประกาศและคำสั่งสำคัญที่ออกโดยฝ่ายบำรุงรักษาระบบไฟฟ้า (ฝบร.) เพื่อการติดตามที่สะดวกและรวดเร็ว
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white dark:bg-gray-900 px-4">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">กำลังโหลดข้อมูล...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  ลองใหม่อีกครั้ง
                </button>
              </div>
            ) : (
              <div className="grid gap-8 lg:grid-cols-10">
                {/* Sidebar - 2 columns (Left) */}
                <div className="lg:col-span-2">
                  <div className="sticky top-24">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        เลือกปี
                      </h3>
                      <div className="space-y-2">
                        {years.length === 0 ? (
                          <p className="text-sm text-gray-500 dark:text-gray-400">ไม่มีข้อมูล</p>
                        ) : (
                          years.map((year) => {
                        const isSelected = year === selectedYear;
                        const orderCount = ordersByYear[year]?.length || 0;
                        return (
                          <button
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                              isSelected
                                ? 'text-white shadow-md'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            style={
                              isSelected
                                ? { backgroundColor: 'oklch(0.75 0.183 55.934)' }
                                : {}
                            }
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold">ปี {year}</span>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  isSelected
                                    ? 'bg-white/20 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                }`}
                              >
                                {orderCount}
                              </span>
                            </div>
                            <div className="text-xs mt-1 opacity-75">
                              คำสั่ง / ประกาศ ฝบร.
                            </div>
                          </button>
                        );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content Area - 8 columns (Right) */}
                <div className="lg:col-span-8">
                  {selectedYear ? (
                    <>
                      <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                          คำสั่ง / ประกาศ ฝบร. ปี {selectedYear}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          จำนวนทั้งหมด {selectedOrders.length} รายการ
                          {selectedOrders.length > itemsPerPage && (
                            <span> (แสดง {startIndex + 1}-{Math.min(endIndex, selectedOrders.length)} จาก {selectedOrders.length})</span>
                          )}
                        </p>
                      </div>

                      {/* Table */}
                      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                        <table className="w-full">
                          <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider w-16">
                                ลำดับ
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                ชื่อเรื่อง
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider w-32">
                                ประเภท
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider w-40">
                                วันที่
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider w-24">
                                รายละเอียด
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {paginatedOrders.map((order, index) => (
                              <tr
                                key={order.id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                  {startIndex + index + 1}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                                  {order.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                                      order.category === 'คำสั่ง'
                                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    }`}
                                  >
                                    {order.category}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                                  {order.date || '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                  <a
                                    href={getOrderLink(order)}
                                    target={getOrderLink(order).startsWith('http') ? '_blank' : undefined}
                                    rel={getOrderLink(order).startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="font-semibold hover:opacity-80 transition-opacity"
                                    style={{ color: 'oklch(0.75 0.183 55.934)' }}
                                  >
                                    ดูรายละเอียด →
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {selectedOrders.length === 0 && (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                          ไม่พบข้อมูลในปี {selectedYear}
                        </div>
                      )}

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="mt-6 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                              disabled={currentPage === 1}
                              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              ก่อนหน้า
                            </button>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              หน้า {currentPage} จาก {totalPages}
                            </span>
                            <button
                              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                              disabled={currentPage === totalPages}
                              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              ถัดไป
                            </button>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                              let pageNum;
                              if (totalPages <= 5) {
                                pageNum = i + 1;
                              } else if (currentPage <= 3) {
                                pageNum = i + 1;
                              } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                              } else {
                                pageNum = currentPage - 2 + i;
                              }
                              return (
                                <button
                                  key={pageNum}
                                  onClick={() => setCurrentPage(pageNum)}
                                  className={`px-3 py-1 text-sm font-medium rounded-lg ${
                                    currentPage === pageNum
                                      ? 'text-white'
                                      : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                                  }`}
                                  style={currentPage === pageNum ? { backgroundColor: 'oklch(0.75 0.183 55.934)' } : {}}
                                >
                                  {pageNum}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                      กรุณาเลือกปี
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
