import { TypeStatusAlumno } from '@/app/utils/TypeStatusAlumno';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';



export const namesSheets = (file: File): Promise<string[]> => {
  return new Promise<string[]>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target?.result as ArrayBuffer;
      const wb = XLSX.read(bufferArray, { type: 'buffer' });
      const sheetNames = wb.SheetNames;
      resolve(sheetNames);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const readEncabezadoRowAndColumn = (
  file: File,
  indexHoja: number,
  searchTerms: string[]
): Promise<{ row: number, col: number } | null> => {
  return new Promise<{ row: number, col: number } | null>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      try {
        const bufferArray = e.target?.result as ArrayBuffer;
        const wb = XLSX.read(bufferArray, { type: 'buffer' });
        const wsname = wb.SheetNames[indexHoja];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

        let result = null;
        for (let i = 0; i < data.length; i++) {
          const row = data[i];
          if (Array.isArray(row)) {
            const upperCaseRow = row.map(cell => String(cell).toUpperCase());
            for (let j = 0; j < upperCaseRow.length; j++) {
              if (searchTerms.includes(upperCaseRow[j])) {
                result = { row: i, col: j };
                break;
              }
            }
            if (result) break;
          }
        }

        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};


export const readColumnsData = (
  file: File,
  startRow: number = 0,
  indexColumn: number,
  indexSheet: number): Promise<any[]> => {
  return new Promise<any[]>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target?.result as ArrayBuffer;
      const wb = XLSX.read(bufferArray, { type: 'buffer' });
      const wsname = wb.SheetNames[indexSheet];
      const ws = wb.Sheets[wsname];

      const options = {
        header: 1,
        range: startRow
      };

      const data: any[][] = XLSX.utils.sheet_to_json(ws, options);

      const columnData = data.map(row => row[indexColumn]);

      resolve(columnData);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};


const isRed = (color: string): boolean => {

  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  return r > 200 && g < 100 && b < 100;
};

const isYellow = (color: string): boolean => {

  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  return r > 200 && g > 200 && b < 100;
};

//readColumnsColorsData
export const readColumnsColorsData = (
  file: File,
  startRow: number = 0,
  indexColumn: number,
  indexSheet: number
): Promise<{ value: any; fillColor: string }[]> => {
  

  return new Promise<{ value: any; fillColor: string }[]>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target?.result as ArrayBuffer;
      const wb = XLSX.read(bufferArray, { type: 'buffer' });
      const wsname = wb.SheetNames[indexSheet];
      const ws = wb.Sheets[wsname];
      console.log('Carga file--')
      const options = {
        header: 1,
        range: startRow,
        cellStyles: true,
      };

      const data: any[][] = XLSX.utils.sheet_to_json(ws, options);

      const columnData = data.map((row, rowIndex) => {
        // console.log('rowIndex '+rowIndex)
        if (row[indexColumn] !== undefined) {
          const cellAddress = XLSX.utils.encode_cell({ c: indexColumn, r: startRow + rowIndex });
          const fillColor = ws[cellAddress]?.fill?.fgColor?.rgb || 'transparent';
          console.log(`Cell at column ${indexColumn}, row ${startRow + rowIndex}: ${fillColor}`);
          return {
            value: row[indexColumn],
            fillColor,
          };
        } else {
          return {
            value: '',
            fillColor: 0,
          };
        }
      });

      resolve(columnData);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};