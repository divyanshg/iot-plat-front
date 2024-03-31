
import {
    Select as DefaultSelect, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger,
    SelectValue
} from '@/components/ui/select';

interface SelectProps {
  data: {
    value: string;
    label: string;
  }[];
  selectLabel: string;
  placeHolder: string;
  onChange?: (val: string) => void;
  value: string | undefined;
}

export function Select({
  data,
  selectLabel,
  placeHolder,
  value,
  onChange,
}: SelectProps) {
  return (
    <DefaultSelect value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{selectLabel}</SelectLabel>
          {data.map((d) => (
            <SelectItem value={d.value}>{d.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </DefaultSelect>
  );
}
