import { registerSW } from 'virtual:pwa-register';

// Register service worker with update prompt
const updateSW = registerSW({
  onNeedRefresh() {
    // Show a notification to the user that a new version is available
    if (confirm('Nova versão disponível! Deseja atualizar o aplicativo?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App pronto para uso offline!');
    // Optionally show a toast notification
    // You can integrate with a toast library like sonner here
  },
  onRegistered(registration) {
    console.log('Service Worker registrado:', registration);
  },
  onRegisterError(error) {
    console.error('Erro ao registrar Service Worker:', error);
  },
});

export default updateSW;
