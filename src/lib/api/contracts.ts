import type { Contract, ContractForm, IStatus } from "@/types/contracts";
import type { Error } from "@/types/global";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Contracts API client
 */
export const ContractsAPI = {
  /**
   * Get all contracts with optional filtering
   */
  async getAll(filters?: {
    title?: string;
    assignedTo?: number;
    status?: "Available" | "Assigned" | "Completed";
  }): Promise<Contract[]> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters?.title) queryParams.append("title", filters.title);
      if (filters?.assignedTo) queryParams.append("assignedTo", filters.assignedTo.toString());
      if (filters?.status) queryParams.append("status", filters.status);

      const queryString = queryParams.toString();
      const url = queryString ? `${API_URL}/api/contracts/?${queryString}` : `${API_URL}/api/contracts/`;

      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 400) {
          const error: Error = await response.json();
          toast.error(error.message || "Bad filters provided");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching contracts:", error);
      toast.error("Failed to fetch contracts");
      throw error;
    }
  },

  /**
   * Get a contract by ID
   */
  async getById(id: string | number): Promise<Contract> {
    try {
      const response = await fetch(`${API_URL}/api/contracts/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          const error: Error = await response.json();
          toast.error(error.message || "Contract not found");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching contract ${id}:`, error);
      toast.error("Failed to fetch contract");
      throw error;
    }
  },

  /**
   * Create a new contract
   */
  async create(contractData: ContractForm): Promise<Contract> {
    try {
      const response = await fetch(`${API_URL}/api/contracts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contractData),
      });

      if (!response.ok) {
        if (response.status === 400) {
          const error: Error = await response.json();
          toast.error(error.message || "Invalid contract data");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const createdContract = await response.json();
      toast.success("Contract created successfully");
      return createdContract;
    } catch (error) {
      console.error("Error creating contract:", error);
      toast.error("Failed to create contract");
      throw error;
    }
  },

  /**
   * Update a contract's basic information
   */
  async update(id: string | number, contractData: ContractForm): Promise<Contract> {
    try {
      const response = await fetch(`${API_URL}/api/contracts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contractData),
      });

      if (!response.ok) {
        if (response.status === 400) {
          const error: Error = await response.json();
          toast.error(error.message || "Invalid contract data");
        } else if (response.status === 404) {
          const error: Error = await response.json();
          toast.error(error.message || "Contract not found");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedContract = await response.json();
      toast.success("Contract updated successfully");
      return updatedContract;
    } catch (error) {
      console.error(`Error updating contract ${id}:`, error);
      toast.error("Failed to update contract");
      throw error;
    }
  },

  /**
   * Delete a contract
   */
  async delete(id: string | number): Promise<Contract> {
    try {
      const response = await fetch(`${API_URL}/api/contracts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        if (response.status === 404) {
          const error: Error = await response.json();
          toast.error(error.message || "Contract not found");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const deletedContract = await response.json();
      toast.success("Contract deleted successfully");
      return deletedContract;
    } catch (error) {
      console.error(`Error deleting contract ${id}:`, error);
      toast.error("Failed to delete contract");
      throw error;
    }
  },

  /**
   * Assign a contract to a witcher
   */
  async assign(id: string | number, witcherId: number): Promise<Contract> {
    try {
      const response = await fetch(`${API_URL}/api/contracts/${id}/assignedTo`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(witcherId),
      });

      if (!response.ok) {
        if (response.status === 400) {
          const error: Error = await response.json();
          toast.error(error.message || "Unknown witcher");
        } else if (response.status === 404) {
          const error: Error = await response.json();
          toast.error(error.message || "Contract not found");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedContract = await response.json();
      toast.success("Contract assigned successfully");
      return updatedContract;
    } catch (error) {
      console.error(`Error assigning contract ${id}:`, error);
      toast.error("Failed to assign contract");
      throw error;
    }
  },

  /**
   * Update contract status to Completed
   */
  async complete(id: string | number, status: IStatus): Promise<Contract> {
    try {
      const response = await fetch(`${API_URL}/api/contracts/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status),
      });

      if (!response.ok) {
        if (response.status === 400) {
          const error: Error = await response.json();
          toast.error(error.message || "Cannot mark as completed. Contract must be assigned first.");
        } else if (response.status === 404) {
          const error: Error = await response.json();
          toast.error(error.message || "Contract not found");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedContract = await response.json();
      toast.success("Contract marked as completed");
      return updatedContract;
    } catch (error) {
      console.error(`Error completing contract ${id}:`, error);
      toast.error("Failed to update contract status");
      throw error;
    }
  },
};