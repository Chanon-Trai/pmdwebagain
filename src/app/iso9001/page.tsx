import Navigation from '@/components/Navigation';

const qualityResources = [
  {
    title: 'Quality Manual',
    description: 'โครงสร้างระบบบริหารคุณภาพตามมาตรฐาน ISO 9001:2015 สำหรับงานบำรุงรักษา',
    linkLabel: 'ดาวน์โหลด Manual',
    href: 'https://example.com/iso9001-manual.pdf',
  },
  {
    title: 'Process Map',
    description: 'แผนภาพการไหลของกระบวนการหลักและสนับสนุน พร้อมจุดควบคุมคุณภาพ',
    linkLabel: 'เปิด Process Map',
    href: 'https://example.com/iso9001-process',
  },
  {
    title: 'Checklist Internal Audit',
    description: 'แบบฟอร์มตรวจติดตามภายใน ใช้ประเมินความสอดคล้องก่อนการ Audit',
    linkLabel: 'ดาวน์โหลด Checklist',
    href: 'https://example.com/iso9001-audit-checklist',
  },
];

const qualityInitiatives = [
  {
    title: 'Customer Feedback Loop',
    description: 'สรุปผลแบบสำรวจความพึงพอใจเดือนล่าสุด และแผนตอบสนอง',
    href: '#initiative-feedback',
  },
  {
    title: 'Continuous Improvement Board',
    description: 'รายการโครงการ Kaizen/Lean ที่กำลังดำเนินการภายใน ฝบร.',
    href: '#initiative-ci',
  },
  {
    title: 'Document Control Center',
    description: 'ตัวอย่างลิงก์ไปยังระบบควบคุมเอกสาร (DCC) สำหรับแบบฟอร์มและเวอร์ชันล่าสุด',
    href: '#initiative-dcc',
  },
];

export default function ISO9001Page() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-br from-indigo-100 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-500 dark:text-gray-400 mb-4">
              Quality Management System
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              ISO 9001 : ระบบบริหารคุณภาพ
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              หน้ารวมเอกสาร ขั้นตอน และลิงก์สำคัญเพื่อการจัดการคุณภาพอย่างต่อเนื่องในทุกกระบวนงานของ ฝบร.
            </p>
          </div>
        </section>

        {/* Key Resources */}
        <section className="py-16 bg-white dark:bg-gray-900 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  เอกสารอ้างอิงหลัก
                </p>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  ตั้งค่าเองได้ตามไฟล์จริงขององค์กร
                </h2>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {qualityResources.map((resource) => (
                <article
                  key={resource.title}
                  className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 flex flex-col"
                >
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">{resource.description}</p>
                  <a
                    href={resource.href}
                    className="mt-4 inline-flex items-center text-sm font-semibold"
                    style={{ color: 'oklch(0.75 0.183 55.934)' }}
                  >
                    {resource.linkLabel}
                    <span className="ml-2" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Initiatives */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  โครงการและจุดเน้นคุณภาพ
                </p>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  ตัวอย่างลิงก์เชื่อมต่อระบบอื่น
                </h2>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {qualityInitiatives.map((initiative) => (
                <article
                  key={initiative.title}
                  className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {initiative.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">{initiative.description}</p>
                  <a
                    href={initiative.href}
                    className="mt-auto inline-flex items-center text-sm font-semibold"
                    style={{ color: 'oklch(0.75 0.183 55.934)' }}
                  >
                    ดูรายละเอียด
                    <span className="ml-2" aria-hidden="true">
                      →
                    </span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

