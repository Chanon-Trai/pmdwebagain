import Navigation from '@/components/Navigation';

const safetyResources = [
  {
    title: 'คู่มือระบบการจัดการอาชีวอนามัยและความปลอดภัย',
    description: 'แนวทางปฏิบัติและกระบวนการหลักเพื่อให้เป็นไปตามมาตรฐาน ISO 45001:2018',
    linkLabel: 'ดาวน์โหลดฉบับล่าสุด',
    href: 'https://example.com/iso45001-manual.pdf',
  },
  {
    title: 'แบบฟอร์มประเมินความเสี่ยง',
    description: 'ใช้ประเมินความเสี่ยงของกิจกรรมบำรุงรักษาและปฏิบัติงานเสี่ยงสูง',
    linkLabel: 'เปิดแบบฟอร์ม',
    href: 'https://example.com/iso45001-risk-form',
  },
  {
    title: 'ตารางอบรมความปลอดภัย',
    description: 'สรุปหลักสูตรและรอบการอบรมที่เกี่ยวข้องกับความปลอดภัยประจำปี',
    linkLabel: 'ดูตารางอบรม',
    href: 'https://example.com/iso45001-training',
  },
];

const safetyUpdates = [
  {
    month: 'เมษายน 2567',
    summary: 'ปรับปรุงขั้นตอน Lockout/Tagout สำหรับสถานีย่อยขนาดใหญ่',
    linkLabel: 'อ่านรายละเอียด',
    href: '#update-april',
  },
  {
    month: 'มีนาคม 2567',
    summary: 'สรุปผลการตรวจติดตามภายในประจำไตรมาส 1',
    linkLabel: 'ดูรายงาน',
    href: '#update-march',
  },
  {
    month: 'กุมภาพันธ์ 2567',
    summary: 'เพิ่มรายการตรวจเช็คความปลอดภัยสำหรับงานบำรุงรักษาสายส่งใต้ดิน',
    linkLabel: 'ดาวน์โหลดรายการตรวจสอบ',
    href: '#update-february',
  },
];

export default function ISO45001Page() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-br from-amber-100 via-white to-amber-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-500 dark:text-gray-400 mb-4">
              Occupational Health & Safety
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              ISO 45001 : ระบบการจัดการอาชีวอนามัยและความปลอดภัย
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              ศูนย์รวมคู่มือ ขั้นตอน และลิงก์สำคัญเพื่อสนับสนุนการดำเนินงานตามมาตรฐาน ISO 45001 ภายใน ฝบร.
            </p>
          </div>
        </section>

        {/* Resources */}
        <section className="py-16 bg-white dark:bg-gray-900 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  เอกสารและเครื่องมือหลัก
                </p>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  ตัวอย่างลิงก์ที่คุณแก้ไขได้ตามต้องการ
                </h2>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {safetyResources.map((resource) => (
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

        {/* Updates */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  ตัวอย่างประกาศ / ขั้นตอนที่เกี่ยวข้อง
                </p>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  อัปเดตตามช่วงเวลา
                </h2>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {safetyUpdates.map((update) => (
                <article
                  key={update.href}
                  className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col"
                >
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">{update.month}</p>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{update.summary}</h3>
                  <a
                    href={update.href}
                    className="mt-auto inline-flex items-center text-sm font-semibold"
                    style={{ color: 'oklch(0.75 0.183 55.934)' }}
                  >
                    {update.linkLabel}
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

