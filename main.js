const { createApp } = Vue;

createApp({
  data() {
    return {
      sections: [
        {
          id: 'account',
          title: 'My account',
          subtitle: 'Balance, bills, usage',
          icon: '👤',
        },
        {
          id: 'services',
          title: 'Services',
          subtitle: 'Add-ons and extras',
          icon: '🧩',
        },
        {
          id: 'tariffs',
          title: 'Tariffs',
          subtitle: 'Upgrade your plan',
          icon: '📶',
        },
        {
          id: 'support',
          title: 'Support',
          subtitle: 'Chat with an agent',
          icon: '💬',
        },
        {
          id: 'games',
          title: 'Games',
          subtitle: 'Play & earn bonuses',
          icon: '🎮',
        },
        {
          id: 'travel',
          title: 'Roaming',
          subtitle: 'Travel packages',
          icon: '✈️',
        },
      ],
      toast: '',
      toastTimeout: null,
      isDark: false,
      showDesktopDialog: false,
      showQr: false,
      pendingGamesUrl: '',
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https%3A%2F%2Fapp.qazcode.games',
    };
  },
  mounted() {
    this.applyTheme();
  },
  methods: {
    handleSectionClick(item) {
      if (item.id === 'games') {
        const theme = this.isDark ? 'dark' : 'light';
        this.pendingGamesUrl = `https://demo.qazcode.games/auth/?lang=en&theme=${theme}`;

        if (this.isMobileDevice()) {
          this.openGamesUrl();
          return;
        }

        this.showDesktopDialog = true;
        this.showQr = false;
      } else {
        this.showToast('This is a gaming demo. Tap Games to continue.');
      }
    },
    isMobileDevice() {
      const ua = navigator.userAgent || '';
      const mobileUa = /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(ua);
      const smallScreen = window.matchMedia('(max-width: 900px)').matches;
      const touch = navigator.maxTouchPoints > 0;
      return mobileUa || (smallScreen && touch);
    },
    openGamesUrl() {
      if (!this.pendingGamesUrl) {
        return;
      }
      window.location.assign(this.pendingGamesUrl);
    },
    closeDesktopDialog() {
      this.showDesktopDialog = false;
      this.showQr = false;
      this.pendingGamesUrl = '';
    },
    showQrCode() {
      this.showQr = true;
    },
    continueAnyway() {
      this.openGamesUrl();
    },
    toggleTheme() {
      this.applyTheme();
    },
    applyTheme() {
      document.body.classList.toggle('theme-dark', this.isDark);
      document.body.classList.toggle('theme-light', !this.isDark);
    },
    showToast(message) {
      this.toast = message;
      if (this.toastTimeout) {
        clearTimeout(this.toastTimeout);
      }
      this.toastTimeout = setTimeout(() => {
        this.toast = '';
      }, 2400);
    },
  },
}).mount('#app');
