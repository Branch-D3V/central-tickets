import { Plan } from "@/interfaces/Plan";

export interface PaymentModalComponentProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  plan: Plan;
  onSuccess?: () => void;
}
