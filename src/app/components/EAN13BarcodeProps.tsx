import React from 'react';
import Barcode from 'react-barcode';

interface EAN13BarcodeProps {
    value: string;
    heightBarcode: number;
}

const EAN13Barcode: React.FC<EAN13BarcodeProps> = ({ value, heightBarcode }) => {
    return (
        <div className="flex flex-col items-center justify-center" >
            <div className="h-16">
                <><Barcode value={value} height={heightBarcode} /></>
            </div>
        </div >
    );
};

export default EAN13Barcode;
