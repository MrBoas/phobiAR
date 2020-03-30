import Vue from 'vue'
import Vuetify from 'vuetify/lib'
// import 'vuetify/src/stylus/app.styl'
import 'vuetify/src/styles/main.sass'

Vue.use(Vuetify, {
  iconfont: 'md',
})

export default new Vuetify({
  icons: {
    iconfont: 'md',  // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
  },
  theme: {
    dark: false,
  },
  // themes: {
  //   light: {
  //     primary: "#4682b4",
  //     secondary: "#b0bec5",
  //     accent: "#8c9eff",
  //     error: "#b71c1c",
  //   },
  // },
})