
"use client";
import { PDFViewer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import React from "react";



interface PrintableTableProps {
    data: { noLista: number; nombre: string; codigoBarras: string }[];
}

const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF"
    },
    section: {
        margin: 30,
        padding: 10,
        flexGrow: 1,
    },
    table: {
        width: "100%",
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        alignItems: "center",
        height: 24,
        fontSize: 12,
    },
    cell: {
        padding: 5,
    },
});

const PrintableTable: React.FC<PrintableTableProps> = ({ data }) => {
    return (
        <div className="mr-3 ml-72 mt-14 h-screen">
            <PDFViewer className="" style={{ width: "100%", height: "100vh" }}>
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                            <Text>Tabla de Datos</Text>



                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
};

export default PrintableTable;
