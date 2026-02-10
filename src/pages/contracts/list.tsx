import { useEffect, useState } from 'react';
import { ContractsAPI } from '@/lib/api/contracts';
import type { Contract } from '@/types/contracts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import './contracts.css';

export const ContractsList = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      setLoading(true);
      const data = await ContractsAPI.getAll();
      setContracts(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des contrats');
      console.error(err);
    } finally {
      setLoading(false);
    }
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

  const formatReward = (reward: string) => {
    if (reward.toLowerCase().includes('récompense') || reward.toLowerCase().includes('reward')) {
      return reward;
    }
    return `Récompense : ${reward}`;
  };

  if (loading) {
    return (
      <div className="contracts-container">
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

      <div className="contracts-grid">
        {contracts.map((contract) => (
          <Card 
            key={contract.id} 
            className={`contract-card ${getStatusColor(contract.status)}`}
          >
            <CardHeader className="contract-card-header">
              <div className="contract-header-content">
                <CardTitle className="contract-title">
                  {contract.title}
                </CardTitle>
                <span className={`status-badge ${getStatusColor(contract.status)}-badge`}>
                  {getStatusText(contract.status)}
                </span>
              </div>
            </CardHeader>
            
            <CardContent className="contract-card-content">
              <CardDescription className="contract-description">
                {contract.description.split('\n').map((line, i) => (
                  <>
                    <p key={i} className="contract-description-line">
                      {line}
                    </p>
                    <br key={`br-${i}`} />
                  </>
                ))}
              </CardDescription>
            </CardContent>
            
            <CardFooter className="contract-card-footer">
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
            </CardFooter>
          </Card>
        ))}
      </div>

      {contracts.length === 0 && (
        <div className="no-contracts">
          Aucun contrat disponible pour le moment.
        </div>
      )}
    </div>
  );
};