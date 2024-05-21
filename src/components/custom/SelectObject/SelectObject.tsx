import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FlexibleObject } from "@/utils/types/general.types";

const SelectObject = ({
  options,
  valueKey,
  labelKey,
  placeholder,
  onValueChange,
  className
}: {
  options: FlexibleObject[];
  valueKey: string;
  labelKey: string;
  placeholder: string;
  onValueChange: (value: string) => void;
  className?: string;
}) => {
  return (
    <Select onValueChange={onValueChange} disabled={!options || options.length === 0}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map(option => (
            <SelectItem
              key={option[valueKey]}
              value={'' + option[valueKey]}
            >
              {option[labelKey]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectObject;
