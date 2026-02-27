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
    };
  },
  mounted() {
    this.applyTheme();
  },
  methods: {
    handleSectionClick(item) {
      if (item.id === 'games') {
        const theme = this.isDark ? 'dark' : 'light';
        window.location.href = `https://demo.qazcode.games/auth?lang=en&theme=${theme}`;
      } else {
        this.showToast('This is a gaming demo. Tap Games to continue.');
      }
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
