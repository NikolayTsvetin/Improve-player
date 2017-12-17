import 'jquery';
import userController from 'userController';
import searchController from 'searchController';
import homeController from 'homeController';
import trackController from 'trackController';
import * as helpers from 'helpers';
import eventListeners from 'eventlisteners';

const router = new Navigo('#/', false);

router
.on({
    'search/:query': (params) => searchController.searchTracks(params),
    'search/:query/:id': (params) => trackController.loadTrackFromSearch(params),
    'user/:username/playlist': () => trackController.showPlaylist(),
    'user/:username/playlist/:id': (params) => trackController.loadTrackFromPlaylist(params),
    'search/:query/:id/add-to-playlist': (params) => trackController.addToPlaylist(params),
    'user/:username/playlist/:id/remove-from-playlist': (params) => trackController.removeFromPlaylist(params),
    'registration': () => userController.showRegisterForm(),
    'signup': () => userController.signUp(),
    'cancel': () => userController.hideRegisterForm(),
    'login': () => userController.login(),
    'logout': () => userController.logout(),
    'home': () => homeController.showHome()
})
.resolve();

router
.notFound(() => helpers.notFound());

export default router;