import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Supplier } from "components/common/SupplierCard";

// Convert suppliers to a simplified export format
export const prepareDataForExport = (data: Supplier[]) =>
  data.map(({ id, name, country, rating, moq, location, responseRate, status }:Supplier) => ({
    ID: id,
    Name: name,
    Country: country,
    Rating: rating,
    MOQ: moq,
    Location: location,
    ResponseRate: `${responseRate}%`,
    Status: status,
  }));

export const exportAsCSV = (data: any[]) => {
  const headers = Object.keys(data[0]).join(",");
  const rows = data.map((row) => Object.values(row).join(",")).join("\n");
  const csvContent = `${headers}\n${rows}`;
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "suppliers.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportAsExcel = (data: any[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Suppliers");
  XLSX.writeFile(workbook, "suppliers.xlsx");
};

export const exportAsPDF = async (data: any[]) => {
  const table = document.createElement("table");
  table.style.borderCollapse = "collapse";
  table.style.width = "100%";

  const headers = Object.keys(data[0]);
  const headerRow = table.insertRow();
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.innerText = header;
    th.style.border = "1px solid #ccc";
    th.style.padding = "6px";
    th.style.fontWeight = "bold";
    headerRow.appendChild(th);
  });

  data.forEach((row) => {
    const rowEl = table.insertRow();
    Object.values(row).forEach((val) => {
      const td = document.createElement("td");
      td.innerText = val as string;
      td.style.border = "1px solid #ccc";
      td.style.padding = "6px";
      rowEl.appendChild(td);
    });
  });

  document.body.appendChild(table);
  const canvas = await html2canvas(table);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF();
  pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
  pdf.save("suppliers.pdf");
  document.body.removeChild(table);
};
