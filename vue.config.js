module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    pwa: {
        name: 'Rick and Morty',
        themeColor: '#000000',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        icons: [
            {
                src: "favicon.ico",
                sizes: "64x64 32x32 24x24 16x16",
                type: "image/x-icon"
            },
            {
                "src": "logo192.png",
                "type": "image/png",
                "sizes": "192x192"
            },
            {
                "src": "logo512.png",
                "type": "image/png",
                "sizes": "512x512"
            }],
        manifestOptions: {
            start_url: './RickAndMorty/dist/',
            background_color: '#fff'
        }
    }
}
