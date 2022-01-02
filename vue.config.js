module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? 'https://oleinikovapolina.github.io/RickAndMorty/dist/'
        : '/',
    transpileDependencies: [
        'vuetify'
    ],
    pwa: {
        name: 'Rick and Morty',
        themeColor: '#000000',
        msTileColor: '#fff',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        manifestOptions: {
            start_url: 'https://oleinikovapolina.github.io/RickAndMorty/dist',
            background_color: '#fff'
        }
    }
}
