import { UserRole } from "@/interfaces/User/User";

export interface NavigationItem {
  value: string;
  label: string;
  icon:
    | React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    | (({ boxSize }: { boxSize: string }) => React.JSX.Element);
  roles?: UserRole[];
}
