import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportExcel = ({ data }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const filename = "data.xlsx";
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, filename);
  };

  return <button onClick={exportToExcel}>Export to Excel</button>;
};

export default ExportExcel;
