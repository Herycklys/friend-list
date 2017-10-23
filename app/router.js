import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('amigos', function() {
    this.route('novo');
  });
  this.route('amigo', { path: '/amigo/:amigos_id' }, function() {});
  this.route('error-404', { path: '/*path' });
});

export default Router;
