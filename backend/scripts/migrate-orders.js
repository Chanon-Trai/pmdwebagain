/**
 * Migration script to import hardcoded orders data into the database
 * Run this script after creating the orders table in the database
 * 
 * Usage: node backend/scripts/migrate-orders.js
 */

const pool = require('../database/db');
require('dotenv').config();

// Hardcoded data from the original orders page
const ordersByYear = {
  '2568': [
    {
      id: 1,
      title: 'คำสั่งปฏิบัติงานกรณีฉุกเฉินช่วงเทศกาล',
      category: 'คำสั่ง',
      date: '15 มกราคม 2568',
      link: '#order-2568-1',
    },
    {
      id: 2,
      title: 'ประกาศแนวทางทบทวนความปลอดภัยงานบำรุงรักษา',
      category: 'ประกาศ',
      date: '20 มกราคม 2568',
      link: '#order-2568-2',
    },
    {
      id: 3,
      title: 'คำสั่งมอบหมายทีมเฉพาะกิจติดตามการปรับปรุงระบบป้องกัน',
      category: 'คำสั่ง',
      date: '5 กุมภาพันธ์ 2568',
      link: '#order-2568-3',
    },
    {
      id: 4,
      title: 'ประกาศการหมุนเวียนบุคลากรตามแผนพัฒนาศักยภาพ',
      category: 'ประกาศ',
      date: '10 กุมภาพันธ์ 2568',
      link: '#order-2568-4',
    },
  ],
  '2567': [
    {
      id: 1,
      title: 'คำสั่ง / ประกาศ ฝบร. ปี 2561',
      category: 'ประกาศ',
      date: 'เมษายน 2567',
      link: '#order-april',
    },
    {
      id: 2,
      title: 'คำสั่งปฏิบัติงานกรณีฉุกเฉินช่วงเทศกาล',
      category: 'คำสั่ง',
      date: 'มีนาคม 2567',
      link: '#order-march',
    },
    {
      id: 3,
      title: 'แนวทางทบทวนความปลอดภัยงานบำรุงรักษา',
      category: 'ประกาศ',
      date: 'กุมภาพันธ์ 2567',
      link: '#order-feb',
    },
    {
      id: 4,
      title: 'การหมุนเวียนบุคลากรตามแผนพัฒนาศักยภาพ',
      category: 'คำสั่ง',
      date: 'มกราคม 2567',
      link: '#order-jan',
    },
  ],
  '2566': [
    {
      id: 1,
      title: 'คำสั่งปรับปรุงระบบป้องกันไฟฟ้า',
      category: 'คำสั่ง',
      date: '15 มีนาคม 2566',
      link: '#order-2566-1',
    },
    {
      id: 2,
      title: 'ประกาศมาตรฐานการบำรุงรักษา',
      category: 'ประกาศ',
      date: '20 เมษายน 2566',
      link: '#order-2566-2',
    },
  ],
  '2565': [
    {
      id: 1,
      title: 'คำสั่งจัดซื้ออุปกรณ์ระบบป้องกัน',
      category: 'คำสั่ง',
      date: '10 มิถุนายน 2565',
      link: '#order-2565-1',
    },
    {
      id: 2,
      title: 'ประกาศนโยบายความปลอดภัย',
      category: 'ประกาศ',
      date: '25 กรกฎาคม 2565',
      link: '#order-2565-2',
    },
    {
      id: 3,
      title: 'คำสั่งอบรมพนักงานประจำปี',
      category: 'คำสั่ง',
      date: '5 สิงหาคม 2565',
      link: '#order-2565-3',
    },
  ],
  '2564': [
    {
      id: 1,
      title: 'คำสั่งจัดซื้ออุปกรณ์ระบบป้องกัน',
      category: 'คำสั่ง',
      date: '10 มิถุนายน 2565',
      link: '#order-2565-1',
    },
    {
      id: 2,
      title: 'ประกาศนโยบายความปลอดภัย',
      category: 'ประกาศ',
      date: '25 กรกฎาคม 2565',
      link: '#order-2565-2',
    },
    {
      id: 3,
      title: 'คำสั่งอบรมพนักงานประจำปี',
      category: 'คำสั่ง',
      date: '5 สิงหาคม 2565',
      link: '#order-2565-3',
    },
  ],
  '2563': [
    {
      id: 1,
      title: 'คำสั่งจัดซื้ออุปกรณ์ระบบป้องกัน',
      category: 'คำสั่ง',
      date: '10 มิถุนายน 2565',
      link: '#order-2565-1',
    },
    {
      id: 2,
      title: 'ประกาศนโยบายความปลอดภัย',
      category: 'ประกาศ',
      date: '25 กรกฎาคม 2565',
      link: '#order-2565-2',
    },
    {
      id: 3,
      title: 'คำสั่งอบรมพนักงานประจำปี',
      category: 'คำสั่ง',
      date: '5 สิงหาคม 2565',
      link: '#order-2565-3',
    },
  ],
  '2562': [
    {
      id: 1,
      title: 'คำสั่งจัดซื้ออุปกรณ์ระบบป้องกัน',
      category: 'คำสั่ง',
      date: '10 มิถุนายน 2565',
      link: '#order-2565-1',
    },
    {
      id: 2,
      title: 'ประกาศนโยบายความปลอดภัย',
      category: 'ประกาศ',
      date: '25 กรกฎาคม 2565',
      link: '#order-2565-2',
    },
    {
      id: 3,
      title: 'คำสั่งอบรมพนักงานประจำปี',
      category: 'คำสั่ง',
      date: '5 สิงหาคม 2565',
      link: '#order-2565-3',
    },
  ],
  '2561': [
    {
      id: 1,
      title: 'แต่งตั้งคณะกรรมการดุแลการอยู่เวร ของ ฝบร. ประจำปี 2561',
      category: 'คำสั่ง',
      date: 'xx xx xx',
      link: 'http://pmdweb.mea.or.th/images/pmddata/pmdorder/pmdorder18_61.pdf',
    },
    {
      id: 2,
      title: 'แต่งตั้งคณะทำงานประเมินความเสี่ยงระบบ มอก.18001',
      category: 'คำสั่ง',
      date: 'xx xx xx',
      link: 'http://pmdweb.mea.or.th/images/pmddata/pmdorder/pmdorder17_61.pdf',
    },
    {
      id: 3,
      title: 'แต่งตั้งคณะทำงานพัฒนาทีม ฝบร. ประจำปี 2561',
      category: 'คำสั่ง',
      date: 'xx xx xx',
      link: 'http://pmdweb.mea.or.th/images/pmddata/pmdorder/pmdorder16_61.pdf',
    },
    {
      id: 4,
      title: 'แต่งตั้งคณะทำงานจัดงานเลี้ยงส่งพนักงานเกษียณอายุ ฝบร. ประจำปี 2561',
      category: 'คำสั่ง',
      date: 'xx xx xx',
      link: 'http://pmdweb.mea.or.th/images/pmddata/pmdorder/pmdorder15_61.pdf',
    },
    {
      id: 5,
      title: 'แต่งตั้งคณะทำงานปรับปรุง Web Site ของ ฝบร.',
      category: 'คำสั่ง',
      date: 'xx xx xx',
      link: 'http://pmdweb.mea.or.th/images/pmddata/pmdorder/pmdorder14_61.pdf',
    },
    {
      id: 6,
      title: 'แต่งตั้งคณะกรรมการเพิ่มผลผลิต ของ ฝ่ายบำรุงรักษาระบบไฟฟ้า ประจำปี 2561',
      category: 'คำสั่ง',
      date: 'xx xx xx',
      link: 'http://pmdweb.mea.or.th/images/pmddata/pmdorder/pmdorder13_61.pdf',
    },
    {
      id: 7,
      title: 'ให้ตรวจสอบเครื่องมือเครื่องใช้เบ็ดเตล็ด และแต่งตั่งคณะทำงานตรวจสอบ',
      category: 'คำสั่ง',
      date: 'xx xx xx',
      link: 'http://pmdweb.mea.or.th/images/pmddata/pmdorder/pmdorder12_61.pdf',
    },
    {
      id: 8,
      title: 'แต่งตั้งคณะทำงานพิจารณาตัดสินโครงการประกวดผลงานนวัตกรรม สิ่งประดิษฐ์ และการปรับปรุงกระบวนการทำงาน ประจำปี 2560',
      category: 'คำสั่ง',
      date: 'xx xx xx',
      link: 'http://pmdweb.mea.or.th/images/pmddata/pmdorder/pmdorder11_61.pdf',
    },
    {
      id: 9,
      title: 'ปรับปรุงคณะทำงานพัฒนาสู่องค์กรแห่งการเรียนรู้ (LO) และจัดการความรู้ (KM) ของ ฝบร.',
      category: 'คำสั่ง',
      date: 'xx xx xx',
      link: 'http://pmdweb.mea.or.th/images/pmddata/pmdorder/pmdorder10_61.pdf',
    },
    {
      id: 10,
      title: 'แต่งตั้งคณะตรวจพื้นที่ 5ส',
      category: 'คำสั่ง',
      date: 'xx xx xx',
      link: 'http://pmdweb.mea.or.th/images/pmddata/pmdorder/pmdorder9_61.pdf',
    },
    {
      id: 11,
      title: 'แต่งตั้งหัวหน้าพื้นที่ 5ส',
      category: 'คำสั่ง',
      date: 'xx xx xx',
      link: 'http://pmdweb.mea.or.th/images/pmddata/pmdorder/pmdorder8_61.pdf',
    },
    {
      id: 12,
      title: 'แต่งตั้งคณะทำงาน รณรงค์ ส่งเสริม ประชาสัมพันธ์ กิจกรรม 5ส',
      category: 'คำสั่ง',
      date: 'xx xx xx',
      link: 'http://pmdweb.mea.or.th/images/pmddata/pmdorder/pmdorder7_61.pdf',
    },
    {
      id: 13,
      title: 'แต่งตั้งคณะทำงานกิจกรรม 5ส',
      category: 'คำสั่ง',
      date: 'xx xx xx',
      link: 'http://pmdweb.mea.or.th/images/pmddata/pmdorder/pmdorder6_61.pdf',
    },
    {
      id: 14,
      title: 'แต่งตั้งพนักงานเป็นเจ้าหน้าที่เกี่ยวกับการจัดซื้อจัดจ้างและบริหารพัสดุ',
      category: 'คำสั่ง',
      date: 'xx xx xx',
      link: 'http://pmdweb.mea.or.th/images/pmddata/pmdorder/pmdorder5_61.pdf',
    },
    {
      id: 15,
      title: 'นโยบายการดำเนินกิจกรรม 5ส',
      category: 'คำสั่ง',
      date: 'xx xx xx',
      link: 'http://pmdweb.mea.or.th/images/pmddata/pmdorder/pmdorder4_61.pdf',
    },
    {
      id: 16,
      title: 'แต่งตั้งคณะกรรมการบริหารระบบคุณภาพ ISO9001',
      category: 'คำสั่ง',
      date: 'xx xx xx',
      link: 'http://pmdweb.mea.or.th/images/pmddata/pmdorder/pmdorder3_61.pdf',
    },
    {
      id: 17,
      title: 'แต่งตั้งกรรมการระบบการควบคุมภายในด้วยตนเอง (CSA)',
      category: 'คำสั่ง',
      date: 'xx xx xx',
      link: 'http://pmdweb.mea.or.th/images/pmddata/pmdorder/pmdorder2_61.pdf',
    },
    {
      id: 18,
      title: 'แต่งตั้งคณะอนุกรรมการบริการงานบุคคลประจำหน่วยงาน',
      category: 'คำสั่ง',
      date: 'xx xx xx',
      link: 'http://pmdweb.mea.or.th/images/pmddata/pmdorder/pmdorder1_61.pdf',
    },
  ],
};

