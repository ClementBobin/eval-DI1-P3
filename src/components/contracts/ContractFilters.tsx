import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectItem } from '@/components/ui/select';
import { Button } from '../ui/button';
import './ContractFilters.css';

interface ContractFiltersProps {
  titleFilter: string;
  statusFilter: 'Available' | 'Assigned' | 'Completed' | '';
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  showReset?: boolean;
}

export const ContractFilters = ({
  titleFilter,
  statusFilter,
  onTitleChange,
  onStatusChange,
  showReset = false
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
