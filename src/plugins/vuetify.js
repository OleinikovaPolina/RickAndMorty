import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {dark: sessionStorage.getItem('theme') === 'true' ? true : false}
});
