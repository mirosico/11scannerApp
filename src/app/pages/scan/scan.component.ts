import {Component} from '@angular/core';
import {ScannerService} from "../../core/services/scanner.service";
import {Violation} from "../../core/models/violation";
import {Result} from "../../core/models/result";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent {
  url = '';
  allVulnerabilities: Violation[] = [];
  ignoredVulnerabilities: Violation[] = [];
  isLoading = false;

  constructor(private scannerService: ScannerService, private messageService: MessageService,
              private router: Router) {
  }

  ngOnInit() {
    this.scannerService.getScanOptions().subscribe({
      next: (violations) => {
        this.allVulnerabilities = violations;
      }, error: (error) => {
        console.log(error);
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not load scan options'});
      }
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.scannerService.scan(this.url, this.ignoredVulnerabilities).subscribe({
      next: (result) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Scanned successfully'});
        this.isLoading = false;
        this.router.navigate([`/scan-results/${result._id}`], {state: {result}});
      }, error: (error) => {
        console.log(error);
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not scan URL'});
        this.isLoading = false;
      }
    });
  }

}
