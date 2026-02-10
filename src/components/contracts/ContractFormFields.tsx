import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ContractForm } from '@/types/contracts';
import './ContractFormFields.css';

interface ContractFormFieldsProps {
  formData: ContractForm;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

export const ContractFormFields = ({ formData, onChange, disabled = false }: ContractFormFieldsProps) => {
  return (
    <>
      {/* Champ Titre */}
      <div className="form-group">
        <Label htmlFor="title" className="form-label required">
          Titre du contrat
        </Label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="Ex: Éliminer les Nekkers près du vieux moulin"
          value={formData.title}
          onChange={onChange}
          disabled={disabled}
          required
          className="form-input"
        />
        <p className="form-hint">
          Donnez un titre clair et descriptif au contrat
        </p>
      </div>

      {/* Champ Description */}
      <div className="form-group">
        <Label htmlFor="description" className="form-label required">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Décrivez en détail la mission, les dangers potentiels, la localisation..."
          value={formData.description}
          onChange={onChange}
          disabled={disabled}
          required
          rows={6}
          className="form-textarea"
        />
        <p className="form-hint">
          Soyez précis sur les détails de la mission. Utilisez des retours à la ligne pour structurer votre texte.
        </p>
      </div>

      {/* Champ Récompense */}
      <div className="form-group">
        <Label htmlFor="reward" className="form-label required">
          Récompense
        </Label>
        <Input
          id="reward"
          name="reward"
          type="text"
          placeholder="Ex: 300 Crowns et une amélioration d'épée en argent"
          value={formData.reward}
          onChange={onChange}
          disabled={disabled}
          required
          className="form-input"
        />
        <p className="form-hint">
          Indiquez clairement la récompense pour le sorceleur
        </p>
      </div>
    </>
  );
};
