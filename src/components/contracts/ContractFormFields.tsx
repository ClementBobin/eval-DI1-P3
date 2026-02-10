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


/**
 * ContractFormFields Component
 *
 * This component renders the form fields for creating or editing a contract. It includes fields for the contract title, description, and reward. Each field is accompanied by a label and a hint to guide the user in filling out the form correctly. The component accepts the current form data, a change handler function, and an optional disabled state to control whether the fields are editable.
 *
 * @param {ContractForm} formData - The current state of the form data, including title, description, and reward
 * @param {function} onChange - A function to handle changes to the input fields, updating the form data state
 * @param {boolean} [disabled=false] - An optional prop to disable the input fields when set to true
 * @returns {JSX.Element} - The rendered form fields for the contract form
 * @example
 * <ContractFormFields
 *   formData={{ title: '', description: '', reward: '' }}
 *   onChange={(e) => console.log(e.target.name, e.target.value)}
 *   disabled={false}
 * />
 */
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
