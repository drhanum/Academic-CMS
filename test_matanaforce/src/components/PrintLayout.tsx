import type { AcademicData } from "../types/AcademicData";

interface Props {
  item: AcademicData;
}

export default function PrintLayout({ item }: Props) {
  return (
    <div className="hidden print:block bg-white text-black p-10 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center justify-between border-b-4 border-blue-600 pb-4">
        <div className="flex items-center gap-4">
          <img src="/assets/logo_matana.png" alt="Logo" className="w-20 h-20 object-contain" />
          <div>
            <h1 className="text-3xl font-bold">MATANA UNIVERSITY</h1>
            <p className="text-lg">Matana University Tower, ARA Center, JL. CBD Barat Kav. 1, Gading Serpong, Tangerang, Banten 15810</p>
            <p className="text-sm text-gray-600">Website : www.matanauniversity.ac.id | Email : info@matanauniversity.ac.id</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm">Dicetak:</p>
          <p className="font-semibold">{new Date().toLocaleDateString("id-ID")}</p>
        </div>
      </div>

      {/* TITLE */}
      <div className="mt-10 mb-8 text-center">
        <h2 className="text-2xl font-bold uppercase">Detail Data Akademik</h2>
        <p className="text-gray-500">Informasi lengkap periode akademik</p>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-2 gap-8 text-sm">
        <div className="space-y-5">
          {([
            ["Kode Periode",  "kodePeriode"],
            ["Tahun Ajaran",  "tahunAjaran"],
            ["Semester",      "semester"],
            ["Nama Periode",  "namaPeriode"],
            ["Nama Singkat",  "namaSingkat"],
          ] as [string, keyof AcademicData][]).map(([label, key]) => (
            <div key={key}>
              <p className="font-semibold text-gray-500">{label}</p>
              <div className="border rounded-lg p-3 mt-1">{item[key] as string}</div>
            </div>
          ))}
        </div>
        <div className="space-y-5">
          {([
            ["Tanggal Awal Kuliah",  "startKuliah"],
            ["Tanggal Akhir Kuliah", "endKuliah"],
            ["Jadwal UTS",           "uts"],
            ["Jadwal UAS",           "uas"],
            ["Status",               "status"],
          ] as [string, keyof AcademicData][]).map(([label, key]) => (
            <div key={key}>
              <p className="font-semibold text-gray-500">{label}</p>
              <div className="border rounded-lg p-3 mt-1">{item[key] as string}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-20 flex justify-between items-end">
        <p className="text-sm text-gray-500">Dokumen ini dibuat otomatis oleh sistem.</p>
        <div className="text-center">
          <div className="w-48 border-b border-black mb-2"></div>
          <p className="font-semibold">Administrator Akademik</p>
        </div>
      </div>

    </div>
  );
}
