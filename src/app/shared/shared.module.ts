import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    declarations: [
        BreadcrumbsComponent,
        HeaderComponent,
        NopagefoundComponent,
        SidebarComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    exports: [
        BreadcrumbsComponent,
        HeaderComponent,
        NopagefoundComponent,
        SidebarComponent
    ],
    providers: [],
})
export class SharedModule {}
