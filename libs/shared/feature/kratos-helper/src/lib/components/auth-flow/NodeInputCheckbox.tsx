import { Checkbox } from '@chakra-ui/react';
import { getNodeLabel } from '@ory/integrations/ui';
import { NodeInputProps } from './helpers';

export function NodeInputCheckbox<T>({
  node,
  attributes,
  setValue,
  disabled,
}: NodeInputProps) {
  // Render a checkbox.s
  return (
    <Checkbox
      name={attributes.name}
      defaultChecked={attributes.value === true}
      onChange={(e) => setValue(e.target.checked)}
      disabled={attributes.disabled || disabled}
      isInvalid={node.messages.some(({ type }) => type === 'error')}
    >
      {getNodeLabel(node as any)}
      <br />
      {node.messages.map(({ text }) => text).join('\n')}
    </Checkbox>
  );
}
