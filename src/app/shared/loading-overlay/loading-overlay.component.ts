import { Component } from '@angular/core';
import { LoaderService } from 'src/app/core/loader.service';

@Component({
  selector: 'bdl-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.css']
})
export class LoadingOverlayComponent {
  constructor(public loader: LoaderService) {}
}
