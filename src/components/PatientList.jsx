export default function PatientList({
  title,
  patients,
  onAction,
  actionLabel,
  onDelete,
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-right">{title}</h2>
      <div className="space-y-4">
        {patients.map((patient) => (
          <div key={patient.id} className="border p-4 rounded-md">
            <div className="flex justify-between items-start">
              <div className="space-y-1 text-right w-full">
                <h3 className="font-bold">{patient.name}</h3>
                <p className="text-sm text-gray-600">
                  رقم الهاتف: {patient.phone}
                </p>
                <p className="text-sm text-gray-600">
                  زمرة الدم: {patient.bloodType}
                </p>
                <p className="text-sm text-gray-600">
                  نوع الحجز: {patient.appointmentType}
                </p>
                <p className="text-sm text-gray-600">
                  تاريخ الحجز: {patient.date}
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              {onAction && (
                <button
                  onClick={() => onAction(patient)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  {actionLabel}
                </button>
              )}
              {onDelete &&
                patient.appointmentType === "مسبق" &&
                patient.status === "upcoming" && (
                  <button
                    onClick={() => onDelete(patient.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mr-2"
                  >
                    إلغاء الحجز
                  </button>
                )}
            </div>
          </div>
        ))}
        {patients.length === 0 && (
          <p className="text-center text-gray-500">لا يوجد مرضى</p>
        )}
      </div>
    </div>
  );
}
