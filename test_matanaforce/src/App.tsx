import { useState } from "react";
import { CheckCircle, Eye, Trash2 } from "lucide-react";
import academicData from "./data/academicData.json";

import type { AcademicData } from "./types/AcademicData";

import ModalTambah from "./components/ModalTambah";
import ModalDetail from "./components/ModalDetail";
import PrintLayout from "./components/PrintLayout";

const EMPTY_FORM: Omit<AcademicData, "id"> = {
  kodePeriode: "", tahunAjaran: "", semester: "", namaPeriode: "",
  namaSingkat: "", startKuliah: "", endKuliah: "", uts: "", uas: "", status: "Aktif",
};

export default function App() {
  const [data, setData] = useState<AcademicData[]>(academicData);
  const [filter, setFilter] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectedPeriode, setSelectedPeriode] = useState("Semua");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<AcademicData | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const filteredData = data.filter((item) => {
    const matchSearch = item.namaPeriode.toLowerCase().includes(filter.toLowerCase());
    const matchFilter = selectedPeriode === "Semua" || item.namaPeriode === selectedPeriode;
    return matchSearch && matchFilter;
  });

  const handleAdd = () => {
    setData([...data, { id: Date.now(), ...form }]);
    setIsOpen(false);
    setForm(EMPTY_FORM);
  };

  const toggleStatus = (id: number) => {
    setData(data.map((item) => {
      if (item.id !== id) return item;
      if (item.status === "Tidak Aktif") return { ...item, status: "Aktif" };
      if (item.status === "Aktif") return { ...item, status: "Selesai" };
      return item;
    }));
  };

  const deleteData = (id: number) => setData(data.filter((item) => item.id !== id));

  const deleteSelected = () => {
    setData(data.filter((item) => !selectedRows.includes(item.id)));
    setSelectedRows([]);
  };

  const toggleSelect = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedRows(selectedRows.length === filteredData.length ? [] : filteredData.map((i) => i.id));
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6 space-y-6 print:hidden">
        <h1 className="text-2xl font-bold">Academic CMS</h1>

        {/* Toolbar */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Tambah Data</button>
            <button onClick={deleteSelected} className="bg-red-500 text-white px-4 py-2 rounded">Hapus</button>
          </div>
          <div className="flex gap-3">
            <input type="text" placeholder="Search periode..." className="border p-2 rounded" value={filter} onChange={(e) => setFilter(e.target.value)} />
            <select className="border p-2 rounded" value={selectedPeriode} onChange={(e) => setSelectedPeriode(e.target.value)}>
              <option value="Semua">Semua</option>
              {[...new Set(data.map((d) => d.namaPeriode))].map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabel */}
        <table className="w-full border mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">
                <input type="checkbox" checked={filteredData.length > 0 && selectedRows.length === filteredData.length} onChange={toggleSelectAll} />
              </th>
              <th className="border p-2">Kode</th>
              <th className="border p-2">Periode</th>
              <th className="border p-2">Start</th>
              <th className="border p-2">End</th>
              <th className="border p-2">UTS</th>
              <th className="border p-2">UAS</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td className="border p-2 text-center">
                  <input type="checkbox" checked={selectedRows.includes(item.id)} onChange={() => toggleSelect(item.id)} />
                </td>
                <td className="border p-2">{item.kodePeriode.toString().slice(-4)}</td>
                <td className="border p-2">{item.namaPeriode}</td>
                <td className="border p-2">{item.startKuliah}</td>
                <td className="border p-2">{item.endKuliah}</td>
                <td className="border p-2">{item.uts}</td>
                <td className="border p-2">{item.uas}</td>
                <td className="border p-2">
                  <span className={`px-2 py-1 rounded text-white text-sm ${
                    item.status === "Aktif" ? "bg-green-500"
                    : item.status === "Selesai" ? "bg-blue-500"
                    : "bg-red-500"
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="border p-2">
                  <div className="flex gap-2 justify-center">
                    {item.status === "Tidak Aktif" && (
                      <button onClick={() => toggleStatus(item.id)} className="bg-green-500 text-white p-1 rounded" title="Ubah ke Aktif"><CheckCircle size={16} /></button>
                    )}
                    {item.status === "Aktif" && (
                      <button onClick={() => toggleStatus(item.id)} className="bg-yellow-500 text-white p-1 rounded" title="Ubah ke Selesai"><CheckCircle size={16} /></button>
                    )}
                    <button onClick={() => setSelectedDetail(item)} className="bg-blue-500 text-white p-1 rounded"><Eye size={16} /></button>
                    <button onClick={() => deleteData(item.id)} className="bg-red-500 text-white p-1 rounded"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isOpen && (
          <ModalTambah form={form} setForm={setForm} onSave={handleAdd} onClose={() => setIsOpen(false)} />
        )}

        {selectedDetail && (
          <ModalDetail
            data={data}
            selectedDetail={selectedDetail}
            setData={setData}
            setSelectedDetail={setSelectedDetail}
          />
        )}
      </div>

      {selectedDetail && <PrintLayout item={selectedDetail} />}
    </>
  );
}