async function migrateOrders() {
  try {
    console.log('Starting orders migration...');
    
    // Clear existing orders (optional - comment out if you want to keep existing data)
    // await pool.query('DELETE FROM orders');
    // console.log('Cleared existing orders');
    
    let totalInserted = 0;
    
    // Insert orders by year
    for (const [year, orders] of Object.entries(ordersByYear)) {
      console.log(`\nMigrating year ${year} (${orders.length} orders)...`);
      
      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        
        try {
          const result = await pool.query(
            `INSERT INTO orders (year, title, category, date, link, display_order) 
             VALUES ($1, $2, $3, $4, $5, $6) 
             ON CONFLICT DO NOTHING
             RETURNING id`,
            [year, order.title, order.category, order.date, order.link, i + 1]
          );
          
          if (result.rows.length > 0) {
            totalInserted++;
            console.log(`  ✓ Inserted: ${order.title.substring(0, 50)}...`);
          } else {
            console.log(`  - Skipped (duplicate): ${order.title.substring(0, 50)}...`);
          }
        } catch (err) {
          console.error(`  ✗ Error inserting order: ${order.title}`, err.message);
        }
      }
    }
    
    console.log(`\n✅ Migration completed! Total orders inserted: ${totalInserted}`);
    
    // Show summary
    const summary = await pool.query('SELECT year, COUNT(*) as count FROM orders GROUP BY year ORDER BY year DESC');
    console.log('\n📊 Summary by year:');
    summary.rows.forEach(row => {
      console.log(`   Year ${row.year}: ${row.count} orders`);
    });
    
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  } finally {
    await pool.end();
    console.log('\nDatabase connection closed.');
  }
}

// Run migration
migrateOrders();

