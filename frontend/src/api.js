/**
 * Kisaan Setu API Client
 * Connects Frontend with FastAPI + Supabase backend endpoints
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Register a new farmer profile in FastAPI + Supabase
 * @param {Object} data - { full_name, mobile_number, home_address, state, district }
 */
export async function registerFarmer(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/farmers/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.detail || `Registration failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn("Backend registration network call failed, falling back to local session storage:", error);
    // Return structured offline fallback
    const mockToken = `ks_tok_local_${Date.now()}`;
    return {
      status: 'offline_fallback',
      auth_token: mockToken,
      farmer_id: Math.floor(Math.random() * 1000) + 1,
      profile: {
        id: 1,
        full_name: data.full_name,
        mobile_number: data.mobile_number,
        home_address: data.home_address,
        state: data.state,
        district: data.district,
        auth_token: mockToken,
      },
      supabase_synced: false,
      error: error.message,
    };
  }
}

/**
 * Fetch authenticated or active farmer profile from FastAPI / Supabase
 * @param {Object} options - { token, mobile, farmerId }
 */
export async function getFarmerProfile({ token, mobile, farmerId } = {}) {
  try {
    const params = new URLSearchParams();
    if (token) params.append('token', token);
    if (mobile) params.append('mobile', mobile);
    if (farmerId) params.append('farmer_id', farmerId);

    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      headers['x-farmer-token'] = token;
    }
    if (mobile) {
      headers['x-farmer-phone'] = mobile;
    }

    const url = `${API_BASE_URL}/api/farmers/me${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await fetch(url, { method: 'GET', headers });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.detail || `Profile retrieval failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn("Could not fetch remote farmer profile:", error);
    return null;
  }
}

/**
 * Book procurement slot and generate verified Gate Pass
 * @param {Object} bookingData - Profile + Crop + Mandi details
 */
export async function bookSlot(bookingData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/slots/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.detail || `Booking failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn("Backend booking API call failed, generating pass locally:", error);
    const passId = `KS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    return {
      status: 'offline_fallback',
      gate_pass_id: passId,
      booking_details: {
        id: Math.floor(Math.random() * 1000),
        gate_pass_id: passId,
        farmer_name: bookingData.farmer_name,
        crop_type: bookingData.crop_type,
        quantity_quintals: bookingData.quantity_quintals,
        slot_date: bookingData.slot_date,
        slot_time: bookingData.slot_time || '11:00 AM - 01:00 PM',
        mandi_name: bookingData.mandi_name,
        vehicle: bookingData.vehicle || 'Tractor Trolley',
        status: 'Confirmed',
      },
    };
  }
}

/**
 * Fetch Mandi procurement capacity details
 */
export async function getMandis() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/mandis`);
    if (!response.ok) throw new Error("Failed to load mandis");
    return await response.json();
  } catch (error) {
    console.warn("Could not fetch live mandis from API, using defaults:", error);
    return [];
  }
}
