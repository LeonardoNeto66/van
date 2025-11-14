import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

// Aceita o argumento 'context' (BootstrapContext) e o passa como terceiro argumento.
const bootstrap = (context: any) => bootstrapApplication(AppComponent, config, context);

export default bootstrap;