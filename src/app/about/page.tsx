import Navigation from '@/components/Navigation';

export default function About() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* About Hero Section */}
        <section
          className="relative py-24 px-4 flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: "url('/Relay.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
          <div className="relative max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow">
              ฝ่ายบำรุงรักษาระบบไฟฟ้า(ฝบร.)<br />Power System Maintenance Department
            </h1>
            <p className="text-lg text-gray-100 drop-shadow">
              มุ่งมั่นสร้างความมั่นคงปลอดภัยให้ระบบจำหน่ายไฟฟ้าด้วยเทคโนโลยีและทีมงานมืออาชีพ
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-12 bg-white dark:bg-gray-900 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 items-center">
              <div className="col-span-2">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  ประวัติความเป็นมา ฝบร.
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-400 mb-4">
                  ฝ่ายบำรุงรักษาระบบไฟฟ้า ได้รับการปรับผังโครงสร้างมาจาก กองบำรุงรักษาสถานีย่อยและสายส่ง กับ กองเครื่องวัดรีเลย์และสื่อสาร ฝ่ายควบคุมระบบไฟฟ้าเมื่อปี 2529 โดยจัดแบ่งหน่วยงานในสังกัดเป็น 3 กอง และ 14 แผนก คือ กองบำรุงรักษาสถานีย่อยและสายส่ง (แบ่งเป็น แผนกอุปกรณ์สถานีย่อย 1 แผนกอุปกรณ์สถานีย่อย 2 แผนกรักษาสายส่ง 1และ แผนกรักษาสายส่ง 2) กองทดสอบอุปกรณ์และเครื่องวัด (แบ่งเป็น แผนกทดสอบอุปกรณ์ แผนกทดสอบเครื่องวัด แผนกซ่อมเครื่องวัด) กองรีเลย์สื่อสารและโทรมาตร (แบ่งเป็น แผนกรีเลย์ 1 แผนกรีเลย์ 2 แผนกวิทยุสื่อสาร แผนกสื่อสารข้อมูล แผนกโทรมาตร) และอีก 2 แผนก ขึ้นตรงกับผู้อำนวยการฝ่าย คือ แผนกงานเลขานุการ แผนกคลังพัสดุอุปกรณ์ระบบไฟฟ้า
                </p>
                <p className="text-base text-gray-600 dark:text-gray-400 mb-4">
                  ต่อมาฝ่ายบำรุงรักษาระบบไฟฟ้าได้ปรับโครงสร้างใหม่ตามแผนปรับปรุงองค์กรของการไฟฟ้านครหลวง
                </p>
                <p className="text-base text-gray-600 dark:text-gray-400 mb-4">
                ฝ่ายบำรุงรักษาระบบไฟฟ้า ประกอบด้วย 5 กอง คือ กองบำรุงรักษาสายส่งอากาศ กองบำรุงรักษาสายส่งใต้ดิน กองบำรุงรักษาอุปกรณ์สถานีย่อย กองระบบป้องกันและควบคุมอัตโนมัติ 1 กองระบบป้องกันและควบคุมอัตโนมัติ 2 และแผนกบริหารทั่วไป ขึ้นตรงกับ ผู้อำนวยการฝ่ายตามที่แสดงในผังโครงสร้างฝ่ายบำรุงรักษาระบบไฟฟ้า ข้อ 3.1.2
                </p>
                <p className="text-base text-gray-600 dark:text-gray-400 mb-4">
                งานในขอบเขตที่ขอรับใบรับรอง ISO 9001 ครอบคลุมงานทั้ง 5 กอง 1 แผนกคือ กองบำรุงรักษาสายส่งอากาศ กองบำรุงรักษาสายส่งใต้ดิน กองบำรุงรักษาอุปกรณ์สถานีย่อย กองระบบป้องกันและควบคุมอัตโนมัติ 1 กองระบบป้องกันและควบคุมอัตโนมัติ 2 และแผนกบริหารทั่วไป ของฝ่ายบำรุงรักษาระบบไฟฟ้าทั้งหมด
                </p>
              </div>
              <div className="rounded-lg p-4 h-64 flex items-center justify-center bg-transparent">
                <img 
                  src="/ฝบร.68.jpg"
                  alt="รูปภาพ ฝบร.68"
                  className="h-full max-h-56 object-contain rounded-md shadow"
                  //style={{ background: 'linear-gradient(to bottom right, oklch(0.75 0.183 55.934 / 0.2), oklch(0.75 0.183 55.934 / 0.1))' }}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-1 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  ภาระหน้าที่และหน้าที่ของฝ่ายบำรุงรักษาระบบไฟฟ้า
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-400 mb-4">
                ฝ่ายบำรุงรักษาระบบไฟฟ้ามีหน้าที่และความรับผิดชอบเกี่ยวกับการบำรุงรักษาและซ่อม ระบบสายส่งอากาศ ระบบสายส่งใต้ดิน อุปกรณ์จ่ายไฟของสถานีต้นทาง สถานีสับเปลี่ยน สถานีย่อย ติดตั้ง บำรุงรักษา ทดสอบและปรับปรุงรีเลย์ อุปกรณ์ในระบบควบคุมและป้องกัน เครื่องวัด อุปกรณ์ควบคุมที่ใช้ในระบบโทรมาตร ข้อมูลระบบโทรมาตร ระบบสื่อสาร ระบบควบคุมอัตโนมัติต่าง ๆ และเครื่องวัดคุณภาพไฟฟ้า รวมทั้งเป็นศูนย์กลางดูแล ควบคุมคุณภาพไฟฟ้าของสายส่ง สายป้อน ในระบบการจ่ายพลังไฟฟ้าที่สถานีต้นทาง สถานีสับเปลี่ยน สถานีย่อย ของการไฟฟ้านครหลวง สถานีย่อยลูกค้า และอุปกรณ์สวิตช์ชิ่งยูนิต (Switching Unit) ให้อยู่ในสภาพใช้งานได้ดี ให้เป็นไปอย่างมีประสิทธิภาพและปลอดภัย ตามมาตรฐานสากล
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* External Links Section */}
        <section className="py-6 bg-white dark:bg-gray-900 px-4">
          <div className="max-w-8xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
              ลิงก์ภายนอกที่เกี่ยวข้อง
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6 mb-5">
              <a
                href="http://meainet/employee/department.php?VDepID=1187"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 rounded-lg shadow-sm transition hover:scale-105 bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700"
                style={{ textDecoration: 'none' }}
              >
                <span className="text-5xl mb-4">📖</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white mb-2">ผังโครงสร้าง</span>
                <span className="text-sm text-gray-600 dark:text-gray-400 text-center">ผังโครงสร้างฝ่ายบำรุงรักษาระบบไฟฟ้า</span>
              </a>
              <a
                href="http://pmdweb.mea.or.th/images/pmddata/k_ftm346_2560.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 rounded-lg shadow-sm transition hover:scale-105 bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700"
                style={{ textDecoration: 'none' }}
              >
                <span className="text-5xl mb-4">📋</span>
                <span className="text-base font-semibold text-gray-900 dark:text-white mb-2">ชื่อส่วนงานภายใน ฝบร.</span>
              </a>
              <a
                href="http://pmdweb.mea.or.th/images/pmddata/k_ftm345_2560.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 rounded-lg shadow-sm transition hover:scale-105 bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700"
                style={{ textDecoration: 'none' }}
              >
                <span className="text-5xl mb-4">📍</span>
                <span className="text-base font-semibold text-gray-900 dark:text-white mb-2">ผังแบ่งส่วนงาน-ขอบเขตความรับผิดชอบ</span>
              </a>
              <a
                href="http://pmdweb.mea.or.th/images/pmddata/%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%95%E0%B9%89%E0%B8%99%E0%B8%97%E0%B8%B8%E0%B8%99%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%AA%E0%B9%88%E0%B8%A7%E0%B8%99%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99_%E0%B8%9D%E0%B8%9A%E0%B8%A3.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 rounded-lg shadow-sm transition hover:scale-105 bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700"
                style={{ textDecoration: 'none' }}
              >
                <span className="text-5xl mb-4">💰</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white mb-2">ศูนย์ต้นทุน</span>
                <span className="text-sm text-gray-600 dark:text-gray-400 text-center">ศูนย์ต้นทุนภายในฝ่ายบำรุงรักษาระบบไฟฟ้า</span>
              </a>
              <a
                href="/about/orders"
                className="flex flex-col items-center p-6 rounded-lg shadow-sm transition hover:scale-105 bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700"
                style={{ textDecoration: 'none' }}
              >
                <span className="text-5xl mb-4">📣</span>
                <span className="text-base font-semibold text-gray-900 dark:text-white mb-2">ประกาศ / คำสั่ง ฝบร.</span>
              </a>
              <a
                href="http://emppromo/orders/admin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 rounded-lg shadow-sm transition hover:scale-105 bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700"
                style={{ textDecoration: 'none' }}
              >
                <span className="text-5xl mb-4">👤</span>
                <span className="text-base font-semibold text-gray-900 dark:text-white mb-2">คำสั่งแต่งตั้งพนักงาน</span>
              </a>
            </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a
                  href="https://www.gprocurement.go.th/new_index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 rounded-lg shadow-sm transition hover:scale-105 bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700"
                  style={{ textDecoration: 'none' }}
                >
                  <img
                    src="/egp logo.png"
                    alt="EGP LOGO"
                    className="w-full max-h-60 object-contain"
                  />
                  <span className="mt-3 text-base font-semibold text-gray-900 dark:text-white">e-GP (จัดซื้อจัดจ้าง)</span>
                </a>
                <a
                  href="https://ecd.mea.or.th/ecdinet/WO/Frm_dashboard_eWork.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 rounded-lg shadow-sm transition hover:scale-105 bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700"
                  style={{ textDecoration: 'none' }}
                >
                  <img
                    src="/image.png"
                    alt="WORK ORDER"
                    className="w-full max-h-60 object-contain"
                  />
                  <span className="mt-3 text-base font-semibold text-gray-900 dark:text-white">ระบบ e-Work Order</span>
                </a>
              </div>
          </div>
        </section>

        

        {/* Values Section */}
        {/* <section className="py-20 bg-gray-50 dark:bg-gray-800 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'oklch(0.75 0.183 55.934)' }}>
                  <span className="text-3xl">💡</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  Innovation
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We constantly push boundaries and explore new possibilities in technology and design.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'oklch(0.75 0.183 55.934)' }}>
                  <span className="text-3xl">🤝</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  Integrity
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Honesty and transparency guide everything we do, building trust with our clients.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'oklch(0.75 0.183 55.934)' }}>
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  Excellence
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We strive for perfection in every project, delivering results that exceed expectations.
                </p>
              </div>
            </div>
          </div>
        </section> */}
      </main>
    </>
  );
}


