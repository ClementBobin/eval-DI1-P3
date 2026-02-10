import { Link } from 'react-router-dom';
import type { Contract } from '@/types/contracts';
import './ContractCard.css';

interface ContractCardProps {
  contract: Contract;
}


/**
 * ContractCard Component
 * This component represents a card that displays the details of a contract. It includes the contract's title, description, reward, status, and assigned witcher (if applicable). The card is styled based on the contract's status and provides a link to the contract's detail page.
 * @param {Contract} contract - The contract object containing details to be displayed on the card
 * @returns {JSX.Element} - The rendered contract card component
 * @example
 * <ContractCard contract={contract} />
 */
export const ContractCard = ({ contract }: ContractCardProps) => {

  // Helper functions to determine styling and text based on contract status
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


  // Helper function to convert status text to a more user-friendly format
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


  // Helper function to determine the CSS class for the status badge based on contract status
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


  // Helper function to format the contract description, splitting it into paragraphs based on newline characters
  const formatDescription = (description: string) => {
    const lines = description.split('\n').filter(line => line.trim() !== '');
    return lines.map((line, index) => (
      <p key={index} className="contract-description-line">
        {line}
      </p>
    ));
  };

  // Helper function to format the reward text, ensuring it includes a label if not already present
  const formatReward = (reward: string) => {
    if (reward.toLowerCase().includes('récompense') || reward.toLowerCase().includes('reward')) {
      return reward;
    }
    return `Récompense : ${reward}`;
  };

  return (
    <Link
      to={`/contracts/${contract.id}`}
      className="contract-card-link"
    >
      <div className={`contract-card ${getStatusColor(contract.status)}`}>
        <div className="contract-card-header">
          <div className="contract-header-content">
            <h2 className="contract-title">
              {contract.title}
            </h2>
          </div>
        </div>
        
        <div className="contract-card-content">
          <div className="contract-description">
            {formatDescription(contract.description)}
            <span className={`status-badge ${getStatusBadgeClass(contract.status)}`}>
              {getStatusText(contract.status)}
            </span>
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
  );
};
