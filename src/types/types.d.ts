/* in @/components/Events/Form.tsx the "disabled" attribute apparently does not exist on InputHTMLAttributes. 
  "disable" exist, but doesn't do the same as "disabled". looked it up but can't fix it :( */

declare global {
  namespace JSX {
    interface IntrinsicElements {
      input: React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      > & { disabled?: boolean };
    }
  }
}
