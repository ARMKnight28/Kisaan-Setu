import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      portalTitle: "Kisaan Setu",
      portalSubtitle: "Procurement & Slot Allocation Portal (SIH26032)",
      farmerPortal: "Farmer Portal",
      officerPortal: "Mandi Officer View",
      bookSlot: "Book Procurement Slot",
      farmerName: "Farmer Name",
      mobileNumber: "Mobile Number",
      selectMandi: "Select Mandi",
      cropType: "Crop Type",
      quantity: "Qty (Quintals)",
      slotDate: "Preferred Slot Date",
      confirmBtn: "Confirm & Generate Token",
      activeTokens: "Active Procurement Tokens",
      tokenId: "Token ID",
      farmer: "Farmer",
      crop: "Crop",
      qty: "Quantity",
      date: "Date",
      status: "Status",
      viewPass: "View Pass"
    }
  },
  hi: {
    translation: {
      portalTitle: "किसान सेतु",
      portalSubtitle: "खरीद एवं स्लॉट आवंटन पोर्टल (SIH26032)",
      farmerPortal: "किसान पोर्टल",
      officerPortal: "मंडी अधिकारी दृश्य",
      bookSlot: "खरीद स्लॉट बुक करें",
      farmerName: "किसान का नाम",
      mobileNumber: "मोबाइल नंबर",
      selectMandi: "मंडी चुनें",
      cropType: "फसल का प्रकार",
      quantity: "मात्रा (क्विंटल)",
      slotDate: "पसंदीदा स्लॉट तिथि",
      confirmBtn: "पुष्टि करें और टोकन जनरेट करें",
      activeTokens: "सक्रिय खरीद टोकन",
      tokenId: "टोकन आईडी",
      farmer: "किसान",
      crop: "फसल",
      qty: "मात्रा",
      date: "तिथि",
      status: "स्थिति",
      viewPass: "पास देखें"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;