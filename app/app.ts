import { Application } from '@nativescript/core';
import { svelteNativeNoFrame } from 'svelte-native';
import App from './App.svelte';

svelteNativeNoFrame(App, {});
Application.run({ moduleName: 'app-root' });