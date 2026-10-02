'use client';
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
    ssr: false,
    loading: () => (
        <div 
            className="skelton-shimmer" 
            style={{ 
                height: '350px', 
                width: '100%', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b',
                fontSize: '14px'
            }}
        />
    )
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
