import React, { useState } from 'react';
import {
  Anchor,
  AppShell, Center, Grid, Group, Header, Loader, LoadingOverlay, Text,
} from '@mantine/core';

import { CodeRunner, RunState } from './python/code-runner';
import { BackendManager } from './python/backend-manager';
import { BackendEventType } from './python/backend-event';
import useInit from './hooks/use-init';
import Logger from './util/logger';
import CodeEditor from './components/CodeEditor';
import Input from './components/Input';
import Output from './components/Output';


function App() {
  const [codeRunner, setCodeRunner] = useState<CodeRunner | null>(null);
  const [runState, setRunState] = useState(RunState.Loading);
  const [message, setMessage] = useState('');
  const [codeRunnerLoading, setCodeRunnerLoading] = useState(true);

  useInit(async () => {
    const codeRunnerInstance = new CodeRunner(
      {},
      (newState) => setRunState(newState),
      (newMessage) => setMessage(newMessage),
      () => setCodeRunnerLoading(!codeRunnerLoading),
    );
    await codeRunnerInstance.init();
    await codeRunnerInstance.start();
    setCodeRunner(codeRunnerInstance);

    BackendManager.subscribe(BackendEventType.Output, (e) => Logger.log(e));
    BackendManager.subscribe(BackendEventType.Input, (e) => Logger.log(e));
    BackendManager.subscribe(BackendEventType.Sleep, (e) => Logger.log(e));
    BackendManager.subscribe(BackendEventType.Loading, (e) => Logger.log(e));
    BackendManager.subscribe(BackendEventType.End, (e) => Logger.log(e));
    BackendManager.subscribe(BackendEventType.Interrupt, (e) => Logger.log(e));
    BackendManager.subscribe(BackendEventType.Start, (e) => Logger.log(e));
  });

  return (

    <AppShell
      header={(
        <Header
          height={50}
          p="sm"
          styles={() => ({
            root: {
              border: '0px',
            },
          })}
        >
          <Group position="apart" mr="xl">
            {/* <LogoSVG height="30px" /> */}
            <Group>
              <Text color="dimmed" italic sx={{ fontSize: '12px' }}>
                Beta 2.0.1
              </Text>
              <Anchor
                href=""
                sx={{
                  color: '#1B5E79',
                  fontFamily: '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
                  position: 'relative',
                  '::before': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '2px',
                    borderRadius: '2px',
                    backgroundColor: '#2fa3cf',
                    bottom: '0',
                    left: '0',
                    transformOrigin: 'right',
                    transform: 'scaleX(0) translate(0%, 100%);',
                    transition: 'transform .3s ease-in-out',
                  },
                  ':hover::before': {
                    transformOrigin: 'left',
                    transform: 'scaleX(1) translate(0%, 100%);',
                  },
                  ':hover': {
                    textDecoration: 'none',
                  },
                }}
              >
               Worker Python
              </Anchor>
              {/* <Anchor sx={{
                color: '#1B5E79',
                fontFamily:
                '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",
                Roboto,"Helvetica Neue",Arial,sans-serif',
                position: 'relative',
                '::before': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '2px',
                  borderRadius: '2px',
                  backgroundColor: '#2fa3cf',
                  bottom: '0',
                  left: '0',
                  transformOrigin: 'right',
                  transform: 'scaleX(0) translate(0%, 100%);',
                  transition: 'transform .3s ease-in-out',
                },
                ':hover::before': {
                  transformOrigin: 'left',
                  transform: 'scaleX(1) translate(0%, 100%);',
                },
                ':hover': {
                  textDecoration: 'none',
                },
              }}
              >
                Palvelusta
              </Anchor>
              <Anchor sx={{
                color: '#1B5E79',
                fontFamily: '-apple-system,system-ui,BlinkMacSystemFont
                ,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
                position: 'relative',
                '::before': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '2px',
                  borderRadius: '2px',
                  backgroundColor: '#2fa3cf',
                  bottom: '0',
                  left: '0',
                  transformOrigin: 'right',
                  transform: 'scaleX(0) translate(0%, 100%);',
                  transition: 'transform .3s ease-in-out',
                },
                ':hover::before': {
                  transformOrigin: 'left',
                  transform: 'scaleX(1) translate(0%, 100%);',
                },
                ':hover': {
                  textDecoration: 'none',
                },
              }}
              >
                Kehittäjä
              </Anchor>
              <Anchor sx={{
                color: '#1B5E79',
                fontFamily: '-apple-system,system-ui,BlinkMacSystemFont
                ,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
                position: 'relative',
                '::before': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '2px',
                  borderRadius: '2px',
                  backgroundColor: '#2fa3cf',
                  bottom: '0',
                  left: '0',
                  transformOrigin: 'right',
                  transform: 'scaleX(0) translate(0%, 100%);',
                  transition: 'transform .3s ease-in-out',
                },
                ':hover::before': {
                  transformOrigin: 'left',
                  transform: 'scaleX(1) translate(0%, 100%);',
                },
                ':hover': {
                  textDecoration: 'none',
                },
              }}
              >
                Asetukset
              </Anchor> */}
            </Group>
          </Group>
        </Header>
        )}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? '#000b10' : '#edf9ff' },
      })}
    >
      <div style={{ position: 'relative' }}>

        <Grid>
          <Grid.Col span={6}>
            <CodeEditor codeRunner={codeRunner} runState={runState} message={message} />
            <Input codeRunner={codeRunner} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Output codeRunner={codeRunner} />
          </Grid.Col>
        </Grid>

      </div>
    </AppShell>
  );
}

export default App;
