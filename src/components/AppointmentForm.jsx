import { useState } from "react";

export default function AppointmentForm({ onAddAppointment }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bloodType: "",
    appointmentType: "مسبق",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAppointment({
      ...formData,
      status: "upcoming",
      id: Date.now(),
    });
    setFormData({
      name: "",
      phone: "",
      bloodType: "",
      appointmentType: "مسبق",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-right">حجز جديد</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-right mb-1">اسم المريض</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded-md text-right"
            required
          />
        </div>
        <div>
          <label className="block text-right mb-1">رقم الهاتف</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full p-2 border rounded-md text-right"
            required
          />
        </div>
        <div>
          <label className="block text-right mb-1">زمرة الدم</label>
          <select
            value={formData.bloodType}
            onChange={(e) =>
              setFormData({ ...formData, bloodType: e.target.value })
            }
            className="w-full p-2 border rounded-md text-right cursor-pointer"
            required
          >
            <option value="">اختر زمرة الدم</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
        <div>
          <label className="block text-right mb-1">نوع الحجز</label>
          <select
            value={formData.appointmentType}
            onChange={(e) =>
              setFormData({ ...formData, appointmentType: e.target.value })
            }
            className="w-full p-2 border rounded-md text-right cursor-pointer"
            required
          >
            <option value="مسبق">مسبق</option>
            <option value="مباشر">مباشر</option>
            <option value="حالة إسعافية">حالة إسعافية</option>
          </select>
        </div>
        <div>
          <label className="block text-right mb-1 cursor-pointer">
            تاريخ الحجز
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 hover:scale-105 transition"
        >
          إضافة حجز
        </button>
      </div>
    </form>
  );
}
