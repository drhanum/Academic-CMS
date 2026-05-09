import { useState } from "react";
import type { AcademicData } from "../types/AcademicData";
import { exportToCSV } from "../utils/exportToCSV";

interface Props {
  data: AcademicData[];
  selectedDetail: AcademicData;
  setData: (data: AcademicData[]) => void;
  setSelectedDetail: (item: AcademicData | null) => void;
}

export default function ModalDetail({ data, selectedDetail, setData, setSelectedDetail }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [draft, setDraft] = useState<AcademicData>(selectedDetail);

  const handleSave = () => {
    setData(data.map((item) => (item.id === draft.id ? draft : item)));
    setSelectedDetail(draft);
    setIsEdit(false);
  };

  const Field = ({ label, fieldKey, type = "text" }: { label: string; fieldKey: keyof AcademicData; type?: string }) => (
    <div>
      <label className="font-semibold text-sm">{label}</label>
      {isEdit ? (
        <input
          type={type}
          className="border p-2 rounded w-full mt-1"
          value={draft[fieldKey] as string}
          onChange={(e) => setDraft({ ...draft, [fieldKey]: e.target.value })}
        />
      ) : (
        <div className="border p-2 rounded mt-1 bg-gray-100">{draft[fieldKey] as string}</div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gray-100 z-50 overflow-y-auto print:hidden">
      <div className="w-full min-h-screen p-8">
        <div className="bg-white rounded-xl shadow-md p-6">

          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Detail Data Akademik</h1>
              <p className="text-gray-500 text-sm">Informasi lengkap periode akademik</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setIsEdit(!isEdit)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded">
                {isEdit ? "Cancel Edit" : "Edit"}
              </button>
              <button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded">
                Simpan
              </button>
              <button onClick={() => setTimeout(() => window.print(), 100)} className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded">
                Print
              </button>
              <button onClick={() => exportToCSV(draft)} className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded">
                Export CSV
              </button>
              <button onClick={() => setSelectedDetail(null)} className="bg-cyan-500 text-white px-5 py-2 rounded">
                Kembali
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <Field label="Kode Periode"    fieldKey="kodePeriode" />
              <Field label="Tahun Ajaran"    fieldKey="tahunAjaran" />
              <Field label="Semester"        fieldKey="semester" />
              <Field label="Nama Periode"    fieldKey="namaPeriode" />
              <Field label="Nama Singkat"    fieldKey="namaSingkat" />
            </div>
            <div className="space-y-4">
              <Field label="Tanggal Awal Kuliah"  fieldKey="startKuliah" type="date" />
              <Field label="Tanggal Akhir Kuliah" fieldKey="endKuliah"   type="date" />
              <Field label="Tanggal UTS"           fieldKey="uts"         type="date" />
              <Field label="Tanggal UAS"           fieldKey="uas"         type="date" />
              <Field label="Status"                fieldKey="status" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
