import QRCode from 'qrcode';

const generateQRCode = async (ticketDetails: any) => {
  try {
    const serializedTicketDetails = JSON.stringify(ticketDetails);
    const qrCodeDataURL = await QRCode.toDataURL(serializedTicketDetails);
    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    return null;
  }
};
export default generateQRCode;
