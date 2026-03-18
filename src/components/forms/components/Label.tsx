type LabelProps = {
  label: string;
}

export function Label({ label }: LabelProps) {
  return(
    <span className="font-normal text-lg">{label}</span>
  )
}