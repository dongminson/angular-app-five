import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 

@NgModule({
    imports: [
        MatCardModule,
        MatButtonModule, 
        MatIconModule, 
        MatFormFieldModule, 
        MatSnackBarModule,
        MatInputModule, 
        MatToolbarModule,
        MatRadioModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
    ],
    exports: [
        MatCardModule,
        MatButtonModule, 
        MatIconModule, 
        MatFormFieldModule, 
        MatSnackBarModule,
        MatInputModule, 
        MatToolbarModule,
        MatRadioModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
    ]
})
export class MaterialModule {

}