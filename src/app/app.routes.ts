import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { SearchComponent } from './search/search.component';
import { ProductCategoryComponent } from './product-category/product-category.component';

export const routes: Routes = [

        {path: 'categories', component: ProductCategoryComponent},
        { path: 'search/:keyword', component: ProductListComponent },
        {path: 'category/:id', component: ProductListComponent},
        {path: 'category', component: ProductListComponent},
        {path: 'products', component: ProductListComponent},
        {path: '', redirectTo: '/products', pathMatch: 'full'},
        {path: '**', redirectTo: '/products', pathMatch: 'full'},
    
];
