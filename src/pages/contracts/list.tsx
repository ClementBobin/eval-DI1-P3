import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContractsAPI } from '@/lib/api/contracts';
import type { Contract } from '@/types/contracts';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectItem } from '@/components/ui/select';
import { useDebounce } from '@/hooks/use-debounce';
import './contracts.css';
import { Spinner } from '../../components/ui/spinner';

// Types pour les filtres
interface ContractFilters {
  title?: string;
  status?: 'Available' | 'Assigned' | 'Completed' | '';
}

export const ContractsList = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // États pour les filtres
  const [filters, setFilters] = useState<ContractFilters>({
    title: '',
    status: ''
  });
  
  // Utiliser le debounce pour le titre (éviter trop d'appels API)
  const debouncedTitle = useDebounce(filters.title, 1000);

  // Fonction pour récupérer les contrats avec filtres
  const fetchContracts = async (currentFilters: ContractFilters) => {
    try {
      setLoading(true);
      
      // Préparer les filtres pour l'API
      const apiFilters = {
        title: currentFilters.title || undefined,
        status: currentFilters.status || undefined
      };
      
      const data = await ContractsAPI.getAll(apiFilters);
      setContracts(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des contrats');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Charger les contrats au premier rendu
  useEffect(() => {
    fetchContracts(filters);
  }, []);

  // Recharger les contrats quand les filtres changent
  useEffect(() => {
    fetchFilters();
  }, [debouncedTitle, filters.status]);

  // Fonction pour gérer les changements de filtres
  const fetchFilters = () => {
    fetchContracts(filters);
  };

  // Gérer le changement du titre
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      title: event.target.value
    }));
  };

  // Gérer le changement du statut
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as 'Available' | 'Assigned' | 'Completed' | '';
    setFilters(prev => ({
      ...prev,
      status: value
    }));
  };

  // Réinitialiser les filtres
  const handleResetFilters = () => {
    setFilters({
      title: '',
      status: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'status-available';
      case 'Assigned':
        return 'status-assigned';
      case 'Completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Available':
        return 'Disponible';
      case 'Assigned':
        return 'Assigné';
      case 'Completed':
        return 'Terminé';
      default:
        return status;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Available':
        return 'status-badge-available';
      case 'Assigned':
        return 'status-badge-assigned';
      case 'Completed':
        return 'status-badge-completed';
      default:
        return '';
    }
  };

  // Fonction pour formater la description
  const formatDescription = (description: string) => {
    const lines = description.split('\n').filter(line => line.trim() !== '');
    return lines.map((line, index) => (
      <p key={index} className="contract-description-line">
        {line}
      </p>
    ));
  };

  // Formater la récompense
  const formatReward = (reward: string) => {
    if (reward.toLowerCase().includes('récompense') || reward.toLowerCase().includes('reward')) {
      return reward;
    }
    return `Récompense : ${reward}`;
  };

  if (loading && contracts.length === 0) {
    return (
      <div className="contracts-container">
        <Spinner size="large" />
        <div className="loading">Chargement des contrats...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="contracts-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="contracts-container">
      <header className="contracts-header">
        <h1>Liste des Contrats</h1>
        <p className="contracts-count">{contracts.length} contrat(s) trouvé(s)</p>
      </header>

      {/* Section des filtres */}
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
              value={filters.title}
              onChange={handleTitleChange}
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
              value={filters.status}
              onChange={handleStatusChange}
              className="select-base"
            >
              <SelectItem value="">Tous les statuts</SelectItem>
              <SelectItem value="Available">Disponible</SelectItem>
              <SelectItem value="Assigned">Assigné</SelectItem>
              <SelectItem value="Completed">Terminé</SelectItem>
            </Select>
          </div>
        </div>

        {/* Bouton de réinitialisation */}
        {(filters.title || filters.status) && (
          <div className="filters-actions">
            <button 
              type="button" 
              className="reset-button"
              onClick={handleResetFilters}
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      {/* Grille des contrats */}
      <div className="contracts-grid">
        {contracts.map((contract) => (
          <Link 
            to={`/contracts/${contract.id}`} 
            key={contract.id}
            className="contract-card-link"
          >
            <div className={`contract-card ${getStatusColor(contract.status)}`}>
              <div className="contract-card-header">
                <div className="contract-header-content">
                  <h2 className="contract-title">
                    {contract.title}
                  </h2>
                  <span className={`status-badge ${getStatusBadgeClass(contract.status)}`}>
                    {getStatusText(contract.status)}
                  </span>
                </div>
              </div>
              
              <div className="contract-card-content">
                <div className="contract-description">
                  {formatDescription(contract.description)}
                </div>
              </div>
              
              <div className="contract-card-footer">
                <div className="contract-footer-content">
                  <div className="contract-reward">
                    <span className="reward-value">{formatReward(contract.reward)}</span>
                  </div>
                  {contract.assignedTo && (
                    <div className="contract-assigned">
                      <span className="assigned-label">Assigné à :</span>
                      <span className="assigned-value">Witcher #{contract.assignedTo}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {contracts.length === 0 && !loading && (
        <div className="no-contracts">
          {filters.title || filters.status ? (
            <>
              <p>Aucun contrat ne correspond à vos critères de recherche.</p>
              <button 
                type="button" 
                className="reset-button"
                onClick={handleResetFilters}
              >
                Réinitialiser les filtres
              </button>
            </>
          ) : (
            <p>Aucun contrat disponible pour le moment.</p>
          )}
        </div>
      )}
    </div>
  );
};