import axios from 'axios';
import { API_ENDPOINT } from '../config/api';

const API_URL = `${API_ENDPOINT}/events`;

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