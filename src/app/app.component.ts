import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RequisitionFormComponent } from "./requisition-form/requisition-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RequisitionFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lab-report-app';
}
