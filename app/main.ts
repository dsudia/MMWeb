import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule} from './app.module';
import { appRouterProviders } from './app.routes';

platformBrowserDynamic().bootstrapModule(AppModule)