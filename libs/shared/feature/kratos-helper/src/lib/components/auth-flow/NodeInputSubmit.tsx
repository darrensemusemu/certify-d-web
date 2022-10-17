import { Button } from '@certify-d/shared-ui';
import { getNodeLabel } from '@ory/integrations/ui';
import { FormEvent } from 'react';

import { NodeInputProps } from './helpers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function NodeInputSubmit<T>({
  node,
  attributes,
  setValue,
  disabled,
  dispatchSubmit,
}: NodeInputProps) {
  return (
    <Button
      variant={'solid'}
      minW={'50%'}
      name={attributes.name}
      onClick={(e: MouseEvent | FormEvent<Element>) => {
        // On click, we set this value, and once set, dispatch the submission!
        setValue(attributes.value).then(() => dispatchSubmit(e));
      }}
      value={attributes.value || ''}
      disabled={attributes.disabled || disabled}
    >
      {getNodeLabel(node)}
    </Button>
  );
}
