const PaymentCancel = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-red-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-700">Payment Cancelled</h1>
        <p className="mt-4">No charges were made. You can try again anytime.</p>
      </div>
    </div>
  );
};

export default PaymentCancel;
