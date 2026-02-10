import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ContractsAPI } from '@/lib/api/contracts';
import { WitchersAPI } from '@/lib/api/witchers';
import type { Contract } from '@/types/contracts';
import type { Witcher } from '@/types/witchers';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import '../contracts.css';

export const ContractDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [contract, setContract] = useState<Contract | null>(null);
  const [witcher, setWitcher] = useState<Witcher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchContractDetails();
    }
  }, [id]);

  const fetchContractDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Récupérer le contrat
      const contractData = await ContractsAPI.getById(id!);
      setContract(contractData);

      // Si le contrat a un sorceleur assigné, récupérer ses infos
      if (contractData.assignedTo) {
        try {
          const witcherData = await WitchersAPI.getById(contractData.assignedTo);
          setWitcher(witcherData);
        } catch (witcherError) {
          console.error('Error fetching witcher:', witcherError);
          // On continue même si on ne peut pas récupérer le sorceleur
        }
      }

    } catch (err) {
      setError('Erreur lors du chargement du contrat');
      console.error(err);
    } finally {
      setLoading(false);
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

  const getStatusClass = (status: string) => {
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

  const formatDescription = (description: string) => {
    const lines = description.split('\n').filter(line => line.trim() !== '');
    return lines.map((line, index) => (
      <p key={index} className="description-line">
        {line}
      </p>
    ));
  };

  if (loading) {
    return (
      <div className="contract-detail-container">
        <div className="loading-container">
          <Spinner size="large" />
          <p>Chargement du contrat...</p>
        </div>
      </div>
    );
  }

  if (error || !contract) {
    return (
      <div className="contract-detail-container">
        <div className="error-container">
          <h2>Contrat non trouvé</h2>
          <p>{error || "Le contrat demandé n'existe pas."}</p>
          <Link to="/contracts">
            <Button variant="outline">
              Retour à la liste des contrats
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="contract-detail-container">
      <div className="contract-detail-header">
        <Link to="/contracts" className="back-link">
          <span className="back-arrow">←</span>
          Retour à la liste
        </Link>
        
        <div className="contract-header-main">
          <h1 className="contract-detail-title">{contract.title}</h1>
          <div className={`contract-status-badge ${getStatusClass(contract.status)}`}>
            {getStatusText(contract.status)}
          </div>
        </div>
      </div>

      <div className="contract-detail-content">
        <div className="contract-detail-card">
          <div className="detail-section">
            <h2 className="detail-section-title">Description</h2>
            <div className="detail-section-content description-content">
              {formatDescription(contract.description)}
            </div>
          </div>

          <div className="detail-info-grid">
            <div className="detail-info-item">
              <h3 className="detail-info-label">Récompense</h3>
              <p className="detail-info-value highlight">{contract.reward}</p>
            </div>

            <div className="detail-info-item">
              <h3 className="detail-info-label">Statut</h3>
              <p className={`detail-info-value ${getStatusClass(contract.status)}`}>
                {getStatusText(contract.status)}
              </p>
            </div>

            {witcher && (
              <div className="detail-info-item">
                <h3 className="detail-info-label">Sorceleur assigné</h3>
                <div className="witcher-info">
                  <p className="witcher-name">{witcher.name}</p>
                  {witcher.school && (
                    <p className="witcher-school">École : {witcher.school}</p>
                  )}
                  {witcher.skills && witcher.skills.length > 0 && (
                    <div className="witcher-skills">
                      <span className="skills-label">Compétences : </span>
                      <span className="skills-list">
                        {witcher.skills.join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {contract.assignedTo && !witcher && (
              <div className="detail-info-item">
                <h3 className="detail-info-label">Sorceleur assigné</h3>
                <p className="detail-info-value">
                  Witcher #{contract.assignedTo}
                  <span className="witcher-not-loaded">
                    (Informations non disponibles)
                  </span>
                </p>
              </div>
            )}

            <div className="detail-info-item">
              <h3 className="detail-info-label">Identifiant du contrat</h3>
              <p className="detail-info-value">#{contract.id}</p>
            </div>
          </div>
        </div>

        <div className="contract-actions">
            <div className="action-group">
                <Link to="/contracts">
                <Button variant="outline" size="lg">
                    Retour aux contrats
                </Button>
                </Link>
                
                <Link to={`/contracts/${contract.id}/edit`}>
                <Button variant="outline" size="lg">
                    Modifier le contrat
                </Button>
                </Link>
            </div>
            
            {(contract.status === 'Available' || contract.status === 'Assigned') && (
                <Button variant="default" size="lg">
                {contract.status === 'Available' ? 'Prendre le contrat' : 'Mettre à jour le statut'}
                </Button>
            )}
        </div>
      </div>
    </div>
  );
};