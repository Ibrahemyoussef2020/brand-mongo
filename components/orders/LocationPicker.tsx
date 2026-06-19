'use client';
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
    ssr: false,
    loading: () => <p style={{ padding: '20px', textAlign: 'center' }}>Loading interactive map...</p>
});

interface LocationPickerProps {
    onSelect: (addr: string) => void;
    onClose: () => void;
}

export default function LocationPicker({ onSelect, onClose }: LocationPickerProps) {
    return (
        <div className="modal-overlay modal-overlay--product location-picker-overlay" onClick={onClose}>
            <div className="modal-content location-picker-content" onClick={(e) => e.stopPropagation()}>
                <div className="location-picker-header">
                    <h3>Pinpoint Shipping Address</h3>
                    <button type="button" onClick={onClose} className="close-btn">&times;</button>
                </div>
                
                <LeafletMap onAddressSelect={(addr) => {
                    onSelect(addr);
                    onClose();
                }} />
            </div>
        </div>
    );
}
