import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectItem } from '@/components/ui/select';
import './ContractFilters.css';

interface ContractFiltersProps {
  titleFilter: string;
  statusFilter: 'Available' | 'Assigned' | 'Completed' | '';
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  showReset?: boolean;
}


/**
 * ContractFilters Component
 * This component renders the filtering options for the contract list. It includes an input field for filtering contracts by title and a select dropdown for filtering by contract status. The component accepts the current filter values, change handler functions, and an optional prop to control the display of a reset button for clearing filters.
 * @param {string} titleFilter - The current value of the title filter input
 * @param {string} statusFilter - The current value of the status filter select
 * @param {function} onTitleChange - A function to handle changes to the title filter input, updating the filter state
 * @param {function} onStatusChange - A function to handle changes to the status filter select, updating the filter state
 * @param {boolean} [showReset=false] - An optional prop to control whether a reset button is displayed for clearing filters
 * @returns {JSX.Element} - The rendered contract filters component
 * @example
 * <ContractFilters
 *   titleFilter={titleFilter}
 *   statusFilter={statusFilter}
 *   onTitleChange={handleTitleChange}
 *   onStatusChange={handleStatusChange}
 *   showReset={true}
 * />
 */
export const ContractFilters = ({
  titleFilter,
  statusFilter,
  onTitleChange,
  onStatusChange
}: ContractFiltersProps) => {
  return (
    <div className="filters-section filter-card">
      <div className="filters-grid">
        {/* Filtre par titre */}
        <div className="filter-group">
          <Label htmlFor="title-filter" className="ui-label">
            Titre
          </Label>
          <Input
            id="title-filter"
            type="text"
            placeholder="Rechercher par titre..."
            value={titleFilter}
            onChange={onTitleChange}
            className="input-base"
          />
        </div>

        {/* Filtre par statut */}
        <div className="filter-group">
          <Label htmlFor="status-filter" className="ui-label">
            Statut
          </Label>
          <Select
            id="status-filter"
            value={statusFilter}
            onChange={onStatusChange}
            className="select-base"
          >
            <SelectItem value="">Tous les statuts</SelectItem>
            <SelectItem value="Available">Disponible</SelectItem>
            <SelectItem value="Assigned">Assigné</SelectItem>
            <SelectItem value="Completed">Terminé</SelectItem>
          </Select>
        </div>
      </div>
    </div>
  );
};
