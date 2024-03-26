export const environment = {
  production: true,
  backendUrl: 'https://mediathek-api.apps.bahuma.io',
  authConfig: {
    domain: 'bhm-mediathek.eu.auth0.com',
    clientId: 'GzLPRTwo05AsOaw3r4om6RQVb2rXUcL1',
    authorizationParams: {
      audience: 'https://mediathek-api.apps.bahuma.io/',
      redirect_uri: "https://mediathek.apps.bahuma.io",
    },
    httpInterceptor: {
      allowedList: [
        'https://mediathek-api.apps.bahuma.io/*',
      ]
    }
  }
};
