'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import FeatureCard from '@/components/FeatureCard';
import { API_ENDPOINTS } from '@/lib/api';

interface Journal {
  id: number;
  month: string;
  title: string;
  text: string | null;
  hyperlink: string | null;
  created_at: string;
  updated_at: string;
}

export default function Home() {
  const [showWorkroomDetails, setShowWorkroomDetails] = useState(false);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);
  const [showArticleModal, setShowArticleModal] = useState(false);

  // Group journals by month and sort each group by most recent first
  const journalsByMonth = journals.reduce((acc, journal) => {
    const month = journal.month;
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(journal);
    return acc;
  }, {} as Record<string, Journal[]>);

  // Sort journals within each month by most recent first
  Object.keys(journalsByMonth).forEach(month => {
    journalsByMonth[month].sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  });

  // Convert to array and sort by most recent month first
  const monthGroups = Object.entries(journalsByMonth).sort((a, b) => {
    // Sort by the most recent journal in each group
    const aLatest = Math.max(...a[1].map(j => new Date(j.created_at).getTime()));
    const bLatest = Math.max(...b[1].map(j => new Date(j.created_at).getTime()));
    return bLatest - aLatest;
  });

  // Fetch journals from API
  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.journals);
        if (response.ok) {
          const data = await response.json();
          setJournals(data);
        } else {
          console.error('Failed to fetch journals');
        }
      } catch (error) {
        console.error('Error fetching journals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJournals();
  }, []);

  // Handle journal/item click - redirect if hyperlink exists, otherwise show modal
  const handleItemClick = (journal: Journal, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (journal.hyperlink) {
      // If hyperlink starts with http, open in new tab, otherwise navigate
      if (journal.hyperlink.startsWith('http://') || journal.hyperlink.startsWith('https://')) {
        window.open(journal.hyperlink, '_blank', 'noopener,noreferrer');
      } else if (journal.hyperlink.startsWith('#')) {
        // Internal anchor link
        window.location.href = journal.hyperlink;
      } else {
        // Relative path
        window.location.href = journal.hyperlink;
      }
    } else {
      // No hyperlink, show modal with full content
      setSelectedJournal(journal);
      setShowArticleModal(true);
    }
  };

  // Handle click on "รายละเอียดเพิ่มเติม" button - always show modal
  const handleViewDetails = (journal: Journal, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedJournal(journal);
    setShowArticleModal(true);
  };
  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(to bottom right, oklch(0.75 0.183 55.934 / 0.1), oklch(0.75 0.183 55.934 / 0.05))' }}>
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              ฝ่ายบำรุงรักษาระบบไฟฟ้า(ฝบร.)<br />Power System Maintenance Department
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
              เรามุ่งมั่นให้บริการบำรุงรักษา ปรับปรุงระบบการจ่ายไฟฟ้าให้เป็นไปตามมาตรฐาน มีความเชื่อมั่นและความปลอดภัยสูงสุดอย่างต่อเนื่องโดยคำนึงถึงผลกระทบต่อสังคมและสิ่งแวดล้อม
            </p>
            {/* <div className="flex gap-4 justify-center">
              <button className="px-8 py-3 text-white rounded-lg transition-opacity font-semibold hover:opacity-90" style={{ backgroundColor: 'oklch(0.75 0.183 55.934)' }}>
                Get Started
              </button>
              <button className="px-8 py-3 bg-white dark:bg-gray-800 border-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-semibold" style={{ color: 'oklch(0.75 0.183 55.934)', borderColor: 'oklch(0.75 0.183 55.934)' }}>
                Learn More
              </button>
            </div> */}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-gray-900 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
              ข้อมูลทั่วไป
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                title="ข้อมูลกิจกรรม ฝบร."
                description="ข้อมูลกิจกรรมที่ดำเนินอยู่ของ ฝบร."
                icon="📋"
                links={[
                  { label: 'CSA-การสอบทาน2568', url: 'https://meacloud-my.sharepoint.com/personal/2126806_meanet_mea_or_th/_layouts/15/onedrive.aspx?id=%2Fpersonal%2F2126806%5Fmeanet%5Fmea%5For%5Fth%2FDocuments%2FShare%2Dpmdweb%2FCSA-ข้อมูลการสอบทาน%202568&ga=1' },
                  { label: 'KM ฝบร.', url: 'https://meacloud.sharepoint.com/sites/PMD-KM/SitePages/LearningTeamHome.aspx?ga=1' },
                  { label: 'AAR ฝบร.', url: 'https://example.com/pmd-report' },
                  { label: 'รายงานผลการวิเคราะห์กรณีเพลิงไหม้หม้อแปลง สย.แสนแสบ', url: 'https://meacloud-my.sharepoint.com/:b:/g/personal/2126806_meanet_mea_or_th/EWci9rQ4j61FlTAPw3YvY9YB4B8L9wAl8A-QtCin3MR7fA?e=aWYCiU' },
                ]}
              />
              <FeatureCard
                title="ระบบข้อมูล - ฝบร."
                description="ฐานข้อมูลและแดชบอร์ดสนับสนุนการบริหารงาน"
                icon="💾"
                links={[
                  { label: 'SAIFI/SAIDI - ฝบร.', url: 'https://app.powerbi.com/view?r=eyJrIjoiNGVmNTNmMjAtYTQyYy00NzZhLWJiYWQtOTkwZDVkZjhkY2FjIiwidCI6ImZlYmM0NDkwLTY2MjEtNGJkNy1iZmI1LTZmMDkyZjhiN2ZhYyIsImMiOjEwfQ%3D%3D&pageName=ReportSection' },
                  { label: 'Power BI กปค.1-2', url: 'https://app.powerbi.com/view?r=eyJrIjoiZTg0MGE4ZjUtOWQ4ZC00M2Q4LWI1ZTEtZWRjZDE5YmUyYTZjIiwidCI6ImZlYmM0NDkwLTY2MjEtNGJkNy1iZmI1LTZmMDkyZjhiN2ZhYyIsImMiOjEwfQ%3D%3D&pageName=ReportSection2bf08ed6c7c21dce22b2' },
                  { label: 'ระบบข้อมูล กปค.1-2', url: 'https://sites.google.com/view/pad-1-2?usp=sharing' },
                  { label: 'อายุการใช้งานสินทรัพย์', url: 'http://pmdweb.mea.or.th/images/pmddata/ASSET/B62_437_ข้อบังคับว่าด้วยค่าเสื่อมราคาทรัพย์สิน.pdf' },
                  { label: 'ISO27001 - ฝบร.', url: 'https://example.com/pmd-download' },
                ]}
              />
              <FeatureCard
                title="ระบบงาน ฝบร."
                description="ติดตามงานและคำสั่งปฏิบัติการแบบเรียลไทม์."
                icon="🛠️"
                links={[
                  { 
                    label: 'ห้องเวรไฟฟ้า ฝบร.', 
                    url: '#',
                    onClick: () => setShowWorkroomDetails(!showWorkroomDetails)
                  },
                ]}
              />
              <FeatureCard
                title="ข้อมูลหน่วยงาน ฝคฟ."
                description="รวมช่องทางติดต่อและทรัพยากรของ ฝคฟ."
                icon="🏢"
                links={[
                  { label: 'อุปกรณ์สถานีไฟฟ้า ', url: 'https://app.powerbi.com/view?r=eyJrIjoiNTlmMzkzYWMtZTljYi00ZjY4LTlhNWYtOTAyZWRhODIyNmJmIiwidCI6ImZlYmM0NDkwLTY2MjEtNGJkNy1iZmI1LTZmMDkyZjhiN2ZhYyIsImMiOjEwfQ%3D%3D&pageName=ReportSectionbce1ea962e805dc06f94' },
                  { label: 'ฝ่ายควบคุมระบบไฟฟ้า', url: 'http://pcdweb/#features' },
                  { label: 'สรุปข้อมูล RTU (Power BI)', url: 'https://app.powerbi.com/view?r=eyJrIjoiNTYzMTQ3ZjEtNGI4Ny00NWI4LWI2ZTQtZTBkNWJkNWRiZTQ3IiwidCI6ImZlYmM0NDkwLTY2MjEtNGJkNy1iZmI1LTZmMDkyZjhiN2ZhYyIsImMiOjEwfQ%3D%3D' },
                  { label: 'งาน Work Permit (OWMS)', url: 'https://owms.mea.or.th/app/login.html' },
                  { label: 'File Sharing Switching Order ', url: 'http://pcdweb/pod/pm/SwitchingOrder/website/home.html' },
                  { label: 'รายงานศูนย์ควบคุมระบบไฟฟ้า', url: 'http://pcdweb/dcc/cc_report/index.html' },
                  { label: 'ค่ากระแส Short circuit ในระบบไฟฟ้า', url: 'http://pcdweb/Pad/Pa/PAWEB/sc/' },
                ]}
                maxVisibleLinks={4}
              />
            </div>
          </div>
        </section>

        {/* Monthly Updates Section */}
        <section
          className="py-20 px-4"
          style={{
            background: 'linear-gradient(to bottom right, oklch(0.75 0.183 55.934 / 0.1), oklch(0.75 0.183 55.934 / 0.05))'
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Update ข้อมูล / ข่าวสาร ฝบร.
                </h3>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  {journals.length > 0 ? `ประจำปี ${new Date(journals[0].created_at).getFullYear()}` : 'ประจำปีล่าสุด'}
                </h2>
              </div>
            </div>
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">กำลังโหลดข้อมูล...</p>
              </div>
            ) : journals.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">ยังไม่มีข้อมูลข่าวสาร</p>
              </div>
            ) : (
              <div className="space-y-6">
                {monthGroups.map(([month, monthJournals], monthIndex) => (
                  <article
                    key={month}
                    className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Update ข้อมูล / ข่าวสาร ฝบร. ประจำเดือน {month}
                      </h3>
                      {monthIndex === 0 && (
                        <span className="inline-flex items-center rounded-full bg-red-100 dark:bg-red-900/30 px-2.5 py-0.5 text-xs font-semibold text-red-700 dark:text-red-400">
                          NEW
                        </span>
                      )}
                    </div>
                    <ul className="space-y-3">
                      {monthJournals.map((journal) => (
                        <li key={journal.id} className="flex items-start">
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 mt-2 mr-3"></span>
                          <div className="flex-1 min-w-0">
                            <div className="text-base text-gray-900 dark:text-white mb-1">
                              {journal.title}
                            </div>
                            {journal.text && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {journal.text}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-2">
                              {journal.hyperlink ? (
                                <a
                                  href={journal.hyperlink}
                                  target={journal.hyperlink.startsWith('http') ? '_blank' : '_self'}
                                  rel="noopener noreferrer"
                                  onClick={(e) => {
                                    if (!journal.hyperlink?.startsWith('http')) {
                                      e.preventDefault();
                                      handleItemClick(journal, e);
                                    }
                                  }}
                                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
                                >
                                  {journal.hyperlink.startsWith('http') ? 'เปิดลิงก์' : 'ดูรายละเอียด'}
                                </a>
                              ) : (
                                <button
                                  onClick={(e) => handleViewDetails(journal, e)}
                                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
                                >
                                  ดูรายละเอียด
                                </button>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Credit Section */}
        <section className="py-12 bg-white dark:bg-gray-900 px-4">
          <div className="max-w-6xl mx-auto flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="md:w-2/3">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-3">
                © 2025 ฝ่ายบำรุงรักษาระบบไฟฟ้า (ฝบร.)
              </p>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                การไฟฟ้านครหลวง | Metropolitan Electricity Authority
              </h2>
            </div>
            <div className="md:w-1/3 bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
              <p className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-2">
                ติดต่อ ฝบร. / การไฟฟ้านครหลวง
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                ฝ่ายบำรุงรักษาระบบไฟฟ้า
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                การไฟฟ้านครหลวง (MEA) 
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <p>Callcenter: 1130 </p>
                <p>Email: callcenter@mea.or.th</p>
                <p>เวลาทำการ: จันทร์-ศุกร์ 07:30-15:30 น.</p>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-4 text-center">
            <a
              href="/admin/login"
              className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
            >
              Admin
            </a>
          </div>
        </section>

        {/* Journal Detail Modal */}
        {showArticleModal && selectedJournal && (
          <section className="fixed inset-0 z-50 bg-white dark:bg-gray-900 overflow-y-auto" style={{ zIndex: 9999 }}>
            <div className="min-h-screen py-12 px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                      {selectedJournal.month}
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                      {selectedJournal.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setShowArticleModal(false);
                      setSelectedJournal(null);
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="ปิด"
                  >
                    <svg
                      className="w-6 h-6 text-gray-600 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="space-y-6">
                  {selectedJournal.text && (
                    <div className="prose dark:prose-invert max-w-none">
                      <div className="text-base text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                        {selectedJournal.text}
                      </div>
                    </div>
                  )}
                  {selectedJournal.hyperlink && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <a
                        href={selectedJournal.hyperlink}
                        target={selectedJournal.hyperlink.startsWith('http') ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-base font-semibold hover:opacity-80 transition-opacity"
                        style={{ color: 'oklch(0.75 0.183 55.934)' }}
                      >
                        {selectedJournal.hyperlink.startsWith('http') ? 'เปิดลิงก์ภายนอก' : 'ไปยังลิงก์'}
                        <span className="ml-2" aria-hidden="true">
                          {selectedJournal.hyperlink.startsWith('http') ? '↗' : '→'}
                        </span>
                      </a>
                    </div>
                  )}
                  <div className="text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p>อัปเดตล่าสุด: {new Date(selectedJournal.updated_at).toLocaleString('th-TH')}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Workroom Details Fullscreen Section */}
        {showWorkroomDetails && (
          <section className="fixed inset-0 z-50 bg-white dark:bg-gray-900 overflow-y-auto">
            <div className="min-h-screen py-12 px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    ห้องเวรไฟฟ้า ฝบร.
                  </h2>
                  <button
                    onClick={() => setShowWorkroomDetails(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="ปิด"
                  >
                    <svg
                      className="w-6 h-6 text-gray-600 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      เอกสาร:
                    </h3>
                    <div className="space-y-3">
                      <a
                        href="https://meacloud-my.sharepoint.com/personal/2126806_meanet_mea_or_th/_layouts/15/onedrive.aspx?id=%2Fpersonal%2F2126806%5Fmeanet%5Fmea%5For%5Fth%2FDocuments%2FShare%2Dpmdweb%2F%E0%B8%95%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B8%87%E0%B9%80%E0%B8%A7%E0%B8%A3%202568&ga=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-base font-semibold hover:opacity-80 transition-opacity"
                        style={{ color: 'oklch(0.75 0.183 55.934)' }}
                      >
                        ตารางเวรประจำปี 2568
                        <span className="ml-2" aria-hidden="true">
                          ↗
                        </span>
                      </a>
                      <a
                        href="https://meacloud-my.sharepoint.com/personal/2126806_meanet_mea_or_th/_layouts/15/onedrive.aspx?id=%2Fpersonal%2F2126806%5Fmeanet%5Fmea%5For%5Fth%2FDocuments%2FShare%2Dpmdweb%2F%E0%B8%95%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B8%87%E0%B9%80%E0%B8%A7%E0%B8%A3%202568&ga=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-base font-semibold hover:opacity-80 transition-opacity"
                        style={{ color: 'oklch(0.75 0.183 55.934)' }}
                      >
                        ตารางเวรประจำปี 2568
                        <span className="ml-2" aria-hidden="true">
                          ↗
                        </span>
                      </a>
                      {/* TODO: Update this URL with the real domain name when available
                          TODO: แก้ไข URL นี้ด้วยชื่อโดเมนจริงเมื่อพร้อมใช้งาน */}
                      <a
                        href="http://localhost:3000/about/orders"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-base font-semibold hover:opacity-80 transition-opacity"
                        style={{ color: 'oklch(0.75 0.183 55.934)' }}
                      >
                        คำสั่งแต่งตั้งคณะกรรมการดูแลการอยู่เวร
                        <span className="ml-2" aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      ติดต่อ:
                    </h3>
                    <div className="text-base text-gray-600 dark:text-gray-400 space-y-2">
                      <p>โทรศัพท์: 02 - 2256189</p>
                      <p>เบอร์ภายใน: 702 - 4106, 702 - 4361</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      รายละเอียดสำคัญ
                    </h3>
                    <div className="space-y-3">
                      <a
                        href="/เบอร์โทรศัพท์ลูกค้าที่รับไฟแรงสูง.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-base font-semibold hover:opacity-80 transition-opacity"
                        style={{ color: 'oklch(0.75 0.183 55.934)' }}
                      >
                        เบอร์โทรศัพท์ลูกค้าที่รับไฟแรงสูง <p className="text-xs text-gray-400 dark:text-gray-500">(ฝคฟ. 2561)</p>
                      </a>
                      <a
                        href="/รายชื่อลูกค้า_กปค1_2.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-base font-semibold hover:opacity-80 transition-opacity"
                        style={{ color: 'oklch(0.75 0.183 55.934)' }}
                      >
                        รายชื่อลูกค้า ของแผนก ปค.1-ปค.6 กปค.1,2 
                        <p className="text-xs text-gray-400 dark:text-gray-500">(1 เม.ย. 2563)</p>
                      </a>
                      <a
                        href="https://meacloud-my.sharepoint.com/:x:/g/personal/2126806_meanet_mea_or_th/Ea1cyj6XaV1Dt8NvHiaBgU0BK_IWd0ILEm0Z8k5EVr5h8w"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-base font-semibold hover:opacity-80 transition-opacity"
                        style={{ color: 'oklch(0.75 0.183 55.934)' }}
                      >
                        รายชื่อสถานีติดตั้ง LTF / MLTF ปค.1-ปค.6 
                        <p className="text-xs text-gray-400 dark:text-gray-500">(2568)</p>
                      </a>
                      <a
                        href="\คู่มือการอยู่เวร_กปค12.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-base font-semibold hover:opacity-80 transition-opacity"
                        style={{ color: 'oklch(0.75 0.183 55.934)' }}
                      >
                        ขั้นตอนการปฏิบัติสำหรับพนักงานอยู่เวรเฝ้าไฟ กปค.1&2 
                        <p className="text-xs text-gray-400 dark:text-gray-500">(2 ธ.ค. 2562)</p>
                      </a>
                      <a
                        href="\ระเบียบอยู่เวรใหม่260760.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-base font-semibold hover:opacity-80 transition-opacity"
                        style={{ color: 'oklch(0.75 0.183 55.934)' }}
                      >
                        ระเบียบการอยู่เวร ฝบร. 
                        <p className="text-xs text-gray-400 dark:text-gray-500">(คำสั่งที่ ฝบร.21/2560) </p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
