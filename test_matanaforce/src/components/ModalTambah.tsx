import type { AcademicData } from "../types/AcademicData";

interface Props {
  form: Omit<AcademicData, "id">;
  setForm: (form: Omit<AcademicData, "id">) => void;
  onSave: () => void;
  onClose: () => void;
}

export default function ModalTambah({ form, setForm, onSave, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-gray-100 z-50 overflow-y-auto">
      <div className="w-full min-h-screen p-8">
        <div className="bg-white rounded-xl shadow-md p-6">

          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Tambah Data Akademik</h1>
              <p className="text-gray-500 text-sm">Detail Periode Akademik</p>
            </div>
            <div className="flex gap-3">
              <button onClick={onClose} className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded">
                Kembali ke Daftar
              </button>
              <button onClick={onSave} className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded">
                Simpan
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="font-semibold text-sm">Kode Periode</label>
                <input type="text" className="border p-2 rounded w-full mt-1" value={form.kodePeriode} onChange={(e) => setForm({ ...form, kodePeriode: e.target.value })} />
              </div>
              <div>
                <label className="font-semibold text-sm">Tahun Ajaran</label>
                <input type="text" className="border p-2 rounded w-full mt-1" value={form.tahunAjaran} onChange={(e) => setForm({ ...form, tahunAjaran: e.target.value })} />
              </div>
              <div>
                <label className="font-semibold text-sm">Semester</label>
                <select className="border p-2 rounded w-full mt-1" value={form.semester} onChange={(e) => setForm({ ...form, semester: e.target.value })}>
                  <option value="">Pilih Semester</option>
                  <option value="Ganjil">Ganjil</option>
                  <option value="Genap">Genap</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-sm">Nama Periode</label>
                <input type="text" className="border p-2 rounded w-full mt-1" value={form.namaPeriode} onChange={(e) => setForm({ ...form, namaPeriode: e.target.value })} />
              </div>
              <div>
                <label className="font-semibold text-sm">Nama Singkat</label>
                <input type="text" className="border p-2 rounded w-full mt-1" value={form.namaSingkat} onChange={(e) => setForm({ ...form, namaSingkat: e.target.value })} />
              </div>
              <div>
                <label className="font-semibold text-sm">Tanggal Awal Kuliah</label>
                <input type="date" className="border p-2 rounded w-full mt-1" value={form.startKuliah} onChange={(e) => setForm({ ...form, startKuliah: e.target.value })} />
              </div>
              <div>
                <label className="font-semibold text-sm">Tanggal Akhir Kuliah</label>
                <input type="date" className="border p-2 rounded w-full mt-1" value={form.endKuliah} onChange={(e) => setForm({ ...form, endKuliah: e.target.value })} />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-semibold text-sm">Tanggal UTS</label>
                <input type="date" className="border p-2 rounded w-full mt-1" value={form.uts} onChange={(e) => setForm({ ...form, uts: e.target.value })} />
              </div>
              <div>
                <label className="font-semibold text-sm">Tanggal UAS</label>
                <input type="date" className="border p-2 rounded w-full mt-1" value={form.uas} onChange={(e) => setForm({ ...form, uas: e.target.value })} />
              </div>
              <div>
                <label className="font-semibold text-sm">Status</label>
                <select className="border p-2 rounded w-full mt-1" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option value="Aktif">Aktif</option>
                  <option value="Tidak Aktif">Tidak Aktif</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
