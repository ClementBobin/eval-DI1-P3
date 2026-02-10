import type { Witcher } from "@/types/witchers";
import type { Error } from "@/types/global";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Witchers API client
 */
export const WitchersAPI = {
  /**
   * Get all witchers
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