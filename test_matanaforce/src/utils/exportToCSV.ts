import type { AcademicData } from "../types/AcademicData";

export const exportToCSV = (item: AcademicData) => {
  const headers = [
    "Kode Periode", "Tahun Ajaran", "Semester", "Nama Periode",
    "Nama Singkat", "Tanggal Awal Kuliah", "Tanggal Akhir Kuliah",
    "Jadwal UTS", "Jadwal UAS", "Status",
  ];
  const values = [
    item.kodePeriode, item.tahunAjaran, item.semester, item.namaPeriode,
    item.namaSingkat, item.startKuliah, item.endKuliah, item.uts, item.uas, item.status,
  ].map((v) => `"${String(v).replace(/"/g, '""')}"`);

  const csv = [headers.join(","), values.join(",")].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${item.namaPeriode}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};
