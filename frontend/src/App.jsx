import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import QRCode from 'react-qr-code'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

function App() {
  const { t, i18n } = useTranslation()
  const [activeTab, setActiveTab] = useState('farmer')
  const [mandis, setMandis] = useState([])
  const [slots, setSlots] = useState([])
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const [smsAlert, setSmsAlert] = useState(null)
  
  // Form state
  const [farmerName, setFarmerName] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [selectedMandi, setSelectedMandi] = useState('')
  const [cropType, setCropType] = useState('Wheat')
  const [quantity, setQuantity] = useState(10)
  const [slotDate, setSlotDate] = useState('')
  const [bookingMessage, setBookingMessage] = useState('')

  // Pass Modal State
  const [activePass, setActivePass] = useState(null)

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    fetchMandis()
    fetchSlots()
  }, [])

  const fetchMandis = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/mandis`)
      const data = await res.json()
      setMandis(data)
      if (data.length > 0 && !selectedMandi) setSelectedMandi(data[0].id)
    } catch (err) {
      console.error('Failed to fetch mandis:', err)
    }
  }

  const fetchSlots = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/slots`)
      const data = await res.json()
      setSlots(data)
    } catch (err) {
      console.error('Failed to fetch slots:', err)
    }
  }

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  const handleBooking = async (e) => {
    e.preventDefault()
    if (!farmerName || !phone || !slotDate) {
      alert('Please fill out all required fields.')
      return
    }

    try {
      const farmerRes = await fetch(`${API_BASE_URL}/api/farmers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: farmerName, phone: phone, location: location || 'Local Village' })
      })
      const farmer = await farmerRes.json()

      const bookingRes = await fetch(`${API_BASE_URL}/api/slots/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmer_id: farmer.id,
          mandi_id: parseInt(selectedMandi),
          crop_type: cropType,
          quantity_quintals: parseInt(quantity),
          slot_date: slotDate
        })
      })
      
      const result = await bookingRes.json()
      
      if (!bookingRes.ok) {
        setBookingMessage(`ERROR: ${result.detail || 'Failed to book slot'}`)
      } else {
        const mandiObj = mandis.find(m => m.id === parseInt(selectedMandi))
        const passData = {
          id: result.booking_details.id,
          farmer_name: farmerName,
          farmer_phone: phone,
          crop_type: cropType,
          quantity_quintals: quantity,
          slot_date: slotDate,
          mandi_name: mandiObj ? mandiObj.name : 'Procurement Center',
          mandi_location: mandiObj ? mandiObj.location : ''
        }
        setActivePass(passData)
        if (result.sms_notification) {
          setSmsAlert(result.sms_notification)
        }
        setBookingMessage(`SUCCESS: Slot Booked Successfully! Token ID: #${result.booking_details.id}`)
        fetchSlots()
        fetchMandis()
      }
    } catch (err) {
      setBookingMessage('ERROR: Failed to connect to server.')
    }
  }

  const updateStatus = async (slotId, newStatus) => {
    try {
      await fetch(`${API_BASE_URL}/api/slots/${slotId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      fetchSlots()
    } catch (err) {
      console.error('Failed to update status:', err)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Top Header */}
      <header className="bg-emerald-800 text-white shadow-md">
        <div className="max-w-6xl mx-auto py-5 px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">{t('portalTitle')}</h1>
            <p className="text-emerald-200 text-xs md:text-sm mt-0.5">{t('portalSubtitle')}</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <select 
              onChange={(e) => changeLanguage(e.target.value)}
              className="bg-emerald-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-emerald-700 outline-none"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
            </select>

            {/* Portal Switcher */}
            <div className="flex bg-emerald-900 p-1 rounded-lg border border-emerald-700">
              <button 
                onClick={() => setActiveTab('farmer')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === 'farmer' ? 'bg-white text-emerald-900 shadow-sm' : 'text-emerald-200 hover:text-white'}`}
              >
                {t('farmerPortal')}
              </button>
              <button 
                onClick={() => setActiveTab('officer')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === 'officer' ? 'bg-white text-emerald-900 shadow-sm' : 'text-emerald-200 hover:text-white'}`}
              >
                {t('officerPortal')}
              </button>
            </div>
          </div>
        </div>

        {isOffline && (
          <div className="bg-amber-500 text-white text-xs font-bold text-center py-2 px-4 shadow-inner">
            Offline Mode Active: Gate actions will sync automatically when network restores.
          </div>
        )}
      </header>

      {/* SMS Notification Alert Banner */}
      {smsAlert && (
        <div className="bg-blue-600 text-white text-xs font-semibold py-2 px-4 text-center shadow-md flex justify-between items-center max-w-6xl mx-auto my-2 rounded-lg">
          <span>SMS Alert: {smsAlert}</span>
          <button onClick={() => setSmsAlert(null)} className="text-white font-bold ml-4">Close</button>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-6xl mx-auto p-6">
        {activeTab === 'farmer' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <section className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b">{t('bookSlot')}</h2>
              
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{t('farmerName')}</label>
                  <input 
                    type="text" 
                    value={farmerName} 
                    onChange={(e) => setFarmerName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full border border-slate-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{t('mobileNumber')}</label>
                  <input 
                    type="text" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full border border-slate-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{t('selectMandi')}</label>
                  <select 
                    value={selectedMandi} 
                    onChange={(e) => setSelectedMandi(e.target.value)}
                    className="w-full border border-slate-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    {mandis.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.location}) {m.distance_km ? `- ${m.distance_km} km away` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">{t('cropType')}</label>
                    <select 
                      value={cropType} 
                      onChange={(e) => setCropType(e.target.value)}
                      className="w-full border border-slate-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                    >
                      <option value="Wheat">Wheat</option>
                      <option value="Paddy">Paddy</option>
                      <option value="Mustard">Mustard</option>
                      <option value="Pulses">Pulses</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">{t('quantity')}</label>
                    <input 
                      type="number" 
                      value={quantity} 
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                      className="w-full border border-slate-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{t('slotDate')}</label>
                  <input 
                    type="date" 
                    value={slotDate} 
                    onChange={(e) => setSlotDate(e.target.value)}
                    className="w-full border border-slate-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold p-2.5 rounded-md text-sm transition-colors shadow-sm mt-2"
                >
                  {t('confirmBtn')}
                </button>
              </form>

              {bookingMessage && (
                <div className={`mt-4 p-3 border text-xs rounded-md font-semibold ${bookingMessage.includes('ERROR') ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-emerald-50 border-emerald-200 text-emerald-800'}`}>
                  {bookingMessage}
                </div>
              )}
            </section>

            <section className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b">{t('activeTokens')}</h2>
              {slots.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-sm">No slots booked yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold border-b">
                      <tr>
                        <th className="p-3">{t('tokenId')}</th>
                        <th className="p-3">{t('farmer')}</th>
                        <th className="p-3">{t('crop')}</th>
                        <th className="p-3">{t('qty')}</th>
                        <th className="p-3">{t('date')}</th>
                        <th className="p-3">{t('status')}</th>
                        <th className="p-3">Digital Pass</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {slots.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-emerald-700">#{s.id}</td>
                          <td className="p-3 font-medium">{s.farmer_name}</td>
                          <td className="p-3">{s.crop_type}</td>
                          <td className="p-3">{s.quantity_quintals} Q</td>
                          <td className="p-3 text-slate-600">{s.slot_date}</td>
                          <td className="p-3">
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${s.status === 'Completed' ? 'bg-blue-100 text-blue-800' : s.status === 'Checked-In' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                              {s.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <button 
                              onClick={() => setActivePass(s)}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-2.5 py-1 rounded border border-slate-300 transition-colors"
                            >
                              {t('viewPass')}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        )}

        {activeTab === 'officer' && (
          <div className="space-y-8">
            <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b">Mandi Daily Quota Utilization</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mandis.map((m) => {
                  const percent = Math.min(100, roundToTwo((m.total_booked_quintals / m.daily_capacity_quintals) * 100))
                  return (
                    <div key={m.id} className="border border-slate-200 p-4 rounded-lg bg-slate-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-800">{m.name}</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                          {m.remaining_capacity} Q remaining
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden mb-2">
                        <div 
                          className={`h-full transition-all duration-500 ${percent > 90 ? 'bg-rose-500' : percent > 70 ? 'bg-amber-500' : 'bg-emerald-600'}`} 
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Booked: {m.total_booked_quintals} Q</span>
                        <span>Capacity: {m.daily_capacity_quintals} Q ({percent}%)</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b">Gate Check-In & Verification Queue</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold border-b">
                    <tr>
                      <th className="p-3">Token ID</th>
                      <th className="p-3">Farmer Name</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Crop / Qty</th>
                      <th className="p-3">Slot Date</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Gate Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {slots.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-emerald-700">#{s.id}</td>
                        <td className="p-3 font-medium">{s.farmer_name}</td>
                        <td className="p-3 text-slate-600">{s.farmer_phone}</td>
                        <td className="p-3">{s.crop_type} ({s.quantity_quintals} Q)</td>
                        <td className="p-3 text-slate-600">{s.slot_date}</td>
                        <td className="p-3">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${s.status === 'Completed' ? 'bg-blue-100 text-blue-800' : s.status === 'Checked-In' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                            {s.status}
                          </span>
                        </td>
                        <td className="p-3 flex gap-2">
                          {s.status === 'Confirmed' && (
                            <button 
                              onClick={() => updateStatus(s.id, 'Checked-In')}
                              className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-2.5 py-1 rounded transition-colors"
                            >
                              Check-In Gate
                            </button>
                          )}
                          {s.status === 'Checked-In' && (
                            <button 
                              onClick={() => updateStatus(s.id, 'Completed')}
                              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded transition-colors"
                            >
                              Complete Sale
                            </button>
                          )}
                          {s.status === 'Completed' && (
                            <span className="text-xs text-slate-400 font-semibold">Done</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* DIGITAL GATE PASS MODAL */}
      {activePass && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-slate-200">
            <div className="text-center border-b pb-4 mb-4">
              <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider">Official Gate Pass</span>
              <h3 className="text-xl font-extrabold text-slate-800">Kisaan Setu Token</h3>
              <p className="text-xs text-slate-500 mt-1">{activePass.mandi_name || 'Procurement Center'}</p>
            </div>

            <div className="flex justify-center my-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <QRCode 
                value={JSON.stringify({ token: activePass.id, phone: activePass.farmer_phone, date: activePass.slot_date })}
                size={140}
              />
            </div>

            <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4">
              <div className="flex justify-between"><span className="font-semibold text-slate-500">Token ID:</span><span className="font-bold text-emerald-700">#{activePass.id}</span></div>
              <div className="flex justify-between"><span className="font-semibold text-slate-500">Farmer:</span><span className="font-bold text-slate-800">{activePass.farmer_name}</span></div>
              <div className="flex justify-between"><span className="font-semibold text-slate-500">Crop / Qty:</span><span className="font-bold text-slate-800">{activePass.crop_type} ({activePass.quantity_quintals} Q)</span></div>
              <div className="flex justify-between"><span className="font-semibold text-slate-500">Slot Date:</span><span className="font-bold text-slate-800">{activePass.slot_date}</span></div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => window.print()}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2 rounded-lg text-xs transition-colors"
              >
                Print Pass
              </button>
              <button 
                onClick={() => setActivePass(null)}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 rounded-lg text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function roundToTwo(num) {
  return +(Math.round(num + "e+2")  + "e-2") || 0
}

export default App