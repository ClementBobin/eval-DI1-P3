import type { Contract, ContractForm, IStatus } from "@/types/contracts";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Contracts API client
 */
export const ContractsAPI = {
  /**
   * Get all contracts with optional filtering
   * Note: The backend supports filtering contracts by title, assigned witcher, and status. This allows for efficient retrieval of relevant contracts based on user criteria. The API will validate the filters provided and return appropriate error messages if they are invalid, ensuring a robust and user-friendly experience
   * @param filters - An optional object containing filter criteria (title, assignedTo, status)
   * @returns A promise that resolves to an array of contracts matching the filters
   * @throws An error if the fetch fails or if the filters are invalid
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
   * @param id - The ID of the contract to retrieve
   * @returns A promise that resolves to the contract data
   * @throws An error if the fetch fails or if the contract is not found
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
   * Note: The backend will validate that the contract data is complete and that the title is unique before allowing it to be created. This ensures that all contracts in the system have the necessary information and prevents duplicate entries, maintaining data integrity and a good user experience
   * @param contractData - An object containing the contract information (title, description, reward)
   * @returns A promise that resolves to the created contract data
   * @throws An error if the fetch fails or if the contract data is invalid
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
   * Note: This method is intended for updating the title, description, or reward of a contract. It does not handle status changes or assignments, which have their own dedicated methods to ensure proper workflow and validation. The backend will validate that the contract is currently Available before allowing it to be updated, ensuring that only unassigned contracts can be modified in this way
   * @param id - The ID of the contract to update
   * @param contractData - An object containing the updated contract information (title, description, reward)
   * @returns A promise that resolves to the updated contract data
   * @throws An error if the fetch fails, if the contract is not found, or if the contract cannot be updated due to its current status
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
   * Note: The backend will validate that the contract is currently Available before allowing it to be deleted, ensuring that only unassigned contracts can be removed from the system
   * @param id - The ID of the contract to delete
   * @returns A promise that resolves to the deleted contract data
   * @throws An error if the fetch fails, if the contract is not found, or if the contract cannot be deleted due to its current status
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
   * Note: The backend will validate that the contract is currently Available before allowing it to be assigned, ensuring that only unassigned contracts can be taken by witchers
   * @param id - The ID of the contract to assign
   * @param witcherId - The ID of the witcher to assign the contract to
   * @returns A promise that resolves to the updated contract data
   * @throws An error if the fetch fails, if the contract is not found, or if the contract cannot be assigned due to its current status
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
   * Note: The backend will validate that the contract is currently Assigned before allowing it to be marked as Completed
   * This ensures that only contracts that have been assigned to a witcher can be completed, enforcing the correct workflow
   * @param id - The ID of the contract to update
   * @param status - An object containing the new status (should be { status: "Completed" })
   * @returns A promise that resolves to the updated contract data
   * @throws An error if the fetch fails, if the contract is not found, or if the contract cannot be marked as completed due to its current status
   */
  async complete(id: string | number, status: IStatus): Promise<Contract> {
    try {
      const response = await fetch(`${API_URL}/api/contracts/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status.status),
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
      return updatedContract;
    } catch (error) {
      console.error(`Error completing contract ${id}:`, error);
      toast.error("Failed to update contract status");
      throw error;
    }
  },
};