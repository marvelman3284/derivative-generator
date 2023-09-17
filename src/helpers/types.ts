// DOC: needed types.
export interface OptionValues {
  useTrig: boolean,
  useInvTrig: boolean,
  useExp: boolean,
  useLog: boolean,
  useChain: boolean,
  useQuotient: boolean,
  useProduct: boolean,
  numTerms: number 
}

export interface OptionFormProps {
  onSubmit: (optionData: OptionValues) => void;
}
