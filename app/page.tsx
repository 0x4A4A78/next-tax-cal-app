"use client";
import { useMemo, useState } from "react";
const fmt = (n: number) =>
  new Intl.NumberFormat("th-TH", { maximumFractionDigits: 0 }).format(n);
const bands = [
  [150000, 0],
  [300000, 0.05],
  [500000, 0.1],
  [750000, 0.15],
  [1000000, 0.2],
  [2000000, 0.25],
  [5000000, 0.3],
  [Infinity, 0.35],
];
function calcTax(income: number) {
  let prev = 0,
    tax = 0;
  for (const [top, rate] of bands) {
    const taxable = Math.max(0, Math.min(income, top) - prev);
    tax += taxable * rate;
    prev = top;
    if (income <= top) break;
  }
  return tax;
}
export default function Home() {
  const [income, setIncome] = useState("900000");
  const [deduct, setDeduct] = useState("60000");
  const [other, setOther] = useState("30000");
  const gross = Number(income) || 0;
  const expense = Math.min(gross * 0.5, 100000);
  const net = Math.max(
    0,
    gross - expense - (Number(deduct) || 0) - (Number(other) || 0),
  );
  const tax = useMemo(() => calcTax(net), [net]);
  return (
    <main className="shell">
      <div className="wrap">
        <nav className="topbar">
          <div className="brand">
            <span>TAXWISE</span>
          </div>
          <span className="toplink">วางแผนภาษีอย่างมั่นใจ</span>
        </nav>
        <section className="hero">
          <div className="eyebrow">Personal tax / 02</div>
          <h1>
            ภาษีไม่ต้อง
            <br />
            เป็นเรื่องยาก
          </h1>
          <p>
            เห็นภาพเงินได้สุทธิและภาษีที่ต้องจ่ายในไม่กี่วินาที
            ด้วยโครงสร้างภาษีแบบขั้นบันไดของประเทศไทย
          </p>
        </section>
        <div className="grid">
          <section className="card">
            <h2>ข้อมูลรายได้ต่อปี</h2>
            <div className="form-grid">
              <label className="field full">
                <span className="label">
                  รายได้รวมต่อปี <small>(บาท)</small>
                </span>
                <input
                  className="input"
                  type="number"
                  min="0"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                />
              </label>
              <label className="field">
                <span className="label">ค่าลดหย่อนส่วนตัว</span>
                <input
                  className="input"
                  type="number"
                  min="0"
                  value={deduct}
                  onChange={(e) => setDeduct(e.target.value)}
                />
              </label>
              <label className="field">
                <span className="label">ค่าลดหย่อนอื่น ๆ</span>
                <input
                  className="input"
                  type="number"
                  min="0"
                  value={other}
                  onChange={(e) => setOther(e.target.value)}
                />
              </label>
            </div>
            <div className="metric-row" style={{ marginTop: 20 }}>
              <span>ค่าใช้จ่ายอัตโนมัติ (สูงสุด 100,000)</span>
              <strong>฿{fmt(expense)}</strong>
            </div>
            <p className="note">
              คำนวณตามอัตราภาษีเงินได้บุคคลธรรมดาแบบขั้นบันได
            </p>
          </section>
          <section className="card result">
            <div className="result-main">
              <div className="result-label">ภาษีที่ต้องชำระโดยประมาณ</div>
              <div className="big-number">฿{fmt(tax)}</div>
              <span className="badge">
                Effective rate {gross ? ((tax / gross) * 100).toFixed(1) : 0}%
              </span>
            </div>
            <div>
              <div className="metric-row">
                <span>เงินได้สุทธิ</span>
                <strong>฿{fmt(net)}</strong>
              </div>
              <div className="metric-row">
                <span>เงินได้หลังหักภาษี</span>
                <strong>฿{fmt(Math.max(0, net - tax))}</strong>
              </div>
            </div>
          </section>
        </div>
        <section className="card" style={{ marginTop: 18 }}>
          <h2>สรุปการคำนวณ</h2>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>รายการ</th>
                  <th>จำนวนเงิน</th>
                  <th>อัตรา</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>รายได้รวม</td>
                  <td>฿{fmt(gross)}</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td>หักค่าใช้จ่าย</td>
                  <td>-฿{fmt(expense)}</td>
                  <td>50%</td>
                </tr>
                <tr>
                  <td>หักค่าลดหย่อน</td>
                  <td>-฿{fmt((Number(deduct) || 0) + (Number(other) || 0))}</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td>เงินได้สุทธิ</td>
                  <td>฿{fmt(net)}</td>
                  <td>ขั้นบันได</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <div className="footer">
          ตัวเลขเป็นประมาณการเบื้องต้น ควรตรวจสอบสิทธิ์ลดหย่อนก่อนยื่นแบบจริง
        </div>
      </div>
    </main>
  );
}
