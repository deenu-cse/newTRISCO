import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Payment() {
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const { id } = useParams()

    useEffect(() => {
        const getPaymentQRCode = async () => {
            try {
                const response = await fetch(`http://localhost:3000/payment/${id}`);
                const data = await response.json();

                if (response.ok) {
                    setQrCodeUrl(data.qrCodeUrl);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching QR code:', error);
            }
        }
        getPaymentQRCode();
    }, [id])

    return (
        <>
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <h1>Payment QR Code</h1>
                {qrCodeUrl ? (
                    <>
                        <h2>Scan to Pay</h2>
                        <img src={qrCodeUrl} alt="QR Code" style={{ width: '300px', height: '300px' }} />
                    </>
                ) : (
                    <p>Loading QR Code...</p>
                )}
            </div>
        </>
    )
}
