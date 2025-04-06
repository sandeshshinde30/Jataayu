import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api/events' 
  : 'http://localhost:5000/api/events';

// Get upcoming events
export const getUpcomingEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/upcoming`);
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    return [];
  }
};

// Get past events
export const getPastEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/past`);
    return response.data;
  } catch (error) {
    console.error('Error fetching past events:', error);
    return [];
  }
};

// Get event by ID
export const getEventById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching event with ID ${id}:`, error);
    throw error;
  }
};

export default {
  getUpcomingEvents,
  getPastEvents,
  getEventById
}; 