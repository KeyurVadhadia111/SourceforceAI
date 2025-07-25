// utils/ExportGeneric.ts
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const prepareGenericExport = (
    data: any[],
    headers: readonly string[],
    fields: readonly string[]
): Record<string, string | number>[] => {
    return data.map((item) => {
        const row: Record<string, string | number> = {};
        fields.forEach((field, index) => {
            row[headers[index]] = item[field];
        });
        return row;
    });
};


export const exportGenericCSV = (data: any[], fileName = "export") => {
    if (!data.length) return;
    const headers = Object.keys(data[0]).join(",");
    const rows = data
        .map((row) => Object.values(row).map(escapeCSVValue).join(","))
        .join("\n");
    const csvContent = `${headers}\n${rows}`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const escapeCSVValue = (value: any) => {
    if (typeof value === "string") {
        return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
};
