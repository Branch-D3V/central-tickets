export interface ImageUploaderProps {
  value?: string | null;
  onChange: (file: File | null) => void;
}
