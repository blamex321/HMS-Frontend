import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');
  const navigate = useNavigate();

  useEffect(() => {
    const finalizeBooking = async () => {
      try {
        const session = await api.get(`/payment/stripe/session/${sessionId}`);
  
        const { doctorId, date, reason } = session.data.metadata;
  
        await api.post('/appointments', {
          doctorId,
          date,
          reason,
        });
  
        // Optional: Show toast or loader
        setTimeout(() => {
          navigate('/patient/appointments');
        }, 1500); // 👈 1.5 sec delay before redirect
      } catch (err) {
        console.error('Failed to confirm appointment:', err);
        alert('Something went wrong while confirming your appointment.');
        navigate('/patient/appointments');
      }
    };
  
    if (sessionId) finalizeBooking();
  }, [sessionId]);
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      <h1 className="text-3xl font-bold text-green-700">Payment Successful! Confirming your appointment...</h1>
    </div>
  );
};

export default PaymentSuccess;
