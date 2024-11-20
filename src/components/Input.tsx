import React, { useEffect, useRef, useState } from 'react';
import { TextInput } from '@mantine/core';
import useInit from '../hooks/use-init';
import { BackendManager } from '../python/backend-manager';
import { BackendEventType } from '../python/backend-event';
import { CodeRunner } from '../python/code-runner';

function Input({ codeRunner }: { codeRunner: CodeRunner | null }) {
  const [prompt, setPrompt] = useState('');
  const [value, setValue] = useState('');
  const ref = useRef<HTMLInputElement>();

  useInit(() => {
    BackendManager.subscribe(BackendEventType.Input, (event) => {
      setPrompt(event.data ?? ''); // Ensure prompt is an empty string if null
    });
    BackendManager.subscribe(BackendEventType.End, () => {
      setPrompt('');
    });
  });

  useEffect(() => {
    ref.current?.focus();
  }, [prompt]);

  return (
    <TextInput
      label="Input"
      value={value}
      placeholder={prompt || 'The program is not asking for input right now'}
      onChange={(e) => setValue(e.currentTarget.value)}
      ref={ref as any}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          codeRunner?.submitInput(value);
          setValue('');
          setPrompt('');
        }
      }}
    />
  );
}

export default Input;