import type { Witcher } from "@/types/witchers";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Witchers API client
 * Provides methods to interact with the backend API for witcher data
 * Handles API calls and error management with user-friendly notifications
 * @example
 * // Fetch all witchers
 * const witchers = await WitchersAPI.getAll();
 *
 * // Fetch a witcher by ID
 * const witcher = await WitchersAPI.getById(1);
 */
export const WitchersAPI = {
  /**
   * Get all witchers
   * @returns A promise that resolves to an array of witchers
   * @throws An error if the fetch fails
   */
  async getAll(): Promise<Witcher[]> {
    try {
      const response = await fetch(`${API_URL}/api/witchers/`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching witchers:", error);
      toast.error("Failed to fetch witchers");
      throw error;
    }
  },

  /**
   * Get a witcher by ID
   * @param id - The ID of the witcher to retrieve
   * @returns A promise that resolves to the witcher data
   * @throws An error if the fetch fails or if the witcher is not found
   */
  async getById(id: string | number): Promise<Witcher> {
    try {
      const response = await fetch(`${API_URL}/api/witchers/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          const error: Error = await response.json();
          toast.error(error.message || "Witcher not found");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching witcher ${id}:`, error);
      toast.error("Failed to fetch witcher");
      throw error;
    }
  },
};