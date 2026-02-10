import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContractsAPI } from '@/lib/api/contracts';
import type { Contract } from '@/types/contracts';
import { useDebounce } from '@/hooks/use-debounce';
import { Spinner } from '../../components/ui/spinner';
import { ContractCard } from '@/components/contracts/ContractCard';
import { ContractFilters as ContractFiltersComponent } from '@/components/contracts/ContractFilters';
import '@/styles/contracts-global.css';

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
        <div className="header-top">
          <h1>Liste des Contrats</h1>
          <Link to="/contracts/create" className="new-contract-button">
            <span className="button-icon">+</span>
            Nouveau contrat
          </Link>
        </div>
        <p className="contracts-count">{contracts.length} contrat(s) trouvé(s)</p>
      </header>

      {/* Section des filtres */}
      <ContractFiltersComponent
        titleFilter={filters.title || ''}
        statusFilter={filters.status}
        onTitleChange={handleTitleChange}
        onStatusChange={handleStatusChange}
        showReset={!!(filters.title || filters.status)}
      />

      {/* Grille des contrats */}
      <div className="contracts-grid">
        {contracts.map((contract) => (
          <ContractCard key={contract.id} contract={contract} />
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